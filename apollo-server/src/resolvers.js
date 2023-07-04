import { PubSub } from "graphql-subscriptions";
import { AnalyticsModel } from "./models/analytics.js";

const pubsub = new PubSub();

export const resolvers = {
  Query: {    
    analytics: async () => {
      const analytics = await AnalyticsModel.find();
      return analytics;
    },
  },
  Mutation: {
    createAnalytics: async (_, { input }) => {
      const { type, value, url, element, goal } = input;
      const newAnalytics = new AnalyticsModel({
        type,
        value,
        url,
        element,
        goal,
      });
      const savedAnalytics = await newAnalytics.save();
      return savedAnalytics;
    },
    deleteAnalytics: async (_, { id }) => {
      const result = await AnalyticsModel.deleteOne({ _id: id });
      if (result.acknowledged && result.deletedCount === 1) {
        return id;
      }
      return null;
    },
    updateAnalytics: async (_, { input }) => {
      const { id, value } = input;
      const analytics = await AnalyticsModel.findByIdAndUpdate(
        id,
        { value },
        { new: true }
      );
      pubsub.publish("ANALYTICS_UPDATED", { analyticsUpdated: analytics });
      return analytics;
    },
  },
  Subscription: {
    analyticsUpdated: {
      subscribe: () => pubsub.asyncIterator(["ANALYTICS_UPDATED"]),
    },
  },
  Analytics: {
    __resolveType(analytics, context, info) {
      switch (analytics.type) {
        case "PAGE_VIEWS":
          return "PageViews";
        case "CLICKS":
          return "Clicks";
        case "CONVERSIONS":
          return "Conversions";
        default:
          return null;
      }
    },
  },
};

pubsub.subscribe("ANALYTICS_UPDATED", (analytics) => {
  return analytics;
});

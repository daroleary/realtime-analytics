import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    analytics: [Analytics!]!
  }

  type Mutation {    
    createAnalytics(input: AnalyticsInput!): Analytics!
    deleteAnalytics(id: ID): ID
    updateAnalytics(input: AnalyticsInput!): Analytics!
  }

  type Subscription {
    analyticsUpdated: Analytics!
  }

  input AnalyticsInput {
    id: ID
    type: AnalyticsType!
    value: Float!
    url: String
    element: String
    goal: String
  }

  enum AnalyticsType {
    PAGE_VIEWS
    CLICKS
    CONVERSIONS
  }

  interface AnalyticsData {
    id: ID!
    type: AnalyticsType!
    value: Float!
  }

  type PageViews implements AnalyticsData {
    id: ID!
    type: AnalyticsType!
    value: Float!
    url: String!
  }

  type Clicks implements AnalyticsData {
    id: ID!
    type: AnalyticsType!
    value: Float!
    element: String!
  }

  type Conversions implements AnalyticsData {
    id: ID!
    type: AnalyticsType!
    value: Float!
    goal: String!
  }

  union Analytics = PageViews | Clicks | Conversions
`;

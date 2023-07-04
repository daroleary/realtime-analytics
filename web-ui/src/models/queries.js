import { gql } from "@apollo/client";

export const GET_ANALYTICS = gql`
  query GetAnalytics {
    analytics {
      __typename
      ... on PageViews {
        id
        type
        value
        url
      }
      ... on Clicks {
        id
        type
        value
        element
      }
      ... on Conversions {
        id
        type
        value
        goal
      }
    }
  }
`;

export const UPDATE_ANALYTICS = gql`
  mutation UpdateAnalytics($input: AnalyticsInput!) {
    updateAnalytics(input: $input) {
      ... on PageViews {
        id
        type
        value
        url
      }
      ... on Clicks {
        id
        type
        value
        element
      }
      ... on Conversions {
        id
        type
        value
        goal
      }
    }
  }
`;

export const ANALYTICS_UPDATED = gql`
  subscription AnalyticsUpdated {
    analyticsUpdated {
      ... on PageViews {
        id
        type
        value
        url
      }
      ... on Clicks {
        id
        type
        value
        element
      }
      ... on Conversions {
        id
        type
        value
        goal
      }
    }
  }
`;

export const CREATE_ANALYTICS = gql`
  mutation CreateAnalytics($input: AnalyticsInput!) {
    createAnalytics(input: $input) {
      ... on PageViews {
        id
        type
        value
        url
      }
      ... on Clicks {
        id
        type
        value
        element
      }
      ... on Conversions {
        id
        type
        value
        goal
      }
    }
  }
`;

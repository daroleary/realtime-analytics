import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_ANALYTICS, UPDATE_ANALYTICS, ANALYTICS_UPDATED } from './queries.js';

export const useAnalyticsViewModel = () => {
  const [analytics, setAnalytics] = useState([]);

  const { data, loading, error } = useQuery(GET_ANALYTICS);

  const [updateAnalytics] = useMutation(UPDATE_ANALYTICS);

  useSubscription(ANALYTICS_UPDATED, {
    onData: ({ subscriptionData }) => {
      const updatedAnalytics = subscriptionData.data.analyticsUpdated;
      setAnalytics((prevAnalytics) =>
        prevAnalytics.map((a) => (a.id === updatedAnalytics.id ? updatedAnalytics : a))
      );
    },
  });

  useEffect(() => {
    if (data) {
      setAnalytics(data.analytics);
    }
  }, [data]);

  const handleUpdateAnalytics = async (analytics) => {
    await updateAnalytics({
      variables: {
        input: {
          id: analytics.id,
          value: parseFloat(analytics.value),
          type: analytics.type,
          url: analytics.url,
          element: analytics.element,
          goal: analytics.goal,
        },
      },
    });
  };

  return {
    analytics,
    loading,
    error,
    handleUpdateAnalytics,
  };
};
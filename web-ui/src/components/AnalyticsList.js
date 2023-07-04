import { useState } from 'react';
import { useAnalyticsViewModel } from '../models/analyticsViewModel.js';
import "./AnalyticsList.css";

const AnalyticsList = () => {
  const { analytics: analyticsModel, loading, error, handleUpdateAnalytics } = useAnalyticsViewModel();
  const [editingAnalytics, setEditingAnalytics] = useState(null);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleEditAnalytics = (analytics) => {
    setEditingAnalytics(analytics);
  };

  const handleCancelEdit = () => {
    setEditingAnalytics(null);
  };

  const handleSaveAnalytics = (analytics) => {
    const input = {
      id: analytics.id,
      type: analytics.type,
      value: analytics.value,
      url: analytics.url,
      element: analytics.element,
      goal: analytics.goal,
    };
    handleUpdateAnalytics(input);
    setEditingAnalytics(null);
  };

  const pageViews = analyticsModel.filter((a) => a.type === "PAGE_VIEWS");
  const clicks = analyticsModel.filter((a) => a.type === "CLICKS");
  const conversions = analyticsModel.filter((a) => a.type === "CONVERSIONS");

  return (
    <div className="analytics-list">
      <div className="analytics-section page-views">
        <h2>Page Views</h2>
        {pageViews.map((analytics) => (
          <div key={analytics.id} className="analytics-item">
            {editingAnalytics && editingAnalytics.id === analytics.id ? (
              <div className="analytics-edit-container">
                <input type="number" value={editingAnalytics.value} onChange={(e) => setEditingAnalytics({ ...editingAnalytics, value: e.target.value })} />
                <input type="text" value={editingAnalytics.url} onChange={(e) => setEditingAnalytics({ ...editingAnalytics, url: e.target.value })} />
                <div className="analytics-edit-buttons">
                  <button onClick={() => handleSaveAnalytics(editingAnalytics)}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <p>ID: {analytics.id}</p>
                <p>Value: {analytics.value}</p>
                <p>URL: {analytics.url}</p>
                <button onClick={() => handleEditAnalytics(analytics)}>Edit</button>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="analytics-section clicks">
        <h2>Clicks</h2>
        {clicks.map((analytics) => (
          <div key={analytics.id} className="analytics-item">
            {editingAnalytics && editingAnalytics.id === analytics.id ? (
              <div className="analytics-edit-container">
                <input type="text" value={editingAnalytics.value} onChange={(e) => setEditingAnalytics({ ...editingAnalytics, value: e.target.value })} />
                <input type="text" value={editingAnalytics.element} onChange={(e) => setEditingAnalytics({ ...editingAnalytics, element: e.target.value })} />
                <div className="analytics-edit-buttons">
                  <button onClick={() => handleSaveAnalytics(editingAnalytics)}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <p>ID: {analytics.id}</p>
                <p>Value: {analytics.value}</p>
                <p>Element: {analytics.element}</p>
                <button onClick={() => handleEditAnalytics(analytics)}>Edit</button>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="analytics-section conversions">
        <h2>Conversions</h2>
        {conversions.map((analytics) => (
          <div key={analytics.id} className="analytics-item">
            {editingAnalytics && editingAnalytics.id === analytics.id ? (
              <div className="analytics-edit-container">
                <input type="text" value={editingAnalytics.value} onChange={(e) => setEditingAnalytics({ ...editingAnalytics, value: e.target.value })} />
                <input type="text" value={editingAnalytics.goal} onChange={(e) => setEditingAnalytics({ ...editingAnalytics, goal: e.target.value })} />
                <div className="analytics-edit-buttons">
                  <button onClick={() => handleSaveAnalytics(editingAnalytics)}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <p>ID: {analytics.id}</p>
                <p>Value: {analytics.value}</p>
                <p>Goal: {analytics.goal}</p>
                <button onClick={() => handleEditAnalytics(analytics)}>Edit</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsList;
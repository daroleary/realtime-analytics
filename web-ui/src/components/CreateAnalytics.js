import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_ANALYTICS, CREATE_ANALYTICS } from "../models/queries";

const CreateAnalytics = () => {
  const [type, setType] = useState("PAGE_VIEWS");
  const [value, setValue] = useState("");
  const [url, setUrl] = useState("");
  const [element, setElement] = useState("");
  const [goal, setGoal] = useState("");

  //   const { handleCreateAnalytics } = useAnalyticsViewModel();
  const [createAnalytics] = useMutation(CREATE_ANALYTICS, {
    refetchQueries: [{ query: GET_ANALYTICS }],
  });

  const handleCreateAnalytics = async (e) => {
    e.preventDefault();
    const additionalFields = {};
    if (type === "PAGE_VIEWS") {
      additionalFields.url = url;
    } else if (type === "CLICKS") {
      additionalFields.element = element;
    } else if (type === "CONVERSIONS") {
      additionalFields.goal = goal;
    }

    try {
      await createAnalytics({
        variables: {
          input: {
            type,
            value: parseFloat(value),
            ...additionalFields,
          },
        },
      });
      setValue("");
      setUrl("");
      setElement("");
      setGoal("");
    } catch (error) {
      console.error("error: ", JSON.stringify(error));
    }
  };

  return (
    <form onSubmit={handleCreateAnalytics}>
      <label>
        Type:
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="PAGE_VIEWS">Page Views</option>
          <option value="CLICKS">Clicks</option>
          <option value="CONVERSIONS">Conversions</option>
        </select>
      </label>
      <br />
      <label>
        Value:
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
      <br />
      {type === "PAGE_VIEWS" && (
        <label>
          URL:
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
      )}
      {type === "CLICKS" && (
        <label>
          Element:
          <input
            type="text"
            value={element}
            onChange={(e) => setElement(e.target.value)}
          />
        </label>
      )}
      {type === "CONVERSIONS" && (
        <label>
          Goal:
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </label>
      )}
      <br />
      <button type="submit">Create Analytics</button>
    </form>
  );
};

export default CreateAnalytics;

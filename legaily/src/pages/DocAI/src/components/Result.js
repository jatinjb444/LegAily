import React from "react";

const Result = ({ data }) => {
  return (
    <div>
      <h2>Result</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Result;

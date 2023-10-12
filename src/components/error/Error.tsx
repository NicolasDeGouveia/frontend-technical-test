import React from "react";

type ErrorProps = {
  errorMessage: string;
};

const Error = ({ errorMessage }: ErrorProps) => {
  return (
    <div
      className="p-4 text-orange-700 bg-orange-100 border-l-4 border-orange-500"
      role="alert"
    >
      <p className="font-bold">Error</p>
      <p>{errorMessage}</p>
    </div>
  );
};

export default Error;

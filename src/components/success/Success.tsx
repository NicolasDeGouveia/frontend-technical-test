import React from "react";

type SuccessProps = {
  successMessage: string;
};

const Success = ({ successMessage }: SuccessProps) => {
  return (
    <div className="p-4 text-green-700 bg-green-100 border-l-4 border-green-500">
      <p className="font-bold">Création réussi</p>
      <p>{successMessage}</p>
    </div>
  );
};

export default Success;

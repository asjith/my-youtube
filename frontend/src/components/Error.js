import React from "react";
import errorURL from "../icons/error.png";

const Error = ({ onClick }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-96 text-xs">
      <img src={errorURL} alt="error" />
      <h1 className="text-xl ">Sorry, something went wrong</h1>
      <p>Please try again</p>
      <button
        type="button"
        className="px-4 py-2 m-2 rounded-full font-bold border border-gray-400 hover:bg-gray-400"
        onClick={onClick}
      >
        Retry
      </button>
    </div>
  );
};

export default Error;

import React from "react";
import notFoundURL from "../icons/notFound.png";

const NoResultsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-96 text-xs">
      <img src={notFoundURL} alt="no-results-found" />
      <h1 className="text-xl ">No results found</h1>
      <p>Try different keywords or remove search filters</p>
    </div>
  );
};

export default NoResultsFound;

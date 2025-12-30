import React from "react";
import notFoundURL from "../icons/notFound.png";

const NoResultsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-52 text-xs md:h-96">
      <img src={notFoundURL} alt="no-results-found" />
      <h1 className="text-lg md:text-xl ">No results found</h1>
      <p>Try different keywords or remove search filters</p>
    </div>
  );
};

export default NoResultsFound;

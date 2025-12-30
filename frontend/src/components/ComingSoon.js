import React from "react";
import comingSoonURL from "../icons/comingSoon.png";

const ComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-52 text-xs md:h-96">
      <img src={comingSoonURL} alt="coming-soon" />
      <h1 className="text-lg md:text-xl">Coming Soon!</h1>
    </div>
  );
};

export default ComingSoon;

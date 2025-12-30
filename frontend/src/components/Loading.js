import React from "react";
import loadingURL from "../icons/loading.gif";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-52 md:h-96">
      <img src={loadingURL} alt="Loading" />
    </div>
  );
};

export default Loading;

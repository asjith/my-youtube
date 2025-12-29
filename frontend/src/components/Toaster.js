import React from "react";

const Toaster = ({ exit, message, handleClick, colorStyle }) => {
  return (
    <div
      className={
        colorStyle +
        "   toaster mx-4 p-2 text-white fixed top-4 right-0 z-50 text-xs rounded-md flex gap-1 items-center  " +
        (exit && "  exit")
      }
    >
      <p className="p-2">{message}</p>
      <button className="p-2" onClick={handleClick}>
        x
      </button>
    </div>
  );
};

export default Toaster;

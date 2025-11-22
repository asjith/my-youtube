import React, { useState } from "react";
import { BUTTONLIST_BUTTONS } from "../utils/constants";

const ButtonList = () => {
  const [showBtn, setShowBtn] = useState({ left: false, right: true });

  const handleRightArrowClick = () => {
    setShowBtn({ left: true, right: true });
  };

  return (
    <div className="grid grid-flow-col items-center m-4 relative">
      {showBtn.left && (
        <div className="col-span-2 absolute left-0 z-10 bg-white rounded-r-full">
          <button className="border border-solid border-black rounded-full w-8 h-8 bg-white">
            <strong>&lt;</strong>
          </button>
        </div>
      )}
      <div className="col-span-8 overflow-hidden">
        <div className="slidder flex flex-nowrap gap-2">
          {BUTTONLIST_BUTTONS.map((buttonInfo) => {
            return (
              <button
                key={buttonInfo.id}
                className="text-xs px-2 py-1 bg-gray-200 rounded-md"
              >
                {buttonInfo.name}
              </button>
            );
          })}
        </div>
      </div>
      <div className="col-span-2 absolute right-0 z-10 bg-white rounded-l-full">
        <button
          className="border border-solid border-black rounded-full w-8 h-8 bg-white"
          onClick={handleRightArrowClick}
        >
          <strong>&gt;</strong>
        </button>
      </div>
    </div>
  );
};

export default ButtonList;

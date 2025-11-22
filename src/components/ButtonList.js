import React from "react";
import { BUTTONLIST_BUTTONS } from "../utils/constants";

const ButtonList = () => {
  return (
    <div className="grid grid-flow-col items-center m-4 relative">
      <div className="bg-white col-span-2 absolute left-0 z-10 ">
        <button className="border border-solid border-black rounded-full w-8 h-8 bg-white">
          <strong>&lt;</strong>
        </button>
      </div>
      <div className="col-span-8 flex flex-nowrap gap-2 overflow-hidden">
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
      <div className="bg-white col-span-2 absolute right-0 z-10 ">
        <button className="border border-solid border-black rounded-full w-8 h-8 bg-white">
          <strong>&gt;</strong>
        </button>
      </div>
    </div>
  );
};

export default ButtonList;

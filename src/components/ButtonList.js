import React from "react";
import { BUTTONLIST_BUTTONS } from "../utils/constants";

const ButtonList = () => {
  return (
    <div className="flex flex-nowrap">
      {BUTTONLIST_BUTTONS.map((buttonInfo) => {
        return (
          <button
            key={buttonInfo.id}
            className="text-xs px-2 py-1 m-2 bg-gray-200 rounded-md"
          >
            {buttonInfo.name}
          </button>
        );
      })}
    </div>
  );
};

export default ButtonList;

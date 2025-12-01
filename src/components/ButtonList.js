import React, { useEffect, useRef, useState } from "react";
import { BUTTONLIST_BUTTONS } from "../utils/constants";

const ButtonList = () => {
  const [showBtn, setShowBtn] = useState({ left: false, right: true });
  const [move, setMove] = useState(0);

  const slidderRef = useRef();

  useEffect(() => {
    const resetButtonList = () => {
      setMove(0);
      setShowBtn({ left: false, right: true });
    };

    window.addEventListener("resize", resetButtonList);

    return () => window.removeEventListener("resize", resetButtonList);
  }, []);

  const handleRightArrowClick = () => {
    if (slidderRef.current) {
      const { scrollWidth, clientWidth } = slidderRef.current;

      const maxMove = (scrollWidth - clientWidth) / (clientWidth * 0.5);
      const nextMove = Math.min(move + 1, maxMove);
      setMove(nextMove);

      if (nextMove === maxMove) setShowBtn({ left: true, right: false });
      else setShowBtn({ left: true, right: true });
    }
  };

  const handleLeftArrowClick = () => {
    if (slidderRef.current) {
      const { scrollWidth, clientWidth } = slidderRef.current;
      const nextMove = Math.max(move - 1, 0);

      setMove(nextMove);

      if (nextMove <= 0) setShowBtn({ left: false, right: true });
    }
  };

  return (
    <div className="grid grid-flow-col items-center m-4 relative">
      {showBtn.left && (
        <div className="col-span-2 absolute left-0 z-10 bg-white rounded-r-full">
          <button
            className="border border-solid border-white rounded-full w-8 h-8 bg-white flex justify-center items-center text-xl"
            onClick={handleLeftArrowClick}
          >
            <strong>&#x2039;</strong>
          </button>
        </div>
      )}
      <div className="col-span-8 overflow-hidden">
        <div
          className="slidder flex flex-nowrap gap-2"
          style={{ "--move": move }}
          ref={slidderRef}
        >
          {BUTTONLIST_BUTTONS.map((buttonInfo) => {
            return (
              <button
                key={buttonInfo.id}
                className="text-xs px-2 py-1 bg-gray-200 rounded-md font-bold"
              >
                {buttonInfo.name}
              </button>
            );
          })}
        </div>
      </div>
      {showBtn.right && (
        <div className="col-span-2 absolute right-0 z-10 bg-white rounded-l-full">
          <button
            className="border border-solid border-white rounded-full w-8 h-8 bg-white flex justify-center items-center text-xl"
            onClick={handleRightArrowClick}
          >
            <strong>&#x203A;</strong>
          </button>
        </div>
      )}
    </div>
  );
};

export default ButtonList;

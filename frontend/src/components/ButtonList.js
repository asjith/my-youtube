import React, { useEffect, useRef, useState } from "react";
import { BUTTONLIST_BUTTONS } from "../utils/constants";
import { Link } from "react-router-dom";

const ButtonList = () => {
  const [showBtn, setShowBtn] = useState({ left: false, right: true });

  const containerRef = useRef();

  const handleRightArrowClick = () => {
    if (containerRef.current) {
      const { scrollWidth, clientWidth } = containerRef.current;

      containerRef.current.scrollLeft += Math.floor(clientWidth * 0.5);

      if (
        Math.ceil(containerRef.current.scrollLeft + clientWidth) >= scrollWidth
      ) {
        setShowBtn({ left: true, right: false });
      } else if (containerRef.current.scrollLeft > 0)
        setShowBtn({ left: true, right: true });
    }
  };

  const handleLeftArrowClick = () => {
    if (containerRef.current) {
      const { scrollWidth, clientWidth } = containerRef.current;
      containerRef.current.scrollLeft -= clientWidth * 0.5;

      if (containerRef.current.scrollLeft <= 0)
        setShowBtn({ left: false, right: true });
    }
  };

  const handleScroll = (e) => {
    if (containerRef.current) {
      const { scrollWidth, clientWidth } = containerRef.current;

      if (e.target.scrollLeft === 0) setShowBtn({ left: false, right: true });
      else if (Math.ceil(e.target.scrollLeft + clientWidth) >= scrollWidth)
        setShowBtn({ left: true, right: false });
      else setShowBtn({ left: true, right: true });
    }
  };

  return (
    <div className="sticky bg-white top-[3.7rem] grid grid-flow-col items-center p-4">
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
      <div
        className="button-list-container col-span-8 overflow-x-scroll"
        onScroll={handleScroll}
        ref={containerRef}
      >
        <div className="slidder flex flex-nowrap gap-2">
          {BUTTONLIST_BUTTONS.map((buttonInfo) => {
            return (
              <Link
                to={"/results?search_query=" + buttonInfo.name}
                key={buttonInfo.id}
              >
                <button className="text-xs px-2 py-1 bg-gray-200 rounded-md font-bold whitespace-nowrap hover:bg-black hover:text-white">
                  {buttonInfo.name}
                </button>
              </Link>
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

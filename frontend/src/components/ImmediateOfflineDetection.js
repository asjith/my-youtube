import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { TOASTER_DISPLAY_TIME } from "../utils/constants";

const ImmediateOfflineDetection = () => {
  const [showToaster, setShowToaster] = useState(false);
  const [exitAnimation, setExitAnimation] = useState(false);
  const firstRender = useRef(true);
  const timeoutRef = useRef(null);
  const isOnline = useSelector((store) => store.app.isOnline);

  useEffect(() => {
    if (isOnline && firstRender.current) return;

    if (isOnline) {
      setShowToaster(true);
      timeoutRef.current = setTimeout(() => {
        dismissToaster();
      }, TOASTER_DISPLAY_TIME);
    } else {
      setShowToaster(true);
      firstRender.current = false;
      timeoutRef.current = setTimeout(() => {
        dismissToaster();
      }, TOASTER_DISPLAY_TIME);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [isOnline]);

  const dismissToaster = () => {
    setExitAnimation(true);

    setTimeout(() => {
      setShowToaster(false);
      setExitAnimation(false);
    }, 300);
  };

  const handleClick = () => {
    clearTimeout(timeoutRef.current);
    dismissToaster();
  };

  return (
    <>
      {showToaster && !isOnline && (
        <div
          className={
            "toaster mx-4 p-2 bg-black text-white absolute top-4 right-0 z-50 text-xs rounded-md flex gap-1 items-center  " +
            (exitAnimation && "  exit")
          }
        >
          <p className="p-2">No Internet connection</p>
          <button className="p-2" onClick={handleClick}>
            x
          </button>
        </div>
      )}
      {showToaster && isOnline && (
        <div
          className={
            "toaster mx-4 px-4 py-2 bg-green-600 text-white absolute top-4 right-0 z-50 text-xs rounded-md flex gap-1 items-center  " +
            (exitAnimation && "  exit")
          }
        >
          <p className="p-2">Back Online</p>
          <button className="p-2" onClick={handleClick}>
            x
          </button>
        </div>
      )}
    </>
  );
};

export default ImmediateOfflineDetection;

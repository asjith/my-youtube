import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { TOASTER_DISPLAY_TIME } from "../utils/constants";
import Toaster from "./Toaster";

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
        <Toaster
          exit={exitAnimation}
          message="No Internet connection"
          handleClick={handleClick}
          colorStyle="bg-black"
        />
      )}
      {showToaster && isOnline && (
        <Toaster
          exit={exitAnimation}
          message="Back Online"
          handleClick={handleClick}
          colorStyle="bg-green-600"
        />
      )}
    </>
  );
};

export default ImmediateOfflineDetection;

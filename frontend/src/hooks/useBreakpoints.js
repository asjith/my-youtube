import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeSideBar, openSideBar } from "../utils/appSlice";
import { BREAKPOINTS } from "../utils/constants";

const useBreakpoints = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    if (window.innerWidth < BREAKPOINTS.tablet) dispatch(closeSideBar());
    else dispatch(openSideBar());
  };

  return null;
};

export default useBreakpoints;

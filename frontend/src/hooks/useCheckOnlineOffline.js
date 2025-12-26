import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsOnline } from "../utils/appSlice";

const useCheckOnlineOffline = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (navigator.onLine === false) {
      dispatch(setIsOnline(false));
    }

    const handleOnline = () => {
      dispatch(setIsOnline(true));
    };

    const handleOffline = () => {
      dispatch(setIsOnline(false));
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return;
};

export default useCheckOnlineOffline;

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSideBar } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import Comment from "./Comment";
import { COMMENTS_DATA } from "../utils/constants";
import LiveChat from "./LiveChat";
import { clearMessages } from "../utils/chatSlice";
import Offline from "./Offline";
import loadingURL from "../icons/loading.gif";

const Watch = () => {
  const [dispatchOffline, setDisplayOffline] = useState(false);
  const throttleFlag = useRef(true);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const isOnline = useSelector((store) => store.app.isOnline);

  useEffect(() => {
    dispatch(closeSideBar());
    window.scrollTo(0, 0);
    dispatch(clearMessages());
  }, []);

  useEffect(() => {
    if (isOnline) setDisplayOffline(false);
  }, [isOnline]);

  const handleRetry = () => {
    if (throttleFlag.current) {
      if (isOnline) setDisplayOffline(false);
      throttleFlag.current = false;
      setTimeout(() => {
        throttleFlag.current = true;
      }, 3000);
    }
  };

  const handleOffline = () => {
    setDisplayOffline(true);
  };

  if (dispatchOffline) return <Offline refetch={handleRetry} />;

  return (
    <div className="col-span-9 m-2 p-2">
      <div className="md:flex gap-2">
        {isOnline ? (
          <iframe
            className="rounded-md w-full aspect-video my-2 md:w-4/6"
            src={
              "https://www.youtube.com/embed/" +
              searchParams.get("v") +
              "?si=Wei6g8TNvvsJM8ym&autoplay=1"
            }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="rounded-md w-full aspect-video my-2 flex justify-center items-center md:w-4/6">
            <img src={loadingURL} alt="loading" />
          </div>
        )}
        <LiveChat checkFetch={handleOffline} />
      </div>
      <div className="w-full md:w-4/6">
        <h1 className="font-bold">Comments:</h1>
        <div>
          {COMMENTS_DATA.map((comment) => (
            <Comment key={comment.id} info={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Watch;

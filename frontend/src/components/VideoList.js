import React, { useEffect, useState } from "react";
import { YOUTUBE_API } from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Offline from "./Offline";
import Loading from "./Loading";
import Error from "./Error";
import { checkOfflineError } from "../utils/helperFunctions";

const VideoList = () => {
  const [videoInfo, setVideoInfo] = useState([]);
  const [displayOffline, setDisplayOffline] = useState(false);
  const [loading, setLoading] = useState(false);
  const [retry, setRetry] = useState(false);
  const [error, setError] = useState(false);
  const isOnline = useSelector((store) => store.app.isOnline);

  useEffect(() => {
    if (videoInfo.length > 0) return;
    fetchYoutubeVideoDatas();
  }, [isOnline, retry]);

  const fetchYoutubeVideoDatas = async () => {
    try {
      setLoading(true);
      setError(false);
      setDisplayOffline(false);
      const data = await fetch(YOUTUBE_API);

      if (!data.ok) {
        console.error("HTTP Error:", {
          status: data.status,
          statusText: data.statusText,
          url: data.url,
          timestamp: new Date().toISOString(),
        });
        setError(true);
        setVideoInfo([]);
      } else {
        const json = await data.json();

        setVideoInfo(json.items);
      }
    } catch (error) {
      //network issue
      if (!navigator.onLine || checkOfflineError(error.message))
        setDisplayOffline(true);
      else {
        console.error("Network Error ", error);
        setError(true);
        setVideoInfo([]);
      }
    }
    setLoading(false);
    setRetry(false);
  };

  const handleRetry = () => {
    setRetry(true);
  };

  if (loading) return <Loading />;

  if (displayOffline) return <Offline onClick={handleRetry} />;

  if (error) return <Error onClick={handleRetry} />;

  if (videoInfo.length === 0) return null;

  return (
    <div className="m-4 grid  gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {videoInfo.map((info) => (
        <Link to={"/watch?v=" + info.id} key={info.id}>
          <VideoCard info={info} />
        </Link>
      ))}
    </div>
  );
};

export default VideoList;

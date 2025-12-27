import React, { useEffect, useState } from "react";
import { YOUTUBE_API } from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Offline from "./Offline";
import Loading from "./Loading";

const VideoList = () => {
  const [videoInfo, setVideoInfo] = useState([]);
  const [displayOffline, setDisplayOffline] = useState(false);
  const [loading, setLoading] = useState(false);
  const [retry, setRetry] = useState(false);
  const isOnline = useSelector((store) => store.app.isOnline);

  useEffect(() => {
    if (videoInfo.length > 0) return;
    fetchYoutubeVideoDatas();
  }, [isOnline, retry]);

  const fetchYoutubeVideoDatas = async () => {
    try {
      setLoading(true);
      const data = await fetch(YOUTUBE_API);
      const json = await data.json();

      setVideoInfo(json.items);
      setDisplayOffline(false);
    } catch (error) {
      //network issue
      if (error.name === "TypeError") setDisplayOffline(true);
    }
    setLoading(false);
    setRetry(false);
  };

  const handleRetry = () => {
    setRetry(true);
  };

  if (loading) return <Loading />;

  if (displayOffline) return <Offline onClick={handleRetry} />;

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

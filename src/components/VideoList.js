import React, { useEffect, useState } from "react";
import { YOUTUBE_API } from "../utils/constants";
import VideoCard from "./VideoCard";

const VideoList = () => {
  const [videoInfo, setVideoInfo] = useState([]);

  useEffect(() => {
    fetchYoutubeVideoDatas();
  }, []);

  const fetchYoutubeVideoDatas = async () => {
    const data = await fetch(YOUTUBE_API);
    const json = await data.json();
    console.log(json);
    setVideoInfo(json.items);
  };

  if (videoInfo.length === 0) return null;

  return (
    <div className="m-4">
      <VideoCard info={videoInfo[0]} />
    </div>
  );
};

export default VideoList;

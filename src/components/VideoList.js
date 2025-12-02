import React, { useEffect, useState } from "react";
import { YOUTUBE_API } from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

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

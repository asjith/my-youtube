import { useEffect, useState } from "react";
import { CHANNEL_API } from "../utils/constants";

const VideoCard = ({ info }) => {
  const [channelInfo, setChannelInfo] = useState(null);

  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;

  useEffect(() => {
    fetchYoutubeChannelData();
  }, []);

  const fetchYoutubeChannelData = async () => {
    const data = await fetch(CHANNEL_API + snippet.channelId);
    const json = await data.json();
    setChannelInfo(json.items[0].snippet);
  };

  return (
    <div className="w-72 p-1 cursor-pointer shadow-md rounded-md">
      <img className="rounded-md" src={thumbnails.medium.url} alt="thumbnail" />
      <div className="flex gap-2 py-2">
        {channelInfo && (
          <img
            className="rounded-full w-10 h-10"
            src={channelInfo.thumbnails.default.url}
            alt="channel-profile-pic"
          />
        )}
        <div>
          <p className="video-title font-bold text-sm">{title}</p>
          <div className="text-xs">
            <p>{channelTitle}</p>
            <p>{statistics.viewCount} views</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

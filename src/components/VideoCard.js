import { useEffect, useState } from "react";
import { CHANNEL_API } from "../utils/constants";

const VideoCard = ({ info }) => {
  const [channelInfo, setChannelInfo] = useState(null);

  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails, publishedAt } = snippet;

  useEffect(() => {
    fetchYoutubeChannelData();
  }, []);

  const fetchYoutubeChannelData = async () => {
    const data = await fetch(CHANNEL_API + snippet.channelId);
    const json = await data.json();
    setChannelInfo(json.items[0].snippet);
  };

  const views =
    statistics.viewCount / 1000000 < 1
      ? statistics.viewCount / 1000 < 1
        ? statistics.viewCount
        : Math.trunc(statistics.viewCount / 1000) + "K "
      : Math.trunc(statistics.viewCount / 1000000) + "M ";

  const getDuration = (publishedAt) => {
    const today = new Date();
    const publishedDate = new Date(publishedAt);

    const diff = today - publishedDate; // in ms

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.44);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return years + (years == 1 ? " year ago" : " years ago");
    } else if (months > 0) {
      return months + (months == 1 ? " month ago" : " months ago");
    } else if (weeks > 0) {
      return weeks + (weeks == 1 ? " week ago" : " weeks ago");
    } else if (days > 0) {
      return days + (days == 1 ? " day ago" : " days ago");
    } else if (hours > 0) {
      return hours + (hours == 1 ? " hour ago" : " hours ago");
    } else if (minutes > 0) {
      return minutes + (minutes == 1 ? " minute ago" : " minutes ago");
    } else {
      return seconds + (seconds == 1 ? " second ago" : " seconds ago");
    }
  };

  const duration = getDuration(publishedAt);

  return (
    <div className="p-1 cursor-pointer shadow-md rounded-md">
      <img
        className="rounded-md w-full"
        src={thumbnails.medium.url}
        alt="thumbnail"
      />
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
          <div className="text-xs text-gray-500 py-1">
            <p>{channelTitle}</p>
            <p>
              <span>{views} views</span> . <span>{duration}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

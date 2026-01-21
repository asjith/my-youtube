import { CHANNEL_API, YOUTUBE_API } from "./constants";

export const fetchYoutubeVideos = async () => {
  const data = await fetch(YOUTUBE_API);

  if (!data.ok)
    throw new Error(
      `HTTP error, ${data.status} ${data.statusText} at ${data.url} (${new Date().toISOString()})`
    );

  const json = await data.json();

  return json.items;
};

export const fetchYoutubeChannelDetails = async (channelId) => {
  const data = await fetch(CHANNEL_API + channelId);

  if (!data.ok)
    throw new Error(
      `HTTP error, ${data.status} ${data.statusText} at ${data.url} (${new Date().toISOString()})`
    );

  const json = await data.json();

  return json.items[0].snippet;
};

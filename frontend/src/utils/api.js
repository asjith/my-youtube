import {
  CHANNEL_API,
  YOUTUBE_API,
  YOUTUBE_SEARCH_RESULTS_API
} from "./constants";

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

export const fetchSearchResults = async (search) => {
  const data = await fetch(YOUTUBE_SEARCH_RESULTS_API + search);

  if (!data.ok)
    throw new Error(
      `HTTP error, ${data.status} ${data.statusText} at ${data.url} (${new Date().toISOString()})`
    );

  const json = await data.json();

  return json.items;
};

import {
  CHANNEL_API,
  YOUTUBE_API,
  YOUTUBE_SEARCH_RESULTS_API,
  YOUTUBE_SEARCH_SUGGESTIONS_API_FROM_BACKEND
} from "./constants";
import openai from "./openai";

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

export const fetchSearchSuggestions = async (searchKey) => {
  const data = await fetch(
    YOUTUBE_SEARCH_SUGGESTIONS_API_FROM_BACKEND + searchKey
  );

  if (!data.ok)
    throw new Error(
      `HTTP error, ${data.status} ${data.statusText} at ${data.url} (${new Date().toISOString()})`
    );

  const json = await data.json();

  return json[1];
};

export const fetchLiveMessages = async () => {
  const response = await openai.responses.create({
    model: "gpt-5-nano",
    input:
      "I am trying to build a live chat section in my front-end YouTube project. I want you to generate an array of 10 objects where each object contains a key named name(with quotes) with value as a name of the user, some random name can be used and the object should also contain a message key(with quotes) with value as a message which might contain maximum words of 10 or less than 10. The message can be about how awesome the video is, greetings, with or without emojis. Send the object alone, no other writings. Return a valid JSON"
  });

  return JSON.parse(response.output_text);
};

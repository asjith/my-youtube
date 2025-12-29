export const SIDEBAR_BUTTONS = [
  {
    id: 0,
    name: "Home",
  },
  {
    id: 1,
    name: "Shorts",
  },
  {
    id: 2,
    name: "Subscriptions",
  },
  {
    id: 3,
    name: "History",
  },
  {
    id: 4,
    name: "Playlists",
  },
  {
    id: 5,
    name: "Watch later",
  },
  {
    id: 6,
    name: "Liked videos",
  },
];

export const BUTTONLIST_BUTTONS = [
  {
    id: 0,
    name: "All",
  },
  {
    id: 1,
    name: "News",
  },
  {
    id: 2,
    name: "Music",
  },
  {
    id: 3,
    name: "Podcasts",
  },
  {
    id: 4,
    name: "Beauty",
  },
  {
    id: 5,
    name: "Art",
  },
  {
    id: 6,
    name: "Sports",
  },
  {
    id: 7,
    name: "Cooking",
  },
  {
    id: 8,
    name: "Travel",
  },
  {
    id: 9,
    name: "Live",
  },
  {
    id: 10,
    name: "Vlogs",
  },
  {
    id: 11,
    name: "Dance",
  },
  {
    id: 12,
    name: "Elections",
  },
  {
    id: 13,
    name: "Foodie",
  },
  {
    id: 14,
    name: "React",
  },
  {
    id: 15,
    name: "Learn",
  },
  {
    id: 16,
    name: "Technology",
  },
  {
    id: 17,
    name: "Jobs",
  },
  {
    id: 18,
    name: "Politics",
  },
  {
    id: 19,
    name: "AI",
  },
  {
    id: 20,
    name: "Health",
  },
  {
    id: 21,
    name: "Gadgets",
  },
];

export const YOUTUBE_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&maxResults=50&key=" +
  process.env.REACT_APP_YOUTUBE_API_KEY;

export const CHANNEL_API =
  "https://youtube.googleapis.com/youtube/v3/channels?part=snippet&key=" +
  process.env.REACT_APP_YOUTUBE_API_KEY +
  "&id=";

export const YOUTUBE_SEARCH_SUGGESTIONS_API =
  "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const YOUTUBE_SEARCH_SUGGESTIONS_API_FROM_BACKEND =
  "https://my-youtube-nine-kohl.vercel.app/api/suggestions?q=";

export const YOUTUBE_SEARCH_RESULTS_API =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&type=video&key=" +
  process.env.REACT_APP_YOUTUBE_API_KEY +
  "&q=";

export const COMMENTS_DATA = [
  {
    id: "1",
    name: "User 1",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    replies: [
      {
        id: "1.2",
        name: "User 2",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        replies: [
          { id: "1.2.1", name: "User 3", text: "Lorem Ipsum", replies: [] },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "User 1",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    replies: [],
  },
  {
    id: "3",
    name: "User 1",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    replies: [
      {
        id: "3.1",
        name: "User 2",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        replies: [],
      },
      {
        id: "3.2",
        name: "User 3",
        text: "🤣🤣🤣🤣🤣",
        replies: [],
      },
      {
        id: "3.3",
        name: "User 4",
        text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
        replies: [
          { id: "3.3.1", name: "User 5", text: "Wowww awsm", replies: [] },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "User 1",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    replies: [
      {
        id: "4.1",
        name: "User 2",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        replies: [
          {
            id: "4.1.1",
            name: "User 3",
            text: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            replies: [{ id: 4.111, name: "User 4", text: "❤️😊", replies: [] }],
          },
        ],
      },
    ],
  },
  {
    id: "5",
    name: "User 1",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    replies: [
      {
        id: "5.1",
        name: "User 2",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        replies: [],
      },
    ],
  },
];

export const LIVE_CHAT_COUNT = 20;

export const LIVE_CHAT_INPUT_LENGTH = 100;
export const LIVE_CHAT_INPUT_LENGTH_WARNING = 70;

export const DUMMY_LIVE_CHAT_DATA = [
  {
    name: "Priya Sharma",
    message:
      "Just watched this tutorial on React hooks - super helpful! The examples were clear and easy to follow. Thanks for sharing!",
  },
  {
    name: "Arjun Patel",
    message:
      "This cooking video is amazing! Finally learned how to make perfect biryani. Can't wait to try this recipe at home.",
  },
  {
    name: "Meera Krishnan",
    message:
      "Great explanation on machine learning algorithms! The visualizations really helped me understand the concepts better.",
  },
  {
    name: "Vikram Singh",
    message:
      "Loved this travel vlog! The cinematography is stunning and now Kerala is definitely on my bucket list. Keep up the great work!",
  },
  {
    name: "Anjali Desai",
    message:
      "This fitness routine is exactly what I needed. Simple exercises that can be done at home. Subscribed!",
  },
];

export const TOASTER_DISPLAY_TIME = 10000;

export const USER_OFFLINE_ERROR_KEYWORDS = [
  "Failed to fetch",
  "NetworkError",
  "Network request failed",
  "Load failed",
  "ERR_INTERNET_DISCONNECTED",
  "ERR_NETWORK_CHANGED",
  "No internet connection",
];

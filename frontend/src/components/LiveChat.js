import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import openai from "../utils/openai";
import ChatInput from "./ChatInput";
import { DUMMY_LIVE_CHAT_DATA } from "../utils/constants";
import { checkOfflineError } from "../utils/helperFunctions";
import { useQuery } from "@tanstack/react-query";
import { fetchLiveMessages } from "../utils/api";
import Offline from "./Offline";

const LiveChat = ({ checkFetch }) => {
  const chatId = useRef(0);
  const dispatch = useDispatch();
  const chatMessage = useSelector((store) => store.chat);
  const isOnline = useSelector((store) => store.app.isOnline);

  const {
    data: messageFromOpenai,
    isError,
    error
  } = useQuery({
    queryKey: ["liveChat"],
    queryFn: fetchLiveMessages,
    retry: 0,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    if (!isOnline) return;

    const i = setInterval(() => {
      if (messageFromOpenai?.length > 0) {
        dispatch(
          addMessage({
            id: ++chatId.current,
            ...messageFromOpenai?.[Math.floor(Math.random() * 10)]
          })
        );
      } else {
        dispatch(
          addMessage({
            id: ++chatId.current,
            ...DUMMY_LIVE_CHAT_DATA[Math.floor(Math.random() * 5)]
          })
        );
      }
    }, 1000);

    return () => {
      clearInterval(i);
    };
  }, [isOnline, messageFromOpenai]);

  if (isError) {
    if (!navigator.onLine) checkFetch();
    else console.error(error);
  }

  return (
    <div className="border border-gray-400 rounded-md w-full aspect-video my-2 flex flex-col md:w-2/6 ">
      <div className="p-2 border-b border-gray-400">
        <h1 className="font-bold">Live Chat:</h1>
      </div>
      <div className="flex flex-col-reverse overflow-y-scroll w-full h-full">
        {chatMessage.map((chat) => (
          <ChatMessage
            key={chat?.id}
            name={chat?.name}
            message={chat?.message}
          />
        ))}
      </div>
      <ChatInput />
    </div>
  );
};

export default LiveChat;

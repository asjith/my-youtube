import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import openai from "../utils/openai";

const LiveChat = () => {
  const messageQueue = useRef([]);
  const chatId = useRef(0);
  const timeoutRef = useRef(null);
  const isUnmounted = useRef(false);
  const dispatch = useDispatch();
  const chatMessage = useSelector((store) => store.chat);

  useEffect(() => {
    fetchLiveMessages();

    const i = setInterval(() => {
      if (messageQueue.current.length > 0) {
        dispatch(
          addMessage({
            id: ++chatId.current,
            ...messageQueue.current.shift(),
          })
        );
      }
    }, 1000);

    return () => {
      isUnmounted.current = true;
      clearInterval(i);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const fetchLiveMessages = async () => {
    if (isUnmounted.current) return;

    const response = await openai.responses.create({
      model: "gpt-5-nano",
      input:
        "I am trying to build a live chat section in my front-end YouTube project. I want you to generate an array of 3 objects where each object contains a key named name(with quotes) with value as a name of the user, some random name can be used and the object should also contain a message key(with quotes) with value as a message which might contain maximum words of 10 or less than 10. The message can be about how awesome the video is, greetings, with or without emojis. Send the object alone, no other writings. Return a valid JSON",
    });

    if (isUnmounted.current) return;

    messageQueue.current.push(...JSON.parse(response.output_text));

    timeoutRef.current = setTimeout(fetchLiveMessages, 1000);
  };

  return (
    <div className="border border-gray-400 rounded-md w-full aspect-video my-2 flex flex-col">
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
      <div className="p-2 border-t border-gray-400 text-xs grid grid-cols-12 gap-1">
        <input
          className="border border-gray-400 rounded-md px-2 py-1 col-span-11 md:col-span-9"
          type="text"
        />
        <button className="bg-gray-200 rounded-md px-2 py-1 col-span-1 md:col-span-3">
          Send
        </button>
      </div>
    </div>
  );
};

export default LiveChat;

import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import openai from "../utils/openai";
import ChatInput from "./ChatInput";
import { DUMMY_LIVE_CHAT_DATA } from "../utils/constants";

const LiveChat = () => {
  const messageFromOpenai = useRef([]);
  const chatId = useRef(0);
  const isUnmounted = useRef(false);
  const dispatch = useDispatch();
  const chatMessage = useSelector((store) => store.chat);

  useEffect(() => {
    fetchLiveMessages();

    const i = setInterval(() => {
      if (messageFromOpenai.current.length > 0) {
        dispatch(
          addMessage({
            id: ++chatId.current,
            ...messageFromOpenai.current[Math.floor(Math.random() * 10)],
          })
        );
      } else {
        dispatch(
          addMessage({
            id: ++chatId.current,
            ...DUMMY_LIVE_CHAT_DATA[Math.floor(Math.random() * 5)],
          })
        );
      }
    }, 1000);

    return () => {
      isUnmounted.current = true;
      clearInterval(i);
    };
  }, []);

  const fetchLiveMessages = async () => {
    if (isUnmounted.current) return;

    const response = await openai.responses.create({
      model: "gpt-5-nano",
      input:
        "I am trying to build a live chat section in my front-end YouTube project. I want you to generate an array of 10 objects where each object contains a key named name(with quotes) with value as a name of the user, some random name can be used and the object should also contain a message key(with quotes) with value as a message which might contain maximum words of 10 or less than 10. The message can be about how awesome the video is, greetings, with or without emojis. Send the object alone, no other writings. Return a valid JSON",
    });

    if (isUnmounted.current) return;

    messageFromOpenai.current.push(...JSON.parse(response.output_text));
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
      <ChatInput />
    </div>
  );
};

export default LiveChat;

import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../utils/chatSlice";

const ChatInput = () => {
  const [liveMessage, setLiveMessage] = useState("");
  const divContentRef = useRef(null);
  const chatId = useRef(Math.random());
  const dispatch = useDispatch();

  const handleSubmit = () => {
    divContentRef.current.innerText = "";
    if (liveMessage.trim() === "") return;
    dispatch(
      addMessage({
        id: ++chatId.current,
        name: "User",
        message: liveMessage,
      })
    );
    setLiveMessage("");
  };

  const handleInput = (e) => {
    if (e.target.innerText.length > 100) {
      const allowedText = e.target.innerText.slice(0, 100);
      divContentRef.current.innerText = allowedText;

      //reset cursor position
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      range.selectNodeContents(divContentRef.current);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
      setLiveMessage(e.target.innerText);

      return;
    }

    setLiveMessage(e.target.innerText);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
      return;
    }
    if (divContentRef.current.innerText.length + 1 > 100) {
      const allowKeys = [
        "Backspace",
        "Delete",
        "ArrowUp",
        "ArrowRight",
        "ArrowLeft",
        "ArrowDown",
      ];
      if (allowKeys.includes(e.key)) return;
      if (e.ctrlKey || e.metaKey) return;
      e.preventDefault();
    }
  };
  return (
    <>
      <form
        className="relative p-2 border-t border-gray-400 text-xs grid grid-cols-12 gap-1"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div
          contentEditable="true"
          className="border border-gray-400 rounded-md px-2 py-1 col-span-9"
          ref={divContentRef}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
        ></div>
        <div className="col-span-3">
          <button
            type="submit"
            className="bg-gray-200 rounded-md px-2 py-1 w-full"
          >
            Send
          </button>
          {liveMessage.length >= 70 && liveMessage.length < 100 && (
            <div className="rounded-md border border-yellow-600 text-white bg-yellow-600 w-4 h-4  my-1 text-[0.5rem] flex items-center justify-center">
              {100 - liveMessage.length}
            </div>
          )}
          {liveMessage.length === 100 && (
            <div className="rounded-md border border-red-600 text-white bg-red-600 w-4 h-4 my-1 text-[0.5rem] flex items-center justify-center">
              0
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default ChatInput;

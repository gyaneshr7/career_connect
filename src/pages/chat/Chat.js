import React, { useContext } from "react";
import "./Chatpage.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { selectChannelId, selectChannelName } from "./features/appSlice";
import { useState } from "react";
import { useEffect } from "react";
import db from "./firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { Context } from "../../context/Context";
import ThreeDotDropdown from "./ThreeDotDropdown";

const Chat = () => {
  const { user } = useContext(Context);
  console.log(user);

  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id, // Add message ID to the message object
              ...doc.data(), // Spread the rest of the message data
            }))
          );
        });
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("channels").doc(channelId).collection("messages").add({
      message: input,
      user: user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
    document.getElementsByTagName('textarea')[0].style.height = "7vh";
  };

  const deleteItem = (id) => {
    db.collection("channels")
      .doc(channelId)
      .collection("messages")
      .doc(id)
      .delete();

    const newItems = messages.map((message) => {
      return message.id !== id;
    });
    setMessages([...newItems]);
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />

      <div className="chat__messages">
        {messages.map((message) => {
          console.log(message);
        })}
        {messages.map((message) => (
          <Message
            message={message.message}
            timestamp={message.timestamp}
            user={message.user}
            id={message.id}
            onDelete={deleteItem}
          />
        ))}
      </div>

      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form onSubmit={sendMessage}>
          <textarea
            type="text"
            disabled={!channelId}
            value={input}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.shiftKey) {
                const selection = window.getSelection().anchorNode[0];
                // const range = selection.getRangeAt(0);
                console.log(selection)
                const br = document.createElement("br");
                // range.deleteContents();
                // range.insertNode(br);
                // range.collapse(false);
                e.preventDefault();
              }
            }}
            onChange={(e) => {
              e.preventDefault();
              setInput(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            placeholder={`Message #${channelName}`}
          />
          <button
            className="chat__inputButton relative top-4"
            disabled={
              !channelId ||
              input.split(" ").filter((s) => {
                return s != "";
              }).length === 0
            }
            type="submit"
            onClick={sendMessage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20pt"
              height="20pt"
              viewBox="0 0 64 64"
              style={{ isolation: "isolate" }}
              id="send"
            >
              <defs>
                <clipPath id="a">
                  <rect width="64" height="64"></rect>
                </clipPath>
              </defs>
              <g clip-path="url(#a)">
                <path d=" M 8.216 36.338 L 26.885 32.604 C 28.552 32.271 28.552 31.729 26.885 31.396 L 8.216 27.662 C 7.104 27.44 6.021 26.356 5.799 25.245 L 2.065 6.576 C 1.731 4.908 2.714 4.133 4.259 4.846 L 61.228 31.139 C 62.257 31.614 62.257 32.386 61.228 32.861 L 4.259 59.154 C 2.714 59.867 1.731 59.092 2.065 57.424 L 5.799 38.755 C 6.021 37.644 7.104 36.56 8.216 36.338 Z "></path>
              </g>
            </svg>
          </button>
        </form>

        {/* <div className="chat__inputIcon">
                    <CradGiftcardIcon fontSize='large' />
                    <GifIcon fontSize='large' />
                    <EmojiEmoticonsIcon fontSize='large' />
                </div> */}
      </div>
    </div>
  );
};

export default Chat;

import React, { useEffect, useState } from "react";
import { Message } from "../../types/message";
import { SendMessage } from "../../utils/functions/sendMessage";
import { useAuth } from "../../context/AuthContext";
import moment from "moment";
import Link from "next/link";

type ChatProps = {
  messages: Message[];
  conversationId: number;
};

const Chat = ({ messages, conversationId }: ChatProps) => {
  const [messageData, setMessageData] = useState(messages);
  const [authorNameMap, setAuthorNameMap] = useState({});
  const [newMessage, setNewMessage] = useState<string>("");
  const { user } = useAuth();
  const authorId = user?.id;
  const timestamp = Date.now();
  useEffect(() => {
    // Function to fetch user names based on authorId
    const fetchUserNames = async () => {
      const uniqueAuthorIds = Array.from(
        new Set(messageData.map((message) => message.authorId))
      );

      for (const authorId of uniqueAuthorIds) {
        if (!authorNameMap[authorId]) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/${authorId}`
          );
          if (response.ok) {
            const userData = await response.json();

            setAuthorNameMap((prevMap) => ({
              ...prevMap,
              [authorId]: userData[0].nickname,
            }));
          }
        }
      }
    };

    fetchUserNames();
  }, [messageData, authorNameMap]);

  return (
    <>
      <div className="py-8 text-center">
        <button className="px-4 py-2 text-blue-500 bg-transparent border border-blue-500 rounded-lg">
          <Link href={"/"}>Retour</Link>
        </button>
      </div>
      <div className="max-w-[77.5rem] m-auto flex  flex-col ">
        <div className="flex-grow overflow-y-auto">
          <div className="flex flex-col p-4 space-y-2">
            {/* <!-- Individual chat message --> */}
            {messageData.map((message) => (
              <div
                key={message.id}
                className={`${
                  message.authorId === authorId
                    ? "self-end bg-blue-500 text-white"
                    : "self-start bg-white"
                } rounded-lg p-2 flex items-start flex-col `}
              >
                <span className="font-bold ">
                  {authorNameMap[message.authorId] || "Unknown User"}
                </span>
                <p className="py-2 text-lg">{message.body}</p>
                <div className="text-xs">
                  {moment.unix(message.timestamp).format("MM/DD/YY, h:mmA")}
                </div>
              </div>
            ))}
          </div>
        </div>
        <form className="flex items-center p-4">
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <button
            className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-lg"
            onClick={(e) => {
              e.preventDefault(),
                SendMessage(
                  conversationId,
                  authorId,
                  newMessage,
                  setMessageData,
                  messageData,
                  setNewMessage
                );
            }}
            disabled={newMessage === ""}
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default Chat;

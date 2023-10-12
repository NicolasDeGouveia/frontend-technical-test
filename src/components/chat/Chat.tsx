import React, { useEffect, useState } from "react";
import { Message } from "../../types/message";
import { SendMessage } from "../../utils/functions/sendMessage";
import { useAuth } from "../../context/AuthContext";

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
    <div className="max-w-[77.5rem] m-auto flex h-screen  flex-col ">
      <div className="flex-grow overflow-y-auto">
        <div className="flex flex-col p-4 space-y-2">
          {/* <!-- Individual chat message --> */}
          {messageData.map((message) => (
            <div
              key={message.id}
              className={`${
                message.authorId === authorId
                  ? "self-end bg-blue-500 text-white"
                  : "self-start bg-gray-200"
              } rounded-lg p-2 flex items-start flex-col `}
            >
              <span className="mr-2 font-bold">
                {authorNameMap[message.authorId] || "Unknown User"}
              </span>
              <p>{message.body}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center p-4">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button
          className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-lg"
          onClick={() =>
            SendMessage(
              conversationId,
              authorId,
              newMessage,
              setMessageData,
              messageData,
              setNewMessage
            )
          }
          disabled={newMessage === ""}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

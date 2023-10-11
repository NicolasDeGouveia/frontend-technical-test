import React, { useEffect, useState } from "react";
import { Message } from "../../types/message";

type ChatProps = {
  messages: Message[];
};

const Chat = ({ messages }: ChatProps) => {
  const [messageData, setMessageData] = useState(messages);
  const [authorNameMap, setAuthorNameMap] = useState({});

  useEffect(() => {
    // Function to fetch user names based on authorId
    const fetchUserNames = async () => {
      const uniqueAuthorIds = Array.from(
        new Set(messageData.map((message) => message.authorId))
      );

      for (const authorId of uniqueAuthorIds) {
        if (!authorNameMap[authorId]) {
          const response = await fetch(
            `http://localhost:3005/user/${authorId}`
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
  }, []);

  return (
    <div className="flex h-screen  flex-col bg-gray-100">
      <div className="flex-grow overflow-y-auto">
        <div className="flex flex-col space-y-2 p-4">
          {/* <!-- Individual chat message --> */}
          {messageData.map((message) => (
            <div
              key={message.id}
              className={`${
                message.authorId === 1
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
      <div className="p-4 flex items-center">
        <input
          type="text"
          placeholder="Type your message..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-full"
        />
        <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

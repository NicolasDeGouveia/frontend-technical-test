import React, { useEffect, useState } from "react";
import { Message } from "../../types/message";
import { SendMessage } from "../../utils/functions/sendMessage";
import { useAuth } from "../../context/AuthContext";

import Link from "next/link";
import { getUserNameById } from "../../utils/functions/getUserNameById";
import ChatBubble from "./ChatBubble";

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
    getUserNameById(messageData, authorNameMap, setAuthorNameMap);
  }, [messageData, authorNameMap]);

  return (
    <>
      <div className="py-8 text-center">
        <button
          className="px-4 py-2 text-blue-500 bg-transparent border border-blue-500 rounded-lg"
          aria-label="retour"
        >
          <Link href={"/"}>Retour</Link>
        </button>
      </div>
      <div className="max-w-[77.5rem] m-auto flex  flex-col ">
        <div className="flex-grow overflow-y-auto">
          <div className="flex flex-col p-4 space-y-2">
            {/* <!-- Individual chat message --> */}
            {messageData.map((message, index: number) => (
              <React.Fragment key={index}>
                <ChatBubble
                  message={message}
                  authorId={authorId}
                  authorNameMap={authorNameMap}
                />
              </React.Fragment>
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
            className="px-4 py-2 ml-2 text-white bg-[#1654b1] rounded-lg"
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
            aria-label="Envoyer"
          >
            Envoyer
          </button>
        </form>
      </div>
    </>
  );
};

export default Chat;

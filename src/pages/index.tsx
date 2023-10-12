import React, { useEffect, type ReactElement, useState } from "react";
import List from "../components/conversationlist/ConversationList";
import { Conversation } from "../types/conversation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const Home = (): ReactElement => {
  const [conversationsData, setConversationsData] = useState<Conversation[]>(
    []
  );
  const { user } = useAuth();

  useEffect(() => {
    async function getConversationByUser(userId: number) {
      const response = await fetch(
        `http://localhost:3005/conversations/${userId}`
      );
      const data = await response.json();
      setConversationsData(data);
    }
    if (user) {
      getConversationByUser(user.id);
    }
  }, [user]);

  console.log(conversationsData);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {user && (
        <>
          {conversationsData.map((conversation: Conversation, index) => (
            <React.Fragment
              key={`${conversation.recipientId}-${conversation.senderId}`}
            >
              <Link
                className="w-3/4 md:w-2/4"
                href={`/conversation/${conversation.id}`}
              >
                <List conversation={conversation} userId={user.id} />
              </Link>
            </React.Fragment>
          ))}
        </>
      )}
      {!user && (
        <div>
          Merci de vous connecter afin de voir ou commencer une conversation.
        </div>
      )}
    </div>
  );
};

export default Home;

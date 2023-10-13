import React, { useEffect, type ReactElement, useState } from "react";
import { Conversation } from "../types/conversation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import CreateConversation from "../components/createconversation/CreateConversation";
import ConversationList from "../components/conversationlist/ConversationList";
import { getConversationByUser } from "../utils/functions/getConversationByUser";

const Home = (): ReactElement => {
  const [conversationsData, setConversationsData] = useState<Conversation[]>(
    []
  );
  const [toggleButton, setToggleButton] = useState<boolean>(false);
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      getConversationByUser(user.id, setConversationsData);
    }
    if (refreshData) {
      setRefreshData(false);
    }
  }, [user, refreshData]);

  return (
    <main className="px-10 md:px-20">
      {user && (
        <>
          <div
            className="flex justify-center px-4 py-2 m-auto mt-2 mb-4 rounded-lg w-fit"
            onClick={() => {
              setToggleButton(true);
            }}
          >
            <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
              Nouvelle conversation
            </button>
          </div>
          {toggleButton && (
            <CreateConversation
              conversations={conversationsData}
              setRefreshData={setRefreshData}
              setToggleButton={setToggleButton}
            />
          )}
        </>
      )}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
        {user && (
          <>
            {conversationsData.map((conversation: Conversation, index) => (
              <React.Fragment
                key={`${conversation.recipientId}-${conversation.senderId}`}
              >
                <Link href={`/conversation/${conversation.id}`}>
                  <ConversationList
                    conversation={conversation}
                    userId={user.id}
                  />
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
    </main>
  );
};

export default Home;

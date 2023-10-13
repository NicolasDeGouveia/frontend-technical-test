import React, { useEffect, type ReactElement, useState } from "react";
import { Conversation } from "../types/conversation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import CreateConversation from "../components/createconversation/CreateConversation";
import ConversationList from "../components/conversationlist/ConversationList";
import { getConversationByUser } from "../utils/functions/getConversationByUser";
import Head from "next/head";
import { getRecipientPicture } from "../utils/functions/getRecipientPicture";
import { getAllUsers } from "../utils/functions/getAllUsers";

const Home = (): ReactElement => {
  const [conversationsData, setConversationsData] = useState<Conversation[]>(
    []
  );
  const [toggleButton, setToggleButton] = useState<boolean>(false);
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const { user, allUsers } = useAuth();

  useEffect(() => {
    if (user) {
      getConversationByUser(user.id, setConversationsData);
    }
    if (refreshData) {
      setRefreshData(false);
    }
  }, [user, refreshData]);

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <main className="px-10 md:px-20">
        {user && (
          <>
            <div
              className="flex justify-center px-4 py-2 m-auto mt-2 mb-4 rounded-lg w-fit"
              onClick={() => {
                setToggleButton(true);
              }}
            >
              <button
                className="px-4 py-2 text-white bg-[#1654b1] rounded-lg hover:bg-blue-600"
                aria-label="Nouvelle conversation"
              >
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
        {user && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
            {conversationsData.map((conversation: Conversation, index) => (
              <React.Fragment
                key={`${conversation.recipientId}-${conversation.senderId}`}
              >
                <Link href={`/conversation/${conversation.id}`}>
                  <ConversationList
                    conversation={conversation}
                    userId={user.id}
                    picture_url={getRecipientPicture(
                      user.id,
                      conversation,
                      allUsers
                    )}
                  />
                </Link>
              </React.Fragment>
            ))}
          </div>
        )}
        {!user && (
          <div className="text-center">
            Merci de vous connecter afin de voir ou commencer une conversation.
          </div>
        )}
      </main>
    </>
  );
};

export default Home;

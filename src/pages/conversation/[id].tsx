import React from "react";
import Chat from "../../components/chat/Chat";
import { getCookie } from "cookies-next";
import Head from "next/head";

const ConversationPage = ({ messages, conversationId }) => {
  return (
    <>
      <Head>
        <title>Conversation</title>
      </Head>
      <div className="bg-gray-200">
        {<Chat messages={messages} conversationId={conversationId} />}
      </div>
    </>
  );
};

export default ConversationPage;

export async function getServerSideProps({ req, res, params }) {
  const cookie = getCookie("userToken", { req, res });
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/messages/${params.id}`
  );
  const data = await response.json();

  if (!cookie) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: { messages: data, conversationId: params.id },
  };
}

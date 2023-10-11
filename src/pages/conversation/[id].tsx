import React from "react";
import { useRouter } from "next/router";
type Props = {};

const ConversationPage = (props: Props) => {
  const router = useRouter();

  return <div>this is the conversation with id {router.query.id}</div>;
};

export default ConversationPage;

// conversationHandler.js
import { onCreateConversation } from "../onCreateConversation";
import { notifyMsgError } from "../../notify/Notify";
import { Conversation } from "../../../types/conversation";

export const conversationHandler = (
  conversations: Conversation[],
  selectedRecipient: number,
  selectedRecipientName: string,
  userId: number,
  currentUserName: string,
  setRefreshData: React.Dispatch<React.SetStateAction<boolean>>,
  setToggleButton: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const existingConversation = conversations.find(
    (conversation) => conversation.recipientId === selectedRecipient
  );

  if (existingConversation) {
    notifyMsgError("Une conversation avec cet utilisateur existe déjà.");
  } else {
    onCreateConversation(
      userId,
      selectedRecipient,
      selectedRecipientName,
      currentUserName,
      setRefreshData
    );
    setToggleButton(false);
  }
};

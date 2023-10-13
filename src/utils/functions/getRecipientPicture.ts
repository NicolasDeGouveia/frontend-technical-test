import { Conversation } from "../../types/conversation";
import { User } from "../../types/user";

export function getRecipientPicture(userId: number, conversation: Conversation, users: User[]): string | undefined {
  const { recipientId, senderId } = conversation;
  
  if (userId === recipientId) {
    // If the current user is the recipient, return the sender's picture
    const sender = users.find((user) => user.id === senderId);
    return sender?.picture;
  } else {
    // If the current user is not the recipient, return the recipient's picture
    const recipient = users.find((user) => user.id === recipientId);
    return recipient?.picture;
  }
}
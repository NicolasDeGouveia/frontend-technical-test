import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { onCreateConversation } from "../../utils/functions/onCreateConversation";
import { Conversation } from "../../types/conversation";
import { notifyMsgError } from "../../utils/notify/Notify";

type CreateConversationProps = {
  conversations: Conversation[];
  setRefreshData: React.Dispatch<React.SetStateAction<boolean>>;
  setToggleButton: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateConversation = ({
  conversations,
  setRefreshData,
  setToggleButton,
}: CreateConversationProps) => {
  const [selectedRecipient, setSelectedRecipient] = useState<number | null>(
    null
  );
  const [selectedRecipientName, setSelectedRecipientName] =
    useState<string>("");
  const { allUsers, user } = useAuth();
  const userId = user.id;

  const currentUserName = user.nickname;

  const handleRecipientChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = event.target.options[selectedIndex];
    const recipientId = parseInt(event.target.value, 10);
    const recipientName = selectedOption.text;
    setSelectedRecipient(recipientId);
    setSelectedRecipientName(recipientName);
  };

  const handleCreateConversation = () => {
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
    }
  };

  const filteredUsers = allUsers.filter(
    (user) => user.nickname !== currentUserName
  );
  return (
    <div className="flex flex-col items-center justify-center p-6 m-auto mt-4 bg-white rounded-lg w-fit">
      <h2 className="mb-4 text-lg font-bold">
        Commencer une nouvelle conversation
      </h2>
      <label>Contact:</label>
      <select
        onChange={handleRecipientChange}
        className="p-2 my-4 bg-gray-200 rounded-lg"
      >
        <option value="" disabled>
          -- Selectionner un contact --
        </option>
        {filteredUsers.map((user) => (
          <option key={user.id} value={user.id}>
            {user.nickname}
          </option>
        ))}
      </select>

      <button
        onClick={() => {
          handleCreateConversation(), setToggleButton(false);
        }}
        disabled={selectedRecipient === null}
        className={`px-4 py-2  text-white bg-blue-500 rounded-lg ${
          selectedRecipient === null ? "" : "bg-blue-600 hover:bg-blue-500"
        }`}
      >
        Commencer la conversation
      </button>
    </div>
  );
};

export default CreateConversation;

import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { onCreateConversation } from "../../utils/functions/onCreateConversation";
import { Conversation } from "../../types/conversation";

type CreateConversationProps = {
  conversations: Conversation[];
  setError: React.Dispatch<React.SetStateAction<string>>;
  setRefreshData: React.Dispatch<React.SetStateAction<boolean>>;
  setToggleButton: React.Dispatch<React.SetStateAction<boolean>>;
  setSuccess: React.Dispatch<React.SetStateAction<string>>;
};

const CreateConversation = ({
  conversations,
  setError,
  setRefreshData,
  setToggleButton,
  setSuccess,
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
      setError("Une conversation avec cet utilisateur existe déjà.");
    } else {
      onCreateConversation(
        userId,
        selectedRecipient,
        selectedRecipientName,
        currentUserName,
        setSuccess,
        setRefreshData,
        setError
      );
    }
  };

  const filteredUsers = allUsers.filter(
    (user) => user.nickname !== currentUserName
  );
  return (
    <div className="flex flex-col items-center justify-center p-4 m-auto mt-4 bg-white rounded-lg w-fit">
      <h2 className="mb-2 text-lg font-bold">
        Commencer une nouvelle conversation
      </h2>
      <label>Selectionner un contact:</label>
      <select
        onChange={handleRecipientChange}
        className="p-2 my-4 bg-gray-200 rounded-lg"
      >
        <option value="">Selectionner un contact</option>
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
        className="px-4 py-2 border border-black rounded-lg"
      >
        Commencer la conversation
      </button>
    </div>
  );
};

export default CreateConversation;

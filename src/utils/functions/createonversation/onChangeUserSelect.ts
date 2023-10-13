export const onChangeUserSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
    setSelectedRecipient:React.Dispatch<React.SetStateAction<number>>,
    setSelectedRecipientName: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = event.target.options[selectedIndex];
    const recipientId = parseInt(event.target.value, 10);
    const recipientName = selectedOption.text;
    setSelectedRecipient(recipientId);
    setSelectedRecipientName(recipientName);
  };
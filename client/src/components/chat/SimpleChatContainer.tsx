import { useState } from 'react';
import { SimpleChatButton } from './SimpleChatButton';
import { SimpleChatWidget } from './SimpleChatWidget';

export function SimpleChatContainer() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  return (
    <>
      <SimpleChatButton onClick={handleToggleChat} />
      <SimpleChatWidget isOpen={isOpen} onClose={handleCloseChat} />
    </>
  );
}

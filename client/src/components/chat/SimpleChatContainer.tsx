import { useState, useEffect } from 'react';
import { SimpleChatButton } from './SimpleChatButton';
import { SimpleChatWidget } from './SimpleChatWidget';

export function SimpleChatContainer() {
  const [isOpen, setIsOpen] = useState(false);

  // Handle escape key to close chat
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

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


import React from 'react';

interface MessageDisplayProps {
  message: string;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="bg-black/40 p-3 rounded-lg text-white text-sm mb-4">
      <p className="whitespace-pre-line">{message}</p>
    </div>
  );
};

export default MessageDisplay;

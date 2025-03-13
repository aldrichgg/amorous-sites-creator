
import React from 'react';

interface MessageDisplayProps {
  message: string;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="backdrop-blur-sm bg-white/5 border border-white/10 p-4 rounded-lg text-white text-sm mb-4 shadow-sm">
      <p className="whitespace-pre-line">{message}</p>
    </div>
  );
};

export default MessageDisplay;


import React from 'react';
import DOMPurify from 'dompurify';

interface MessageDisplayProps {
  message: string;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ message }) => {
  if (!message) return null;
  
  const createMarkup = (html: string) => {
    return { __html: DOMPurify.sanitize(html) };
  };
  
  return (
    <div className="backdrop-blur-sm bg-black/30 dark:bg-white/10 border border-white/10 p-4 rounded-lg text-white mb-4 shadow-sm">
      <div 
        className="whitespace-pre-line text-white"
        dangerouslySetInnerHTML={createMarkup(message)}
      />
    </div>
  );
};

export default MessageDisplay;

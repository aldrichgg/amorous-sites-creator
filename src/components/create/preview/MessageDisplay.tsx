
import React from 'react';

interface MessageDisplayProps {
  message: string;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ message }) => {
  if (!message) return null;
  
  // Process the message text to handle formatting
  const processMessage = (text: string) => {
    // Handle bold text
    let processedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Handle italic text
    processedText = processedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Handle underlined text
    processedText = processedText.replace(/__(.*?)__/g, '<u>$1</u>');
    
    // Handle text alignment
    processedText = processedText.replace(/<left>(.*?)<\/left>/g, '<div style="text-align: left;">$1</div>');
    processedText = processedText.replace(/<center>(.*?)<\/center>/g, '<div style="text-align: center;">$1</div>');
    processedText = processedText.replace(/<right>(.*?)<\/right>/g, '<div style="text-align: right;">$1</div>');
    
    // Handle line breaks
    processedText = processedText.replace(/\n/g, '<br />');
    
    return processedText;
  };
  
  return (
    <div className="backdrop-blur-sm bg-black/30 dark:bg-black/50 border border-white/10 p-4 rounded-lg text-white text-sm mb-4 shadow-sm">
      <div 
        className="whitespace-pre-line text-white dark:text-white"
        dangerouslySetInnerHTML={{ __html: processMessage(message) }}
      />
    </div>
  );
};

export default MessageDisplay;

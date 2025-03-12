
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bold, Italic, Underline, AlignLeft } from 'lucide-react';

interface MessageEditorProps {
  message: string;
  onMessageChange: (message: string) => void;
}

const MessageEditor: React.FC<MessageEditorProps> = ({
  message,
  onMessageChange
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onMessageChange(e.target.value);
  };
  
  const applyFormatting = (format: string) => {
    // This is a simplified version - in a real app you'd implement proper formatting
    console.log(`Applying formatting: ${format}`);
  };
  
  return (
    <div className="w-full max-w-lg mx-auto pb-6">
      <motion.h2 
        className="text-3xl font-bold mb-4 text-center text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Mensagem
      </motion.h2>
      
      <motion.p 
        className="text-gray-300 mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Escreva uma mensagem especial. Seja criativo, conte a história da sua memória, ou demonstre seu amor.
      </motion.p>
      
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center space-x-1 bg-gray-900 rounded-t-lg p-2 border-b border-gray-700">
          <motion.button
            className="p-2 rounded hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => applyFormatting('bold')}
          >
            <Bold className="w-4 h-4 text-gray-300" />
          </motion.button>
          
          <motion.button
            className="p-2 rounded hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => applyFormatting('italic')}
          >
            <Italic className="w-4 h-4 text-gray-300" />
          </motion.button>
          
          <motion.button
            className="p-2 rounded hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => applyFormatting('underline')}
          >
            <Underline className="w-4 h-4 text-gray-300" />
          </motion.button>
          
          <div className="h-5 w-px bg-gray-700 mx-1"></div>
          
          <motion.button
            className="p-2 rounded hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => applyFormatting('align')}
          >
            <AlignLeft className="w-4 h-4 text-gray-300" />
          </motion.button>
        </div>
        
        <textarea
          value={message}
          onChange={handleChange}
          placeholder="Digite sua mensagem aqui..."
          className="w-full h-32 p-3 bg-gray-900 rounded-b-lg text-white focus:outline-none focus:ring-1 focus:ring-memcyan transition-all duration-300 placeholder-gray-500 resize-none"
        ></textarea>
        
        <div className="flex justify-end">
          <span className="text-xs text-gray-500">
            {message.length} caracteres
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default MessageEditor;

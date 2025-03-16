
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface MessageEditorProps {
  message: string;
  onMessageChange: (message: string) => void;
}

const MessageEditor: React.FC<MessageEditorProps> = ({
  message,
  onMessageChange
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  
  const handleInput = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      onMessageChange(content);
    }
  };
  
  const applyFormatting = (format: string) => {
    document.execCommand('styleWithCSS', false, 'true');
    
    switch (format) {
      case 'bold':
        document.execCommand('bold', false);
        break;
      case 'italic':
        document.execCommand('italic', false);
        break;
      case 'underline':
        document.execCommand('underline', false);
        break;
      case 'left':
        document.execCommand('justifyLeft', false);
        break;
      case 'center':
        document.execCommand('justifyCenter', false);
        break;
      case 'right':
        document.execCommand('justifyRight', false);
        break;
      default:
        break;
    }
    
    // Update parent component with new content
    if (editorRef.current) {
      onMessageChange(editorRef.current.innerHTML);
    }
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
            type="button"
          >
            <Bold className="w-4 h-4 text-gray-300" />
          </motion.button>
          
          <motion.button
            className="p-2 rounded hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => applyFormatting('italic')}
            type="button"
          >
            <Italic className="w-4 h-4 text-gray-300" />
          </motion.button>
          
          <motion.button
            className="p-2 rounded hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => applyFormatting('underline')}
            type="button"
          >
            <Underline className="w-4 h-4 text-gray-300" />
          </motion.button>
          
          <div className="h-5 w-px bg-gray-700 mx-1"></div>
          
          <motion.button
            className="p-2 rounded hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => applyFormatting('left')}
            type="button"
          >
            <AlignLeft className="w-4 h-4 text-gray-300" />
          </motion.button>
          
          <motion.button
            className="p-2 rounded hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => applyFormatting('center')}
            type="button"
          >
            <AlignCenter className="w-4 h-4 text-gray-300" />
          </motion.button>
          
          <motion.button
            className="p-2 rounded hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => applyFormatting('right')}
            type="button"
          >
            <AlignRight className="w-4 h-4 text-gray-300" />
          </motion.button>
        </div>
        
        <div
          ref={editorRef}
          contentEditable
          dangerouslySetInnerHTML={{ __html: message }}
          onInput={handleInput}
          className="min-h-32 p-3 bg-gray-900 rounded-b-lg text-white focus:outline-none focus:ring-1 focus:ring-memcyan transition-all duration-300 placeholder-gray-500 overflow-auto"
          style={{ whiteSpace: 'pre-wrap' }}
        />
        
        <div className="flex justify-end">
          <span className="text-xs text-gray-500">
            {message.replace(/<[^>]*>/g, '').length} caracteres
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default MessageEditor;

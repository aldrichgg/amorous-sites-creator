
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";

interface MessageEditorProps {
  message: string;
  onMessageChange: (message: string) => void;
}

const MessageEditor: React.FC<MessageEditorProps> = ({
  message,
  onMessageChange
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onMessageChange(e.target.value);
  };
  
  const applyFormatting = (format: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = message.substring(start, end);
    
    let formattedText = '';
    let newCursorPosition = end;
    
    switch (format) {
      case 'bold':
        formattedText = message.substring(0, start) + `**${selectedText}**` + message.substring(end);
        newCursorPosition = end + 4; // Account for ** at start and end
        break;
      case 'italic':
        formattedText = message.substring(0, start) + `*${selectedText}*` + message.substring(end);
        newCursorPosition = end + 2; // Account for * at start and end
        break;
      case 'underline':
        formattedText = message.substring(0, start) + `__${selectedText}__` + message.substring(end);
        newCursorPosition = end + 4; // Account for __ at start and end
        break;
      case 'align-left':
        formattedText = message.substring(0, start) + `<left>${selectedText}</left>` + message.substring(end);
        newCursorPosition = end + 13; // Account for <left></left> tags
        break;
      case 'align-center':
        formattedText = message.substring(0, start) + `<center>${selectedText}</center>` + message.substring(end);
        newCursorPosition = end + 17; // Account for <center></center> tags
        break;
      case 'align-right':
        formattedText = message.substring(0, start) + `<right>${selectedText}</right>` + message.substring(end);
        newCursorPosition = end + 15; // Account for <right></right> tags
        break;
      default:
        return;
    }
    
    onMessageChange(formattedText);
    
    // Reset cursor position after state update
    setTimeout(() => {
      if (textarea) {
        textarea.focus();
        textarea.setSelectionRange(newCursorPosition, newCursorPosition);
      }
    }, 0);
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
        <div className="flex flex-wrap items-center gap-1 bg-gray-900 rounded-t-lg p-2 border-b border-gray-700">
          <motion.button
            className="p-2 rounded hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Negrito"
            onClick={() => applyFormatting('bold')}
          >
            <Bold className="w-4 h-4 text-gray-300" />
          </motion.button>
          
          <motion.button
            className="p-2 rounded hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Itálico"
            onClick={() => applyFormatting('italic')}
          >
            <Italic className="w-4 h-4 text-gray-300" />
          </motion.button>
          
          <motion.button
            className="p-2 rounded hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Sublinhado"
            onClick={() => applyFormatting('underline')}
          >
            <Underline className="w-4 h-4 text-gray-300" />
          </motion.button>
          
          <div className="h-5 w-px bg-gray-700 mx-1"></div>
          
          <motion.button
            className="p-2 rounded hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Alinhar à esquerda"
            onClick={() => applyFormatting('align-left')}
          >
            <AlignLeft className="w-4 h-4 text-gray-300" />
          </motion.button>
          
          <motion.button
            className="p-2 rounded hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Centralizar"
            onClick={() => applyFormatting('align-center')}
          >
            <AlignCenter className="w-4 h-4 text-gray-300" />
          </motion.button>
          
          <motion.button
            className="p-2 rounded hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Alinhar à direita"
            onClick={() => applyFormatting('align-right')}
          >
            <AlignRight className="w-4 h-4 text-gray-300" />
          </motion.button>
        </div>
        
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          placeholder="Digite sua mensagem aqui..."
          className="w-full h-32 p-3 bg-gray-900 rounded-b-lg text-white focus:outline-none focus:ring-1 focus:ring-memcyan transition-all duration-300 placeholder-gray-500 resize-none"
        />
        
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

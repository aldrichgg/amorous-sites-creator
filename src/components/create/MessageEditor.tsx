
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Type } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

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
        className="text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 font-spectral"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Mensagem
      </motion.h2>
      
      <motion.p 
        className="text-gray-300 mb-6 text-center font-manrope"
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
        <div className="flex items-center space-x-1 bg-gray-900/80 backdrop-blur-sm rounded-t-lg p-2 border-b border-gray-700 shadow-lg">
          <div className="flex items-center space-x-1 mr-2">
            <motion.button
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => applyFormatting('bold')}
              title="Negrito"
            >
              <Bold className="w-4 h-4 text-gray-300" />
            </motion.button>
            
            <motion.button
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => applyFormatting('italic')}
              title="Itálico"
            >
              <Italic className="w-4 h-4 text-gray-300" />
            </motion.button>
            
            <motion.button
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => applyFormatting('underline')}
              title="Sublinhado"
            >
              <Underline className="w-4 h-4 text-gray-300" />
            </motion.button>
          </div>
          
          <div className="h-5 w-px bg-gray-700 mx-1"></div>
          
          <div className="flex items-center space-x-1">
            <motion.button
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => applyFormatting('align-left')}
              title="Alinhar à esquerda"
            >
              <AlignLeft className="w-4 h-4 text-gray-300" />
            </motion.button>
            
            <motion.button
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => applyFormatting('align-center')}
              title="Centralizar"
            >
              <AlignCenter className="w-4 h-4 text-gray-300" />
            </motion.button>
            
            <motion.button
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => applyFormatting('align-right')}
              title="Alinhar à direita"
            >
              <AlignRight className="w-4 h-4 text-gray-300" />
            </motion.button>
          </div>
          
          <div className="ml-auto">
            <motion.button
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => applyFormatting('font-size')}
              title="Tamanho da fonte"
            >
              <Type className="w-4 h-4 text-gray-300" />
            </motion.button>
          </div>
        </div>
        
        <Textarea
          value={message}
          onChange={handleChange}
          placeholder="Compartilhe suas memórias, sentimentos e histórias especiais..."
          className="w-full h-40 p-4 bg-gray-900/80 backdrop-blur-sm rounded-b-lg text-white focus:outline-none focus:ring-1 focus:ring-memcyan transition-all duration-300 resize-none shadow-inner border-t-0 font-manrope"
        />
        
        <div className="flex justify-between items-center mt-2 px-1">
          <span className="text-xs text-memcyan font-manrope">
            Use sua criatividade para escrever algo especial
          </span>
          <span className="text-xs text-gray-500 font-manrope">
            {message.length} caracteres
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default MessageEditor;

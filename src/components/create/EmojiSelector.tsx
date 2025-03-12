
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Smile } from 'lucide-react';

// Lista simplificada de emojis para o exemplo
const emojiCategories = {
  "Smiles & People": [
    "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", 
    "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚"
  ],
  "Animals & Nature": [
    "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯",
    "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧", "🐦", "🐤", "🐣"
  ],
  "Food & Drink": [
    "🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈",
    "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑", "🥦"
  ],
  "Activities": [
    "⚽️", "🏀", "🏈", "⚾️", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱",
    "🏓", "🏸", "🏒", "🏑", "🥍", "🏏", "🥅", "⛳️", "🏹", "🎣"
  ]
};

interface EmojiSelectorProps {
  selectedEmoji: string;
  onEmojiSelect: (emoji: string) => void;
}

const EmojiSelector: React.FC<EmojiSelectorProps> = ({
  selectedEmoji,
  onEmojiSelect
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Smiles & People');
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Filtrar emojis baseado na busca
  const filteredEmojis = searchTerm
    ? Object.values(emojiCategories).flat().filter(emoji => 
        emoji.includes(searchTerm.toLowerCase()))
    : emojiCategories[activeCategory as keyof typeof emojiCategories];
  
  return (
    <div className="w-full max-w-lg mx-auto pb-6">
      <motion.h2 
        className="text-3xl font-bold mb-4 text-center text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Emoji
      </motion.h2>
      
      <motion.p 
        className="text-gray-300 mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Selecione um emoji para personalizar o fundo da sua página.
      </motion.p>
      
      <motion.div
        className="glass-card rounded-xl p-4 overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex overflow-x-auto space-x-2 pb-2 mb-3">
          <button className="flex-shrink-0 p-2 rounded-md bg-gray-800/50 hover:bg-gray-700/50 transition-colors">
            <Smile className="w-5 h-5 text-gray-300" />
          </button>
          <button className="flex-shrink-0 p-2 rounded-md bg-gray-800/50 hover:bg-gray-700/50 transition-colors">
            <span className="text-xl">🐱</span>
          </button>
          <button className="flex-shrink-0 p-2 rounded-md bg-gray-800/50 hover:bg-gray-700/50 transition-colors">
            <span className="text-xl">🍕</span>
          </button>
          <button className="flex-shrink-0 p-2 rounded-md bg-gray-800/50 hover:bg-gray-700/50 transition-colors">
            <span className="text-xl">⚽</span>
          </button>
          <button className="flex-shrink-0 p-2 rounded-md bg-gray-800/50 hover:bg-gray-700/50 transition-colors">
            <span className="text-xl">🚗</span>
          </button>
          <button className="flex-shrink-0 p-2 rounded-md bg-gray-800/50 hover:bg-gray-700/50 transition-colors">
            <span className="text-xl">💡</span>
          </button>
          <button className="flex-shrink-0 p-2 rounded-md bg-gray-800/50 hover:bg-gray-700/50 transition-colors">
            <span className="text-xl">#</span>
          </button>
          <button className="flex-shrink-0 p-2 rounded-md bg-gray-800/50 hover:bg-gray-700/50 transition-colors">
            <span className="text-xl">🏳️</span>
          </button>
        </div>
        
        <div className="relative mb-3">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search emoji"
            className="w-full px-10 py-2 rounded-md bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-memcyan transition-all duration-300 placeholder-gray-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        <div className="mb-2">
          <h3 className="text-sm font-medium text-gray-400 mb-2">
            {searchTerm ? 'Search Results' : activeCategory}
          </h3>
          
          <div className="grid grid-cols-8 gap-2">
            <AnimatePresence>
              {filteredEmojis.map((emoji, index) => (
                <motion.button
                  key={`${emoji}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2, delay: index * 0.01 }}
                  className={`flex items-center justify-center p-2 text-2xl rounded-md hover:bg-gray-700/50 transition-colors ${selectedEmoji === emoji ? 'bg-memcyan/20 ring-1 ring-memcyan' : ''}`}
                  onClick={() => onEmojiSelect(emoji)}
                >
                  {emoji}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-400 border-t border-gray-700 pt-2">
          <div>🙂 :grinning:</div>
          <div className="flex items-center">
            Skin tone
            <div className="w-5 h-5 bg-yellow-400 rounded ml-2"></div>
          </div>
        </div>
      </motion.div>
      
      {selectedEmoji && (
        <motion.div 
          className="mt-6 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="border border-gray-700 rounded-md p-3 bg-black/50">
            <span className="text-4xl">{selectedEmoji}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EmojiSelector;

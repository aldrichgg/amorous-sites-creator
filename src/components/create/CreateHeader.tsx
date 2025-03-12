
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const CreateHeader = () => {
  return (
    <div className="flex items-center justify-center mb-8">
      <motion.div 
        className="bg-gradient-to-r from-memblue to-memcyan p-0.5 rounded-full"
        animate={{ 
          boxShadow: ['0 0 5px rgba(59, 130, 246, 0.5)', '0 0 20px rgba(59, 130, 246, 0.8)', '0 0 5px rgba(59, 130, 246, 0.5)'],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="bg-black rounded-full p-2">
          <div className="flex items-center space-x-2 px-4 py-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-memblue to-memcyan flex items-center justify-center">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold">Loveiit</h1>
              <div className="flex items-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 mr-1"></div>
                <span className="text-xs text-green-400">Criar memória</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateHeader;

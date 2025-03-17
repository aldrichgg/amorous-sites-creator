
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EmojiRainProps {
  emoji: string;
}

interface EmojiDrop {
  id: number;
  x: number;
  delay: number;
  duration: number;
  rotation: number;
  scale: number;
}

const EmojiRain: React.FC<EmojiRainProps> = ({ emoji }) => {
  const [drops, setDrops] = useState<EmojiDrop[]>([]);
  
  useEffect(() => {
    // Create initial set of drops
    createDrops();
    
    // Create new drops more frequently
    const interval = setInterval(() => {
      createAdditionalDrop();
    }, 400);
    
    return () => clearInterval(interval);
  }, [emoji]);
  
  const createDrops = () => {
    const initialDrops: EmojiDrop[] = [];
    const count = Math.floor(Math.random() * 5) + 8; // 8-12 drops initially
    
    for (let i = 0; i < count; i++) {
      initialDrops.push(createDrop(i));
    }
    
    setDrops(initialDrops);
  };
  
  const createAdditionalDrop = () => {
    setDrops(prevDrops => {
      // Add new drops
      const newDropCount = Math.floor(Math.random() * 2) + 1; // Add 1-2 new drops at a time
      const newDrops = [];
      
      for (let i = 0; i < newDropCount; i++) {
        newDrops.push(createDrop(Date.now() + i));
      }
      
      // Keep the array at a reasonable size by removing old drops
      const updatedDrops = [...prevDrops, ...newDrops];
      if (updatedDrops.length > 30) {
        return updatedDrops.slice(-30);
      }
      return updatedDrops;
    });
  };
  
  const createDrop = (id: number): EmojiDrop => {
    return {
      id,
      x: Math.random() * 100, // random horizontal position (%)
      delay: Math.random() * 0.3,
      duration: Math.random() * 3 + 3, // 3-6 seconds
      rotation: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.5, // 0.5-1
    };
  };
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-10 h-full">
      <AnimatePresence>
        {drops.map((drop) => (
          <motion.div
            key={drop.id}
            className="absolute top-0 text-xl sm:text-2xl"
            style={{
              left: `${drop.x}%`,
            }}
            initial={{ 
              y: -50,
              opacity: 0.7,
              rotate: drop.rotation,
              scale: drop.scale,
            }}
            animate={{ 
              y: '100vh', 
              opacity: 0.7,
              rotate: drop.rotation + 360,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: drop.duration,
              delay: drop.delay,
              ease: 'linear',
              repeat: 0
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default EmojiRain;

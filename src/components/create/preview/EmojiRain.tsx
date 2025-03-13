
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
    
    // Create new drops periodically
    const interval = setInterval(() => {
      createAdditionalDrop();
    }, 800);
    
    return () => clearInterval(interval);
  }, [emoji]);
  
  const createDrops = () => {
    const initialDrops: EmojiDrop[] = [];
    const count = Math.floor(Math.random() * 3) + 5; // 5-7 drops initially
    
    for (let i = 0; i < count; i++) {
      initialDrops.push(createDrop(i));
    }
    
    setDrops(initialDrops);
  };
  
  const createAdditionalDrop = () => {
    setDrops(prevDrops => {
      // Add one new drop
      const newDrop = createDrop(Date.now());
      
      // Keep the array at a reasonable size by removing old drops
      const updatedDrops = [...prevDrops, newDrop];
      if (updatedDrops.length > 20) {
        return updatedDrops.slice(-20);
      }
      return updatedDrops;
    });
  };
  
  const createDrop = (id: number): EmojiDrop => {
    return {
      id,
      x: Math.random() * 100, // random horizontal position (%)
      delay: Math.random() * 0.5,
      duration: Math.random() * 3 + 4, // 4-7 seconds
      rotation: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.5, // 0.5-1
    };
  };
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-10 h-full min-h-screen">
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
              y: '200vh', // Increased from 120vh to 200vh to ensure it goes all the way to the bottom
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

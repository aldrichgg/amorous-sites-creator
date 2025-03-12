
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  blinking: boolean;
}

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  length: number;
  speed: number;
  delay: number;
}

interface StarBackgroundProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  color?: 'blue' | 'purple' | 'cyan' | 'mixed';
}

const StarBackground: React.FC<StarBackgroundProps> = ({ 
  className = "", 
  intensity = 'medium',
  color = 'blue'
}) => {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  
  // Define color based on the prop
  const getStarColor = () => {
    switch(color) {
      case 'purple': return 'from-purple-500/10 via-purple-500/5 to-transparent';
      case 'cyan': return 'from-cyan-500/10 via-cyan-500/5 to-transparent';
      case 'mixed': return 'from-indigo-500/10 via-cyan-500/5 to-transparent';
      default: return 'from-memblue/10 via-memblue/5 to-transparent';
    }
  };
  
  const getShootingStarColor = () => {
    switch(color) {
      case 'purple': return 'from-transparent via-purple-400 to-white';
      case 'cyan': return 'from-transparent via-cyan-400 to-white';
      case 'mixed': return 'from-transparent via-indigo-400 to-white';
      default: return 'from-transparent via-memcyan to-white';
    }
  };
  
  useEffect(() => {
    if (!containerRef.current) return;
    setMounted(true);
    
    const width = containerRef.current.offsetWidth;
    const height = containerRef.current.offsetHeight;
    
    // Generate static stars - adjust density based on intensity
    const densityMap = {
      low: 6000,
      medium: 3000,
      high: 1500
    };
    
    const numberOfStars = Math.floor(width * height / densityMap[intensity]); 
    const newStars: Star[] = [];
    
    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.7 + 0.3,
        blinking: Math.random() > 0.6,
      });
    }
    
    setStars(newStars);
    
    // Generate shooting stars - adjust number based on intensity
    const shootingStarsCount = {
      low: 2,
      medium: 5,
      high: 8
    };
    
    const newShootingStars: ShootingStar[] = [];
    for (let i = 0; i < shootingStarsCount[intensity]; i++) {
      newShootingStars.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * (height / 3), // Start from top third of screen
        length: Math.random() * 100 + 50,
        speed: Math.random() * 2 + 1,
        delay: Math.random() * 15,
      });
    }
    
    setShootingStars(newShootingStars);
    
    // Regenerate shooting stars periodically
    const interval = setInterval(() => {
      setShootingStars(prevStars => {
        return prevStars.map(star => ({
          ...star,
          x: Math.random() * width,
          y: Math.random() * (height / 3),
          length: Math.random() * 100 + 50,
          delay: Math.random() * 15,
        }));
      });
    }, 20000);
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.offsetWidth;
      const newHeight = containerRef.current.offsetHeight;
      
      setStars(prevStars => 
        prevStars.map(star => ({
          ...star,
          x: Math.random() * newWidth,
          y: Math.random() * newHeight,
        }))
      );
      
      setShootingStars(prevStars => 
        prevStars.map(star => ({
          ...star,
          x: Math.random() * newWidth,
          y: Math.random() * (newHeight / 3),
        }))
      );
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [intensity]);
  
  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 overflow-hidden bg-gradient-to-b from-black via-transparent to-black ${className}`}
    >
      <AnimatePresence>
        {mounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            {/* Static stars */}
            {stars.map(star => (
              <motion.div
                key={star.id}
                className="absolute rounded-full bg-white"
                style={{
                  left: star.x,
                  top: star.y,
                  width: star.size,
                  height: star.size,
                  opacity: star.opacity,
                }}
                animate={star.blinking ? {
                  opacity: [star.opacity, star.opacity * 0.3, star.opacity],
                } : {}}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
            
            {/* Shooting stars */}
            {shootingStars.map(star => (
              <motion.div
                key={`shooting-${star.id}`}
                className={`absolute h-px bg-gradient-to-r ${getShootingStarColor()}`}
                style={{
                  left: star.x,
                  top: star.y,
                  width: star.length,
                  transform: 'rotate(45deg)',
                  transformOrigin: 'left center',
                  boxShadow: '0 0 4px #fff, 0 0 10px #fff, 0 0 15px rgba(6, 182, 212, 0.7)',
                }}
                initial={{ x: -star.length, opacity: 0 }}
                animate={{
                  x: [
                    -star.length, 
                    containerRef.current?.offsetWidth || 1000
                  ],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 20 / star.speed,
                  delay: star.delay,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 20 + 15,
                  times: [0, 0.1, 1],
                  ease: "linear",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StarBackground;

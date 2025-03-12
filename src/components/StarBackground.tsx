
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

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

const StarBackground: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const width = containerRef.current.offsetWidth;
    const height = containerRef.current.offsetHeight;
    
    // Generate static stars
    const numberOfStars = Math.floor(width * height / 2000); // Adjust density as needed
    const newStars: Star[] = [];
    
    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.7 + 0.3,
        blinking: Math.random() > 0.7,
      });
    }
    
    setStars(newStars);
    
    // Generate shooting stars
    const newShootingStars: ShootingStar[] = [];
    for (let i = 0; i < 5; i++) {
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
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden bg-gradient-to-b from-black via-memblue/5 to-black"
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
          className="absolute h-px bg-gradient-to-r from-transparent via-memcyan to-white"
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
    </div>
  );
};

export default StarBackground;

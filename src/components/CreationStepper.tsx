
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

const CreationStepper: React.FC<StepperProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full flex justify-center my-4">
      <div className="flex items-center space-x-1">
        {Array.from({ length: totalSteps }).map((_, idx) => {
          const isCompleted = idx < currentStep;
          const isActive = idx === currentStep;
          
          return (
            <React.Fragment key={idx}>
              <motion.div 
                className={`relative w-8 h-8 rounded-full flex items-center justify-center ${
                  isCompleted ? 'bg-green-500' : isActive ? 'bg-memblue' : 'bg-gray-700'
                }`}
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ 
                  scale: isActive ? 1.1 : 1, 
                  opacity: isActive || isCompleted ? 1 : 0.7,
                  backgroundColor: isCompleted ? '#22c55e' : isActive ? '#3b82f6' : '#374151'
                }}
                transition={{ duration: 0.3 }}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <span className="text-white text-sm">{idx + 1}</span>
                )}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-memblue"
                    initial={{ opacity: 0.2 }}
                    animate={{ 
                      scale: [1, 1.2, 1], 
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ zIndex: -1 }}
                  />
                )}
              </motion.div>
              
              {idx < totalSteps - 1 && (
                <motion.div 
                  className={`h-0.5 w-5 ${isCompleted ? 'bg-green-500' : 'bg-gray-700'}`}
                  animate={{ backgroundColor: isCompleted ? '#22c55e' : '#374151' }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default CreationStepper;

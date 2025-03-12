
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

const CreationStepper: React.FC<StepperProps> = ({ currentStep, totalSteps }) => {
  // For mobile, we'll show only 5 steps at a time centered around the current step
  const getMobileVisibleSteps = () => {
    const steps = [];
    const halfVisible = 2; // Show 2 steps before and after current step (total 5)
    
    for (let i = 0; i < totalSteps; i++) {
      // Show steps around the current step or the first/last steps
      if (i === 0 || i === totalSteps - 1 || 
         (i >= currentStep - halfVisible && i <= currentStep + halfVisible)) {
        steps.push(i);
      } else if (i === currentStep - halfVisible - 1 || i === currentStep + halfVisible + 1) {
        // Add ellipsis indicators
        steps.push(-1);
      }
    }
    
    // Remove duplicates and ensure unique values
    return Array.from(new Set(steps));
  };
  
  const mobileSteps = getMobileVisibleSteps();
  
  return (
    <div className="w-full flex justify-center my-4">
      {/* Desktop version - show all steps */}
      <div className="hidden sm:flex items-center space-x-1">
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
      
      {/* Mobile version - show limited steps */}
      <div className="flex sm:hidden items-center space-x-1">
        {mobileSteps.map((stepIndex, idx) => {
          if (stepIndex === -1) {
            // Render ellipsis for skipped steps
            return (
              <div key={`ellipsis-${idx}`} className="flex items-center">
                <div className="h-0.5 w-3 bg-gray-700"></div>
                <div className="text-gray-500 text-xs mx-1">...</div>
                <div className="h-0.5 w-3 bg-gray-700"></div>
              </div>
            );
          }
          
          const isCompleted = stepIndex < currentStep;
          const isActive = stepIndex === currentStep;
          
          return (
            <React.Fragment key={`mobile-${stepIndex}`}>
              {idx > 0 && stepIndex !== -1 && mobileSteps[idx-1] !== -1 && (
                <motion.div 
                  className={`h-0.5 w-3 ${
                    isCompleted || mobileSteps[idx-1] < currentStep ? 'bg-green-500' : 'bg-gray-700'
                  }`}
                />
              )}
              
              <motion.div 
                className={`relative w-6 h-6 rounded-full flex items-center justify-center ${
                  isCompleted ? 'bg-green-500' : isActive ? 'bg-memblue' : 'bg-gray-700'
                }`}
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ 
                  scale: isActive ? 1.1 : 1, 
                  opacity: isActive || isCompleted ? 1 : 0.7,
                }}
                transition={{ duration: 0.3 }}
              >
                {isCompleted ? (
                  <Check className="w-3 h-3 text-white" />
                ) : (
                  <span className="text-white text-xs">{stepIndex + 1}</span>
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
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default CreationStepper;

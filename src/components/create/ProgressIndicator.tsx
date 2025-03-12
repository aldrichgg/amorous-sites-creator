
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Step {
  complete: boolean;
  current: boolean;
}

interface ProgressIndicatorProps {
  steps: Step[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ steps }) => {
  return (
    <div className="w-full flex justify-center my-4">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <motion.div
              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                step.complete 
                  ? 'bg-green-500' 
                  : step.current 
                  ? 'bg-memcyan' 
                  : 'bg-gray-700'
              }`}
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: step.current ? 1.2 : 1,
                backgroundColor: step.complete ? '#22c55e' : step.current ? '#06b6d4' : '#374151'
              }}
              transition={{ duration: 0.3 }}
            >
              {step.complete && <Check className="w-3 h-3 text-white" />}
            </motion.div>
            
            {index < steps.length - 1 && (
              <motion.div 
                className={`h-px w-6 ${step.complete ? 'bg-green-500' : 'bg-gray-700'}`}
                animate={{ backgroundColor: step.complete ? '#22c55e' : '#374151' }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;

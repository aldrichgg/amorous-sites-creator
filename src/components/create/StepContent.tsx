
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavigationButtons from './NavigationButtons';

interface StepContentProps {
  currentStep: number;
  children: React.ReactNode;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isStepValid: boolean;
  memoryData?: any; // Add this to pass memory data
}

const StepContent: React.FC<StepContentProps> = ({
  currentStep,
  children,
  onNext,
  onPrevious,
  isFirstStep,
  isLastStep,
  isStepValid,
  memoryData
}) => {
  return (
    <div className="max-w-4xl mx-auto glass-card rounded-xl p-4 sm:p-6 mb-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      
      <NavigationButtons 
        onPrevious={onPrevious}
        onNext={onNext}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        isDisabled={!isStepValid}
        memoryData={memoryData}
      />
    </div>
  );
};

export default StepContent;

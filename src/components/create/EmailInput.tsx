
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

interface EmailInputProps {
  email: string;
  onEmailChange: (email: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({
  email,
  onEmailChange
}) => {
  const [inputValue, setInputValue] = useState(email);
  const [isValid, setIsValid] = useState(true);
  
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value) {
      setIsValid(validateEmail(value));
    } else {
      setIsValid(true); // Empty is considered valid (for UI purposes)
    }
  };
  
  const handleBlur = () => {
    if (inputValue && validateEmail(inputValue)) {
      onEmailChange(inputValue);
    }
  };
  
  return (
    <div className="w-full max-w-lg mx-auto pb-6">
      <motion.h2 
        className="text-3xl font-bold mb-4 text-center text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Digite seu e-mail:
      </motion.h2>
      
      <motion.p 
        className="text-gray-300 mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Você deve repetir esse e-mail no pagamento
      </motion.p>
      
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <input
          type="email"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="seu-email@exemplo.com"
          className={`w-full px-10 py-3 rounded-lg bg-black/60 border ${
            isValid ? 'border-memblue/30' : 'border-red-500'
          } text-white focus:outline-none focus:ring-2 ${
            isValid ? 'focus:ring-memcyan' : 'focus:ring-red-500'
          } transition-all duration-300 placeholder-gray-500`}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Mail className={`h-5 w-5 ${isValid ? 'text-memcyan' : 'text-red-500'}`} />
        </div>
        
        {!isValid && (
          <motion.p
            className="text-red-500 text-sm mt-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Por favor, insira um e-mail válido
          </motion.p>
        )}
      </motion.div>
      
      <div className="mt-6 space-y-2">
        <motion.button
          className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          PIX ou Cartão (Apenas Brasil)
        </motion.button>
        
        <motion.button
          className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Cartão de crédito
        </motion.button>
      </div>
    </div>
  );
};

export default EmailInput;

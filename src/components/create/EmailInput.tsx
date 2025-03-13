
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

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
        className="text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
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
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className={`h-5 w-5 ${isValid ? 'text-memcyan group-hover:text-memcyan/80' : 'text-red-500'} transition-colors`} />
          </div>
          
          <Input
            type="email"
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="seu-email@exemplo.com"
            className={`w-full pl-12 bg-black/60 backdrop-blur-sm border ${
              isValid ? 'border-white/20 focus:border-memcyan/50' : 'border-red-500'
            } text-white transition-all duration-300 placeholder-gray-500 shadow-lg shadow-black/30`}
          />
        </div>
        
        {!isValid && (
          <motion.p
            className="text-red-500 text-sm mt-2 flex items-center pl-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            Por favor, insira um e-mail válido
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default EmailInput;


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, Music, Image, Smile } from 'lucide-react';
import { motion } from 'framer-motion';
import StarBackground from './StarBackground';

interface PlanProps {
  title: string;
  price: number;
  features: { text: string; included: boolean; icon?: React.ReactNode }[];
  isPopular?: boolean;
  type: 'completo' | 'basico';
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const PlanCard = ({
  title,
  price,
  features,
  isPopular = false,
  type,
  activeTab,
  onTabChange
}: PlanProps) => {
  const isActive = activeTab === type;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${isActive ? 'transform scale-105 shadow-xl' : 'opacity-80'}`}
    >
      <div className="flex">
        <button 
          className={`w-1/2 py-2 sm:py-3 text-center font-medium transition-colors duration-300 text-sm sm:text-base ${
            activeTab === 'completo' ? 'bg-memred text-white' : 'bg-gray-800 text-gray-300'
          } hover:bg-opacity-90`}
          onClick={() => onTabChange('completo')}
        >
          Completo
        </button>
        <button 
          className={`w-1/2 py-2 sm:py-3 text-center font-medium transition-colors duration-300 text-sm sm:text-base ${
            activeTab === 'basico' ? 'bg-memred text-white' : 'bg-gray-800 text-gray-300'
          } hover:bg-opacity-90`}
          onClick={() => onTabChange('basico')}
        >
          Básico
        </button>
      </div>
      
      <div className="p-4 sm:p-6">
        {isPopular && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-memred/20 text-memred text-xs font-semibold px-3 py-1 rounded-full w-fit mx-auto mb-3"
          >
            MAIS POPULAR
          </motion.div>
        )}
        
        <div className="text-center">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-1"
          >
            R${price.toFixed(2).replace('.', ',')}
          </motion.div>
          <div className="text-gray-400 text-xs sm:text-sm mb-4">Pagamento Único</div>
          <div className="h-px bg-gray-700 w-full my-4 sm:my-6"></div>
        </div>
        
        <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          {features.map((feature, index) => (
            <motion.li 
              key={index} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              className="flex items-center text-gray-300 group text-sm sm:text-base"
            >
              {feature.included ? (
                <Check size={16} className="text-memred mr-2 group-hover:scale-110 transition-transform duration-200 flex-shrink-0" />
              ) : (
                <X size={16} className="text-red-500 mr-2 group-hover:scale-110 transition-transform duration-200 flex-shrink-0" />
              )}
              <span className="group-hover:text-white transition-colors duration-200 flex items-center">
                {feature.icon && <span className="mr-1">{feature.icon}</span>}
                {feature.text}
              </span>
            </motion.li>
          ))}
        </ul>
        
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-memred to-memred-light rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
          <Link
            to="/create"
            className="relative block w-full text-center bg-gradient-to-r from-memred to-memred-light hover:from-memred-dark hover:to-memred text-white font-medium rounded-full py-2.5 sm:py-3 px-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
          >
            Começar agora
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const PricingPlans = () => {
  const [activeTab, setActiveTab] = useState('completo');
  
  const plans = {
    completo: {
      title: 'Completo',
      price: 27,
      features: [
        { text: '7 fotos', included: true, icon: <Image size={14} className="text-memred" /> },
        { text: 'Para sempre', included: true },
        { text: 'Selecionar chuva de emoji', included: true, icon: <Smile size={14} className="text-memred" /> },
        { text: 'Selecionar música', included: true, icon: <Music size={14} className="text-memred" /> },
        { text: 'Contador regressivo', included: true },
        { text: 'Mensagem personalizada', included: true },
        { text: 'Suporte prioritário', included: true }
      ],
      isPopular: true
    },
    basico: {
      title: 'Básico',
      price: 17,
      features: [
        { text: '3 fotos', included: true, icon: <Image size={14} className="text-gray-400" /> },
        { text: 'Duração de um ano', included: true },
        { text: 'Selecionar chuva de emoji', included: false, icon: <Smile size={14} className="text-gray-400" /> },
        { text: 'Selecionar música', included: false, icon: <Music size={14} className="text-gray-400" /> },
        { text: 'Contador regressivo', included: true },
        { text: 'Mensagem básica', included: true },
        { text: 'Suporte por email', included: true }
      ],
      isPopular: false
    }
  };
  
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 relative overflow-hidden">
      <StarBackground />
      
      <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Nossos <span className="text-gradient">Planos</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto px-2">
            Escolha o plano ideal para eternizar suas memórias
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-xs sm:max-w-sm md:max-w-md mx-auto"
        >
          <PlanCard 
            title={plans[activeTab as keyof typeof plans].title} 
            price={plans[activeTab as keyof typeof plans].price} 
            features={plans[activeTab as keyof typeof plans].features} 
            isPopular={plans[activeTab as keyof typeof plans].isPopular} 
            type={activeTab as 'completo' | 'basico'} 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
        </motion.div>
      </div>
    </section>
  );
};

export default PricingPlans;

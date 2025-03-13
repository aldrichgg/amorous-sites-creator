
import { Check, X, Music, Image, Smile } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface PricingCardProps {
  title: string;
  price: number;
  features: { text: string; included: boolean; icon?: React.ReactNode }[];
  isPopular?: boolean;
  handleTabChange: (tab: string) => void;
  activeTab: string;
}

const PricingCard: React.FC<PricingCardProps> = ({ 
  title, 
  price, 
  features, 
  isPopular = false,
  handleTabChange,
  activeTab
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-memblue/20">
        <div className="flex">
          <button
            className={`w-1/2 py-3 text-center font-medium transition-colors duration-300 ${
              activeTab === 'completo' ? 'bg-memblue text-white' : 'bg-gray-800 text-gray-300'
            } hover:bg-opacity-90`}
            onClick={() => handleTabChange('completo')}
          >
            Completo
          </button>
          <button
            className={`w-1/2 py-3 text-center font-medium transition-colors duration-300 ${
              activeTab === 'basico' ? 'bg-memblue text-white' : 'bg-gray-800 text-gray-300'
            } hover:bg-opacity-90`}
            onClick={() => handleTabChange('basico')}
          >
            Básico
          </button>
        </div>
        
        <div className="p-6">
          {isPopular && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-memblue/20 text-memcyan text-xs font-semibold px-3 py-1 rounded-full w-fit mx-auto mb-3"
            >
              MAIS POPULAR
            </motion.div>
          )}
          
          <div className="text-center">
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-bold text-white mb-1"
            >
              R${price.toFixed(2).replace('.', ',')}
            </motion.div>
            <div className="text-gray-400 text-sm mb-4">Pagamento Único</div>
            <div className="h-px bg-gray-700 w-full my-6"></div>
          </div>
          
          <ul className="space-y-3 mb-6">
            {features.map((feature, index) => (
              <motion.li 
                key={index} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
                className="flex items-center text-gray-300 group"
              >
                {feature.included ? (
                  <Check size={18} className="text-memcyan mr-2 group-hover:scale-110 transition-transform duration-200 flex-shrink-0" />
                ) : (
                  <X size={18} className="text-red-500 mr-2 group-hover:scale-110 transition-transform duration-200 flex-shrink-0" />
                )}
                <span className="group-hover:text-white transition-colors duration-200 flex items-center">
                  {feature.icon && <span className="mr-1">{feature.icon}</span>}
                  {feature.text}
                </span>
              </motion.li>
            ))}
          </ul>
          
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-memblue to-memcyan rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
            <Link
              to="/create"
              className="relative block w-full text-center btn-gradient text-white font-medium rounded-full py-3 px-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              Criar site
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PricingTabs = () => {
  const [activeTab, setActiveTab] = useState('completo');
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  const plans = {
    completo: {
      title: 'Completo',
      price: 27,
      features: [
        { text: '7 fotos', included: true, icon: <Image size={16} className="text-memcyan" /> },
        { text: 'Para sempre', included: true },
        { text: 'Selecionar chuva de emoji', included: true, icon: <Smile size={16} className="text-memcyan" /> },
        { text: 'Selecionar música', included: true, icon: <Music size={16} className="text-memcyan" /> },
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
        { text: '3 fotos', included: true, icon: <Image size={16} className="text-gray-400" /> },
        { text: 'Duração de um ano', included: true },
        { text: 'Selecionar chuva de emoji', included: false, icon: <Smile size={16} className="text-gray-400" /> },
        { text: 'Selecionar música', included: false, icon: <Music size={16} className="text-gray-400" /> },
        { text: 'Contador regressivo', included: true },
        { text: 'Mensagem básica', included: true },
        { text: 'Suporte por email', included: true }
      ],
      isPopular: false
    }
  };
  
  return (
    <PricingCard
      title={plans[activeTab as keyof typeof plans].title}
      price={plans[activeTab as keyof typeof plans].price}
      features={plans[activeTab as keyof typeof plans].features}
      isPopular={activeTab === 'completo'}
      handleTabChange={handleTabChange}
      activeTab={activeTab}
    />
  );
};

export default PricingTabs;

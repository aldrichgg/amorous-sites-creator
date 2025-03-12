
import { Check } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface PricingCardProps {
  title: string;
  price: number;
  features: string[];
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
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
        <div className="flex">
          <button
            className={`w-1/2 py-3 text-center font-medium transition-colors duration-300 ${
              activeTab === 'completo' ? 'bg-memblue text-white' : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => handleTabChange('completo')}
          >
            Completo
          </button>
          <button
            className={`w-1/2 py-3 text-center font-medium transition-colors duration-300 ${
              activeTab === 'basico' ? 'bg-memblue text-white' : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => handleTabChange('basico')}
          >
            Básico
          </button>
        </div>
        
        <div className="p-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              R${price.toFixed(2).replace('.', ',')}
            </div>
            <div className="h-px bg-gray-200 dark:bg-gray-700 w-full my-6"></div>
          </div>
          
          <ul className="space-y-3 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                <Check size={18} className="text-memblue mr-2" />
                {feature}
              </li>
            ))}
          </ul>
          
          <Link
            to="/create"
            className="w-full block text-center btn-gradient text-white font-medium rounded-full py-3 px-4 transition-all duration-300 hover:shadow-lg"
          >
            Criar site
          </Link>
        </div>
      </div>
    </div>
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
        '7 fotos',
        'Para sempre',
        'Selecionar chuva de emoji',
        'Selecionar música'
      ]
    },
    basico: {
      title: 'Básico',
      price: 17,
      features: [
        '3 fotos',
        'Duração de um ano',
        'Selecionar chuva de emoji',
        'Selecionar música'
      ]
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

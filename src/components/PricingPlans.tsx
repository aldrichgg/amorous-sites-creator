
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';

interface PlanProps {
  title: string;
  price: number;
  features: { text: string; included: boolean }[];
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
  return <div className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${isActive ? 'transform scale-105 shadow-xl' : 'opacity-80'}`}>
      <div className="flex">
        <button className={`w-1/2 py-3 text-center font-medium transition-colors duration-300 ${activeTab === 'completo' ? 'bg-memblue text-white' : 'bg-gray-800 text-gray-300'}`} onClick={() => onTabChange('completo')}>
          Completo
        </button>
        <button className={`w-1/2 py-3 text-center font-medium transition-colors duration-300 ${activeTab === 'basico' ? 'bg-memblue text-white' : 'bg-gray-800 text-gray-300'}`} onClick={() => onTabChange('basico')}>
          Básico
        </button>
      </div>
      
      <div className="p-6">
        {isPopular && <div className="bg-memblue/20 text-memcyan text-xs font-semibold px-3 py-1 rounded-full w-fit mx-auto mb-3">
            MAIS POPULAR
          </div>}
        
        <div className="text-center">
          <div className="text-5xl font-bold text-white mb-1">
            R${price.toFixed(2).replace('.', ',')}
          </div>
          <div className="text-gray-400 text-sm mb-4">Pagamento Único</div>
          <div className="h-px bg-gray-700 w-full my-6"></div>
        </div>
        
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => <li key={index} className="flex items-center text-gray-300">
              {feature.included ? 
                <Check size={18} className="text-memcyan mr-2 shrink-0" /> : 
                <X size={18} className="text-red-500 mr-2 shrink-0" />
              }
              {feature.text}
            </li>)}
        </ul>
        
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-memblue to-memcyan rounded-full blur opacity-75"></div>
          <Link to="/create" className="relative block w-full text-center bg-gradient-to-r from-memblue to-memcyan hover:from-memblue-dark hover:to-memcyan-dark text-white font-medium rounded-full py-3 px-4 transition-all duration-300">
            Começar agora
          </Link>
        </div>
      </div>
    </div>;
};

const PricingPlans = () => {
  const [activeTab, setActiveTab] = useState('completo');
  
  const plans = {
    completo: {
      title: 'Completo',
      price: 27,
      features: [
        { text: '7 fotos', included: true },
        { text: 'Para sempre', included: true },
        { text: 'Selecionar chuva de emoji', included: true },
        { text: 'Selecionar música', included: true },
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
        { text: '3 fotos', included: true },
        { text: 'Duração de um ano', included: true },
        { text: 'Selecionar chuva de emoji', included: false },
        { text: 'Selecionar música', included: false },
        { text: 'Mensagem básica', included: true },
        { text: 'Suporte por email', included: true }
      ],
      isPopular: false
    }
  };
  
  return <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-memblue/10 to-black pointer-events-none"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Nossos <span className="text-gradient">Planos</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Escolha o plano ideal para eternizar suas memórias
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <PlanCard 
            title={plans[activeTab as keyof typeof plans].title} 
            price={plans[activeTab as keyof typeof plans].price} 
            features={plans[activeTab as keyof typeof plans].features} 
            isPopular={plans[activeTab as keyof typeof plans].isPopular} 
            type={activeTab as 'completo' | 'basico'} 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
        </div>
      </div>
    </section>;
};

export default PricingPlans;


import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  features: PlanFeature[];
  popular?: boolean;
}

interface PlanSelectionProps {
  selectedPlan: string;
  onSelectPlan: (planId: string) => void;
}

const PlanSelection: React.FC<PlanSelectionProps> = ({ 
  selectedPlan, 
  onSelectPlan 
}) => {
  const plans: Plan[] = [
    {
      id: 'forever',
      name: 'Para sempre',
      price: 54,
      discountedPrice: 27,
      popular: true,
      features: [
        { name: 'Texto dedicado', included: true },
        { name: 'Contador em tempo real', included: true },
        { name: 'QR Code exclusivo', included: true },
        { name: 'Máximo de 7 imagens', included: true },
        { name: 'Com música', included: true },
        { name: 'Chuva de emojis', included: true },
        { name: 'URL personalizada', included: true },
        { name: 'Suporte 24 horas', included: true },
        { name: 'Uma memória', included: true },
      ]
    },
    {
      id: 'annual',
      name: 'Anual',
      price: 45,
      discountedPrice: 22.50,
      features: [
        { name: 'Texto dedicado', included: true },
        { name: 'Contador em tempo real', included: true },
        { name: 'QR Code exclusivo', included: true },
        { name: 'Máximo de 3 imagens', included: false },
        { name: 'A música será removida', included: false },
        { name: 'A chuva de emojis será removida', included: false },
        { name: 'URL personalizada', included: true },
        { name: 'Suporte 24 horas', included: true },
        { name: 'Uma memória', included: true },
      ]
    }
  ];

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-4">
      <motion.h2 
        className="text-3xl font-bold mb-6 text-center text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Plano
      </motion.h2>
      <motion.p 
        className="text-gray-300 mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Escolha o plano ideal para a sua página.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.id}
            custom={idx}
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
              selectedPlan === plan.id 
                ? 'ring-2 ring-memcyan shadow-lg shadow-memcyan/20' 
                : 'ring-1 ring-white/10'
            }`}
            onClick={() => onSelectPlan(plan.id)}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-memcyan text-black text-xs font-semibold px-3 py-1 rounded-bl-md">
                ★ Mais escolhido
              </div>
            )}
            
            <div className="p-6 bg-black/60 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              
              <div className="mb-6">
                {plan.discountedPrice ? (
                  <div className="flex items-baseline">
                    <span className="text-gray-400 line-through text-lg">R${plan.price.toFixed(2)}</span>
                    <span className="text-3xl font-bold text-white ml-2">R${plan.discountedPrice.toFixed(2)}</span>
                    <span className="text-gray-400 text-sm ml-1">/uma vez</span>
                  </div>
                ) : (
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-white">R${plan.price.toFixed(2)}</span>
                    <span className="text-gray-400 text-sm ml-1">/ano</span>
                  </div>
                )}
              </div>
              
              <ul className="space-y-3">
                {plan.features.map((feature, featureIdx) => (
                  <motion.li 
                    key={featureIdx}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + featureIdx * 0.05 }}
                  >
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                    )}
                    <span className={feature.included ? "text-gray-200" : "text-gray-400"}>{feature.name}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            {selectedPlan === plan.id && (
              <motion.div 
                className="absolute inset-0 border-2 border-memcyan rounded-xl pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PlanSelection;

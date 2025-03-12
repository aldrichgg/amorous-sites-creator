
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

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
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { toast } = useToast();
  
  const plans: Plan[] = [
    {
      id: 'forever',
      name: 'Para sempre',
      price: 54.00,
      discountedPrice: 27.00,
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
      price: 34.00,
      discountedPrice: 17.00,
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

  const handleChoosePlan = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSelection = (method: 'pix' | 'card') => {
    toast({
      title: "Método de pagamento selecionado",
      description: `Você escolheu pagar com ${method === 'pix' ? 'PIX' : 'Cartão de crédito'}`,
    });
    setShowPaymentModal(false);
  };

  const closeModal = () => {
    setShowPaymentModal(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-4">
      <motion.h2 
        className="text-3xl font-bold mb-4 text-center text-white"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
              selectedPlan === plan.id 
                ? 'ring-2 ring-memcyan shadow-lg shadow-memcyan/20' 
                : 'ring-1 ring-white/10'
            }`}
            onClick={() => onSelectPlan(plan.id)}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-semibold px-3 py-1 rounded-bl-md flex items-center">
                <Star className="h-3 w-3 mr-1" /> Mais escolhido
              </div>
            )}
            
            <div className="p-6 bg-black/60 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
              
              <ul className="space-y-3 mb-6">
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
              
              <div className="mt-6">
                {plan.discountedPrice ? (
                  <div>
                    <span className="text-red-500 line-through text-lg font-semibold block">R$ {plan.price.toFixed(2).replace('.', ',')}</span>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-white">R$ {plan.discountedPrice.toFixed(2).replace('.', ',')}</span>
                      <span className="text-gray-400 text-sm ml-1">{plan.id === 'forever' ? '/uma vez' : '/por ano'}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-white">R$ {plan.price.toFixed(2).replace('.', ',')}</span>
                    <span className="text-gray-400 text-sm ml-1">{plan.id === 'forever' ? '/uma vez' : '/por ano'}</span>
                  </div>
                )}
              </div>
            </div>
            
            {selectedPlan === plan.id && (
              <div className="absolute inset-0 border-2 border-memcyan rounded-xl pointer-events-none" />
            )}
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 max-w-lg mx-auto">
        <motion.button
          onClick={handleChoosePlan}
          className="w-full bg-gradient-to-r from-memblue to-memcyan text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center hover:opacity-90"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Escolher este plano
        </motion.button>
      </div>
      
      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-black/90 border border-white/10 rounded-xl p-6 max-w-md w-full mx-4"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-white mb-4 text-center">Escolha a forma de pagamento</h3>
              
              <div className="space-y-3 mt-6">
                <motion.button
                  onClick={() => handlePaymentSelection('pix')}
                  className="w-full bg-gradient-to-r from-memblue to-memcyan text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  PIX (Apenas Brasil)
                </motion.button>
                
                <motion.button
                  onClick={() => handlePaymentSelection('card')}
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cartão de crédito
                </motion.button>
              </div>
              
              <button 
                className="mt-4 text-gray-400 hover:text-white text-sm mx-auto block"
                onClick={closeModal}
              >
                Cancelar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlanSelection;

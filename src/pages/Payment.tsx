
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, CreditCard, ArrowRight } from 'lucide-react';
import { toast } from "sonner";

import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import StarBackground from '../components/StarBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  
  // Get memory data from location state
  const memoryData = location.state?.memoryData;
  const memorySlug = location.state?.memorySlug || 'demo-memory';
  
  // If no memory data was passed, redirect to create page
  if (!memoryData) {
    navigate('/create');
    return null;
  }
  
  const handleCompletePurchase = () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast.success("Pagamento aprovado! Redirecionando para sua memória...");
      
      // Simulate delay before redirecting to the memory page
      setTimeout(() => {
        setProcessing(false);
        // Navigate to the memory display page
        navigate(`/memory/${memorySlug}`);
      }, 1500);
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative overflow-hidden">
        <StarBackground intensity="medium" color="mixed" />
        
        <Navbar />
        
        <main className="container mx-auto px-4 py-16 relative z-10 min-h-screen">
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <motion.h1 
                className="text-3xl sm:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Finalizar Compra
              </motion.h1>
              <motion.p 
                className="text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Você está a um passo de criar uma memória eterna!
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
              <div className="lg:col-span-3">
                <Card className="bg-gray-900/70 border-gray-800 text-white">
                  <CardHeader>
                    <CardTitle>Detalhes do Pagamento</CardTitle>
                    <CardDescription className="text-gray-400">
                      Insira suas informações de pagamento
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Simplificado para demonstração - em uma aplicação real, você teria um formulário completo */}
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">Número do Cartão</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="1234 5678 9012 3456" 
                          className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-memcyan"
                        />
                        <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm text-gray-300">Data de Validade</label>
                        <input 
                          type="text" 
                          placeholder="MM/AA" 
                          className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-memcyan"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-300">CVV</label>
                        <input 
                          type="text" 
                          placeholder="123" 
                          className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-memcyan"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">Nome no Cartão</label>
                      <input 
                        type="text" 
                        placeholder="Nome completo" 
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-memcyan"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">E-mail</label>
                      <input 
                        type="email" 
                        placeholder="seu@email.com" 
                        value={memoryData.email || ''}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-memcyan"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-2">
                <Card className="bg-gray-900/70 border-gray-800 text-white">
                  <CardHeader>
                    <CardTitle>Resumo da Compra</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Plano:</span>
                        <span className="font-medium">
                          {memoryData.selectedPlan === 'forever' ? 'Memória Eterna' : 'Memória Anual'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Nome da Página:</span>
                        <span className="font-medium">{memoryData.pageName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fotos:</span>
                        <span className="font-medium">{memoryData.photos.length}</span>
                      </div>
                      <div className="pt-4 border-t border-gray-700">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span className="text-memcyan">
                            {memoryData.selectedPlan === 'forever' ? 'R$ 99,90' : 'R$ 9,90/mês'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={handleCompletePurchase}
                      disabled={processing}
                      className="w-full bg-gradient-to-r from-memblue to-memcyan hover:from-memblue-dark hover:to-memcyan-dark text-white py-6 rounded-lg"
                    >
                      {processing ? (
                        <div className="flex items-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="w-5 h-5 border-t-2 border-white rounded-full mr-2"
                          />
                          Processando...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          Finalizar Pagamento
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </div>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
                
                <div className="mt-4 bg-gray-900/50 rounded-lg p-4 text-sm text-gray-400">
                  <div className="flex items-start mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Pagamento seguro com criptografia SSL</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Após o pagamento, sua memória estará disponível imediatamente</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
        
        <div className="relative z-20 mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Payment;

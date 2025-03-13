
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, CreditCard, ArrowRight, QrCode, Loader2, Shield, Clock, Gift, Heart, Music } from 'lucide-react';
import { toast } from "sonner";

import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import StarBackground from '../components/StarBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix' | null>(null);
  
  const memoryData = location.state?.memoryData;
  const memorySlug = location.state?.memorySlug || 'demo-memory';
  
  if (!memoryData) {
    navigate('/create');
    return null;
  }

  const getPlanPrice = () => {
    if (memoryData.selectedPlan === 'forever') {
      return { regular: 54.00, discounted: 27.00 };
    } else {
      return { regular: 34.00, discounted: 17.00 };
    }
  };
  
  const price = getPlanPrice();
  
  const handleCompletePurchase = () => {
    if (!paymentMethod) {
      toast.error("Por favor, selecione uma forma de pagamento.");
      return;
    }
    
    setProcessing(true);
    
    setTimeout(() => {
      toast.success("Pagamento aprovado! Redirecionando para sua memória...");
      
      setTimeout(() => {
        setProcessing(false);
        navigate(`/memory/${memorySlug}`);
      }, 1500);
    }, 2000);
  };

  const selectPaymentMethod = (method: 'card' | 'pix') => {
    setPaymentMethod(method);
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative overflow-hidden">
        <StarBackground intensity="medium" color="mixed" />
        
        <Navbar />
        
        <main className="container mx-auto px-4 py-16 relative z-10 min-h-screen">
          <motion.div 
            className="max-w-3xl mx-auto pt-16 sm:pt-20"
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
                <Card className="bg-gray-900/70 border-gray-800 text-white mb-6">
                  <CardHeader>
                    <CardTitle>Forma de Pagamento</CardTitle>
                    <CardDescription className="text-gray-400">
                      Escolha como deseja pagar
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <motion.div 
                        className={`relative flex items-center space-x-2 rounded-md border ${paymentMethod === 'card' ? 'border-memcyan bg-gray-800/80' : 'border-gray-700'} p-6 cursor-pointer hover:bg-gray-800/50 transition-colors`}
                        onClick={() => selectPaymentMethod('card')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${paymentMethod === 'card' ? 'bg-memcyan' : 'border border-gray-500'}`}>
                          {paymentMethod === 'card' && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            >
                              <CheckCircle2 className="w-5 h-5 text-black" />
                            </motion.div>
                          )}
                        </div>
                        <Label className="flex items-center cursor-pointer">
                          <CreditCard className="w-5 h-5 mr-2 text-gray-400" />
                          <span>Cartão de Crédito</span>
                        </Label>
                        {paymentMethod === 'card' && (
                          <motion.div
                            className="absolute top-1 right-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <div className="text-xs font-medium text-memcyan">Selecionado</div>
                          </motion.div>
                        )}
                      </motion.div>
                      
                      <motion.div 
                        className={`relative flex items-center space-x-2 rounded-md border ${paymentMethod === 'pix' ? 'border-memcyan bg-gray-800/80' : 'border-gray-700'} p-6 cursor-pointer hover:bg-gray-800/50 transition-colors`}
                        onClick={() => selectPaymentMethod('pix')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${paymentMethod === 'pix' ? 'bg-memcyan' : 'border border-gray-500'}`}>
                          {paymentMethod === 'pix' && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            >
                              <CheckCircle2 className="w-5 h-5 text-black" />
                            </motion.div>
                          )}
                        </div>
                        <Label className="flex items-center cursor-pointer">
                          <QrCode className="w-5 h-5 mr-2 text-gray-400" />
                          <span>PIX (Apenas Brasil)</span>
                        </Label>
                        {paymentMethod === 'pix' && (
                          <motion.div
                            className="absolute top-1 right-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <div className="text-xs font-medium text-memcyan">Selecionado</div>
                          </motion.div>
                        )}
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
                
                <AnimatePresence mode="wait">
                  {paymentMethod === 'card' && (
                    <motion.div
                      key="card-form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="bg-gray-900/70 border-gray-800 text-white">
                        <CardHeader>
                          <CardTitle>Detalhes do Cartão</CardTitle>
                          <CardDescription className="text-gray-400">
                            Insira suas informações de pagamento
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
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
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                  
                  {paymentMethod === 'pix' && (
                    <motion.div
                      key="pix-form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="bg-gray-900/70 border-gray-800 text-white">
                        <CardHeader>
                          <CardTitle>Pagamento via PIX</CardTitle>
                          <CardDescription className="text-gray-400">
                            Escaneie o QR Code ou copie o código PIX
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 flex flex-col items-center">
                          <motion.div 
                            className="w-48 h-48 bg-white p-4 rounded-md flex items-center justify-center"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="w-full h-full border-2 border-black bg-gray-100 rounded flex items-center justify-center">
                              <QrCode className="w-32 h-32 text-black" />
                            </div>
                          </motion.div>
                          <div className="space-y-2 w-full mt-4">
                            <label className="text-sm text-gray-300">Código PIX</label>
                            <div className="relative">
                              <input 
                                type="text" 
                                value="00020126330014BR.GOV.BCB.PIX0111EXAMPLE1234520400005303986540527.005802BR5915MEMORY ETERNAL6009SAO PAULO62150511MEMORY12345"
                                readOnly
                                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-memcyan text-xs"
                              />
                              <button 
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                onClick={() => {
                                  navigator.clipboard.writeText("00020126330014BR.GOV.BCB.PIX0111EXAMPLE1234520400005303986540527.005802BR5915MEMORY ETERNAL6009SAO PAULO62150511MEMORY12345");
                                  toast.success("Código PIX copiado!");
                                }}
                              >
                                Copiar
                              </button>
                            </div>
                          </div>
                          <motion.div 
                            className="text-yellow-400 mt-4 text-sm text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            Após realizar o pagamento, você receberá um e-mail com o link para sua memória.
                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="space-y-2 mt-6">
                  <label className="text-sm text-gray-300">E-mail para receber a confirmação</label>
                  <input 
                    type="email" 
                    placeholder="seu@email.com" 
                    defaultValue={memoryData.email || ''}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-memcyan"
                  />
                </div>
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
                      <div className="flex justify-between">
                        <span>Música:</span>
                        {memoryData.spotifyUrl ? (
                          <span className="font-medium flex items-center">
                            <Music className="w-4 h-4 mr-1 text-green-500" />
                            Incluída
                          </span>
                        ) : (
                          <span className="font-medium text-gray-400">Não incluída</span>
                        )}
                      </div>
                      <div className="pt-4 border-t border-gray-700">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total:</span>
                          <div className="text-right">
                            <span className="text-red-500 line-through block text-sm">
                              R$ {price.regular.toFixed(2).replace('.', ',')}
                            </span>
                            <span className="text-memcyan">
                              R$ {price.discounted.toFixed(2).replace('.', ',')}
                              <span className="text-xs text-gray-400 ml-1">
                                {memoryData.selectedPlan === 'forever' ? '(uma vez)' : '(por ano)'}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={handleCompletePurchase}
                      disabled={processing || !paymentMethod}
                      className={`w-full bg-gradient-to-r from-memblue to-memcyan hover:from-memblue-dark hover:to-memcyan-dark text-white py-6 rounded-lg ${
                        !paymentMethod && 'opacity-70 cursor-not-allowed hover:from-memblue hover:to-memcyan'
                      }`}
                    >
                      {processing ? (
                        <div className="flex items-center justify-center">
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processando...
                        </div>
                      ) : (
                        <motion.div 
                          className="flex items-center justify-center"
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Finalizar Pagamento
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </motion.div>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
                
                <div className="mt-4 bg-gray-900/50 rounded-lg p-4 text-sm">
                  <h3 className="font-semibold text-memcyan mb-3">Vantagens da sua compra:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Pagamento seguro com criptografia SSL</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Acesso imediato após o pagamento</span>
                    </div>
                    <div className="flex items-start">
                      <Shield className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Garantia de satisfação ou seu dinheiro de volta em até 7 dias</span>
                    </div>
                    <div className="flex items-start">
                      <Clock className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Suporte técnico 24/7 via e-mail</span>
                    </div>
                    <div className="flex items-start">
                      <Gift className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>QR Code exclusivo para compartilhar sua memória</span>
                    </div>
                    <div className="flex items-start">
                      <Heart className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Atualizações gratuitas de recursos futuros</span>
                    </div>
                  </div>
                </div>
                
                <motion.div 
                  className="mt-4 bg-memcyan/10 border border-memcyan/20 rounded-lg p-4 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-memcyan font-medium">
                    ✨ Compre agora e ganhe acesso exclusivo ao próximo lançamento de recursos premium sem custo adicional!
                  </p>
                </motion.div>
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

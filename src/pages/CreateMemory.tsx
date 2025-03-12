
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import StarBackground from '../components/StarBackground';
import PlanSelection from '../components/create/PlanSelection';
import SpotifyInput from '../components/create/SpotifyInput';
import EmojiSelector from '../components/create/EmojiSelector';
import PhotoUploader from '../components/create/PhotoUploader';
import MessageEditor from '../components/create/MessageEditor';
import DatePicker from '../components/create/DatePicker';
import PageTitleInput from '../components/create/PageTitleInput';
import EmailInput from '../components/create/EmailInput';
import NavigationButtons from '../components/create/NavigationButtons';
import CreationStepper from '../components/CreationStepper';
import PromoBar from '../components/PromoBar';

const CreateMemory: React.FC = () => {
  const navigate = useNavigate();
  
  // Estado para controlar a etapa atual
  const [currentStep, setCurrentStep] = useState(0);
  
  // Estados para os dados do formulário
  const [selectedPlan, setSelectedPlan] = useState('forever');
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('😊');
  const [photos, setPhotos] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [pageTitle, setPageTitle] = useState('');
  const [pageName, setPageName] = useState('');
  const [email, setEmail] = useState('');
  
  // Número total de etapas
  const totalSteps = 9;
  
  // Avançar para a próxima etapa
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Finalizar o processo
      console.log('Formulário completo:', {
        selectedPlan,
        spotifyUrl,
        selectedEmoji,
        photos,
        message,
        startDate,
        pageTitle,
        pageName,
        email
      });
      
      // Redirecionar para uma página de confirmação ou pagamento
      // navigate('/payment');
    }
  };
  
  // Voltar para a etapa anterior
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Componentes para cada etapa - Reordenados para colocar a seleção de plano por último
  const steps = [
    <PageTitleInput 
      title={pageTitle} 
      onTitleChange={setPageTitle} 
      label="Título da página" 
      description="Escreva o título da página. Ex: Te amo há: ou Nossas memórias ou etc!" 
      placeholder="Digite o título da página" 
    />,
    <PageTitleInput 
      title={pageName} 
      onTitleChange={setPageName} 
      label="Nome da página" 
      description="Escreva o nome da página (Usado no link para acessar). Ex: Gabriel & Clara ou Feliz Aniversário ou etc!" 
      placeholder="Escreva o nome da página (Usado no link para acessar)" 
    />,
    <EmailInput 
      email={email} 
      onEmailChange={setEmail} 
    />,
    <DatePicker 
      selectedDate={startDate} 
      onDateChange={setStartDate} 
    />,
    <MessageEditor 
      message={message} 
      onMessageChange={setMessage} 
    />,
    <SpotifyInput 
      spotifyUrl={spotifyUrl} 
      onSpotifyUrlChange={setSpotifyUrl} 
    />,
    <EmojiSelector 
      selectedEmoji={selectedEmoji} 
      onEmojiSelect={setSelectedEmoji} 
    />,
    <PhotoUploader 
      maxPhotos={selectedPlan === 'forever' ? 7 : 3} 
      photos={photos} 
      onPhotosChange={setPhotos} 
    />,
    <PlanSelection 
      selectedPlan={selectedPlan} 
      onSelectPlan={setSelectedPlan} 
    />
  ];
  
  // Efeito para rolar para o topo quando o componente é montado
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <StarBackground intensity="medium" color="mixed" />
      
      <PromoBar />
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 relative z-10 pt-40">
        <div className="flex items-center justify-center mb-8">
          <motion.div 
            className="bg-gradient-to-r from-memblue to-memcyan p-0.5 rounded-full"
            animate={{ 
              boxShadow: ['0 0 5px rgba(59, 130, 246, 0.5)', '0 0 20px rgba(59, 130, 246, 0.8)', '0 0 5px rgba(59, 130, 246, 0.5)'],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="bg-black rounded-full p-2">
              <div className="flex items-center space-x-2 px-4 py-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-memblue to-memcyan flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Loveiit</h1>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                    <span className="text-xs text-green-400">Criar memória</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <CreationStepper currentStep={currentStep} totalSteps={totalSteps} />
        
        <div className="max-w-4xl mx-auto glass-card rounded-xl p-6 mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {steps[currentStep]}
            </motion.div>
          </AnimatePresence>
          
          <NavigationButtons 
            onPrevious={handlePrevious}
            onNext={handleNext}
            isFirstStep={currentStep === 0}
            isLastStep={currentStep === totalSteps - 1}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateMemory;

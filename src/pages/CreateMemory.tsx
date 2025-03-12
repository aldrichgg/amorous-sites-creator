
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
import MemoryPreview from '../components/create/MemoryPreview';

const CreateMemory: React.FC = () => {
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(0);
  
  const [selectedPlan, setSelectedPlan] = useState('forever');
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('😊');
  const [photos, setPhotos] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [pageTitle, setPageTitle] = useState('');
  const [pageName, setPageName] = useState('');
  const [email, setEmail] = useState('');
  
  const totalSteps = 9;
  
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
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
      
      navigate('/payment');
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Check if required fields are filled for each step
  const isStepValid = () => {
    switch (currentStep) {
      case 0: // Page title
        return pageTitle.trim().length > 0;
      case 1: // Page name
        return pageName.trim().length > 0;
      case 2: // Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return email.trim().length > 0 && emailRegex.test(email);
      case 3: // Date
        return !!startDate;
      default:
        return true; // Other steps don't have required fields
    }
  };
  
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
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <StarBackground intensity="medium" color="mixed" />
      
      <PromoBar />
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 relative z-10 pt-32 pb-20">
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
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-memblue to-memcyan flex items-center justify-center">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold">Loveiit</h1>
                  <div className="flex items-center">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 mr-1"></div>
                    <span className="text-xs text-green-400">Criar memória</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <CreationStepper currentStep={currentStep} totalSteps={totalSteps} />
        
        <div className="max-w-4xl mx-auto glass-card rounded-xl p-4 sm:p-6 mb-8">
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
            isDisabled={!isStepValid()}
          />
        </div>
        
        {/* Preview Section */}
        <div className="mt-12 mb-8">
          <motion.h2 
            className="text-2xl font-bold mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Visualização da Página
          </motion.h2>
          
          <motion.div
            className="bg-gradient-to-r from-gray-900 to-black p-0.5 rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-black/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-memblue/10 to-transparent"></div>
                <div className="absolute bottom-0 right-0 text-9xl opacity-5">{selectedEmoji}</div>
              </div>
              
              <MemoryPreview
                pageTitle={pageTitle}
                pageName={pageName}
                startDate={startDate}
                message={message}
                spotifyUrl={spotifyUrl}
                selectedEmoji={selectedEmoji}
                photos={photos}
              />
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateMemory;

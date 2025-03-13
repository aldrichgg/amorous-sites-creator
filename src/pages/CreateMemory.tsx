
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import StarBackground from '../components/StarBackground';
import CreateHeader from '../components/create/CreateHeader';
import StepContent from '../components/create/StepContent';
import PlanSelection from '../components/create/PlanSelection';
import SpotifyInput from '../components/create/SpotifyInput';
import EmojiSelector from '../components/create/EmojiSelector';
import PhotoUploader from '../components/create/PhotoUploader';
import MessageEditor from '../components/create/MessageEditor';
import DatePicker from '../components/create/DatePicker';
import PageTitleInput from '../components/create/PageTitleInput';
import EmailInput from '../components/create/EmailInput';
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
  const [startDate, setStartDate] = useState<Date | null>(null);
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
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white relative">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <StarBackground intensity="medium" color="mixed" />
        </div>
        
        <Navbar />
        
        <main className="container mx-auto px-4 py-8 relative z-10 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CreateHeader />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CreationStepper currentStep={currentStep} totalSteps={steps.length} />
          </motion.div>
          
          <div className="mt-8 grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <StepContent
                  currentStep={currentStep}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  isFirstStep={currentStep === 0}
                  isLastStep={currentStep === steps.length - 1}
                  isStepValid={isStepValid()}
                >
                  {steps[currentStep]}
                </StepContent>
              </motion.div>
            </div>
            
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="sticky top-24"
              >
                <h3 className="text-lg font-semibold mb-4 text-center text-white">Prévia da sua página</h3>
                <MemoryPreview
                  pageTitle={pageTitle}
                  pageName={pageName}
                  startDate={startDate}
                  message={message}
                  spotifyUrl={spotifyUrl}
                  selectedEmoji={selectedEmoji}
                  photos={photos}
                />
              </motion.div>
            </div>
          </div>
        </main>
      </div>
      
      <div className="relative z-20 mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default CreateMemory;

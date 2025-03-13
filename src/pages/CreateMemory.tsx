import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="min-h-screen bg-black text-white relative">
      <div className="relative overflow-hidden">
        <StarBackground intensity="medium" color="mixed" />
        
        <Navbar />
        
        <main className="container mx-auto px-4 py-8 relative z-10 pt-32 pb-20">
          <CreateHeader />
          <CreationStepper currentStep={currentStep} totalSteps={steps.length} />
          
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
          
          <div className="mt-8 sm:mt-12 mb-8">
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
        </main>
      </div>
      
      {/* Footer em seção separada, fora do overflow-hidden */}
      <div className="relative z-20 mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default CreateMemory;

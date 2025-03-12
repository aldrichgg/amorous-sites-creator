
import { FileText, CreditCard, QrCode, Share2 } from 'lucide-react';

const Steps = () => {
  const steps = [
    {
      id: 1,
      title: 'Preencha os campos',
      description: 'Siga os passos do formulário e construa sua memória.',
      icon: <FileText size={24} className="text-memcyan" />
    },
    {
      id: 2,
      title: 'Pagamento',
      description: 'Faça o pagamento seguro com Cartão de Crédito ou PIX.',
      icon: <CreditCard size={24} className="text-memcyan" />
    },
    {
      id: 3,
      title: 'QRCode e Link',
      description: 'Você receberá instantaneamente o QR code e um link via email para acessar sua memória.',
      icon: <QrCode size={24} className="text-memcyan" />
    },
    {
      id: 4,
      title: 'Compartilhe a Memória',
      description: 'Faça uma surpresa ou guarde sua memória compartilhando o link ou o QR code.',
      icon: <Share2 size={24} className="text-memcyan" />
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step) => (
          <div key={step.id} className="relative">
            <div className="glass-card rounded-xl p-6 h-full">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-memblue/20 flex items-center justify-center mr-3">
                  {step.icon}
                </div>
                <div className="text-gradient text-xl font-bold">
                  {step.id}. {step.title}
                </div>
              </div>
              <p className="text-gray-400">{step.description}</p>
            </div>
            
            {step.id < steps.length && (
              <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-8 h-px bg-gradient-to-r from-memcyan to-transparent"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;

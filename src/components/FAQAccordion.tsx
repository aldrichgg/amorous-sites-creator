
import { useState } from 'react';
import { Plus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: 'O que é o Memoryiit?',
      answer: 'O Memoryiit é uma plataforma que permite criar sites personalizados para guardar e compartilhar memórias especiais com pessoas queridas. Através da nossa ferramenta, você pode criar páginas únicas com fotos, mensagens e elementos interativos.'
    },
    {
      question: 'Não recebi a memória, o que fazer?',
      answer: 'Se você não recebeu sua memória após o pagamento, verifique sua caixa de spam e lixeira. Caso não encontre, entre em contato com nosso suporte através do email suporte@memoryiit.com informando o número da transação que você recebeu após o pagamento.'
    },
    {
      question: 'Como posso criar uma página personalizada no Memoryiit?',
      answer: 'É muito simples! Basta clicar no botão "Começar", preencher o formulário com suas informações, adicionar fotos e mensagens, escolher um plano, realizar o pagamento e pronto! Você receberá um link e QR Code para acessar e compartilhar sua memória personalizada.'
    },
    {
      question: 'O que está incluído na minha página personalizada?',
      answer: 'Dependendo do plano escolhido, sua página pode incluir: upload de múltiplas fotos, mensagens personalizadas, contador regressivo, escolha de músicas de fundo, chuvinha de emojis personalizados e duração específica da disponibilidade do site.'
    },
    {
      question: 'Como recebo minha página personalizada após o pagamento?',
      answer: 'Imediatamente após a confirmação do pagamento, você receberá um e-mail com o link da sua página e um QR Code que pode ser compartilhado. Você também pode acessar suas memórias através da sua conta no Memoryiit a qualquer momento.'
    },
    {
      question: 'A página personalizada tem validade?',
      answer: 'Sim, a validade depende do plano escolhido. O plano básico tem duração de um ano, enquanto o plano completo mantém sua memória disponível "para sempre" (enquanto o serviço existir).'
    },
    {
      question: 'Qual é o custo para criar uma página no Memoryiit?',
      answer: 'Oferecemos dois planos: o Básico por R$17,00 que inclui 3 fotos e duração de um ano, e o Completo por R$27,00 que inclui 7 fotos e duração "para sempre". Ambos os planos incluem chuva de emojis e seleção de música.'
    },
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {faqItems.map((item, index) => (
        <div key={index} className="mb-4">
          <button
            className="w-full text-left p-4 border-b border-gray-800 flex justify-between items-center focus:outline-none group"
            onClick={() => toggleAccordion(index)}
          >
            <span className="text-xl font-medium text-white">{item.question}</span>
            <span className={`text-white transition-transform duration-300 ${activeIndex === index ? 'rotate-45' : ''}`}>
              <Plus size={20} />
            </span>
          </button>
          <div 
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="p-4 text-gray-300">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;

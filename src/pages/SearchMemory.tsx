
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Mail, ArrowRight, Check, X, Headset } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getMemoriesByEmail } from '@/services/memoryService';
import { Memory, MemoryPhoto } from '@/types/memory';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const searchSchema = z.object({
  email: z.string().email({ message: 'Insira um email válido' })
});

type SearchFormValues = z.infer<typeof searchSchema>;

interface MemoryWithPreviewPhoto extends Memory {
  previewPhoto?: string;
}

const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    active: {
      label: 'Ativo',
      color: 'bg-green-500',
      icon: Check
    },
    processing: {
      label: 'Processando',
      color: 'bg-yellow-500',
      icon: ArrowRight
    },
    expired: {
      label: 'Expirado',
      color: 'bg-red-500',
      icon: X
    }
  };

  const config = statusConfig[status as keyof typeof statusConfig];

  return (
    <div className={`flex items-center gap-1 ${config.color} text-white text-xs px-2 py-1 rounded-full`}>
      <config.icon className="w-3 h-3" />
      <span>{config.label}</span>
    </div>
  );
};

const SearchMemory = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<MemoryWithPreviewPhoto[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = async (values: SearchFormValues) => {
    setIsSearching(true);
    
    try {
      const { memories, photos } = await getMemoriesByEmail(values.email);
      
      if (memories.length > 0) {
        // Add preview photo to each memory
        const memoriesWithPreview = memories.map(memory => {
          const memoryPhotos = photos[memory.id] || [];
          return {
            ...memory,
            previewPhoto: memoryPhotos.length > 0 ? memoryPhotos[0].photoUrl : '/placeholder.svg',
            status: 'active' // We can refine this logic later if needed
          };
        });
        
        setSearchResults(memoriesWithPreview);
        toast({
          title: "Memórias encontradas",
          description: `Encontramos ${memories.length} memória(s) associada(s) ao seu email.`,
        });
      } else {
        setSearchResults([]);
        toast({
          title: "Nenhuma memória encontrada",
          description: "Não encontramos memórias associadas a este email.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error searching memories:', error);
      toast({
        title: "Erro na busca",
        description: "Ocorreu um erro ao buscar suas memórias. Tente novamente.",
        variant: "destructive"
      });
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleViewMemory = (pageName: string) => {
    navigate(`/memoria/${pageName}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Buscar minhas <span className="text-gradient">memórias</span>
            </motion.h1>
            <motion.p 
              className="text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Digite seu email para visualizar as memórias que você criou ou que foram compartilhadas com você.
            </motion.p>
            
            <motion.div 
              className="max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input 
                              placeholder="Insira seu email" 
                              className="pl-10 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-memred-light/50" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-memred to-memred-light hover:from-memred-dark hover:to-memred-light text-white"
                    disabled={isSearching}
                  >
                    {isSearching ? (
                      <>Buscando...</>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Buscar Memórias
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
          
          {searchResults && (
            <motion.div 
              className="max-w-4xl mx-auto mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-6">
                {searchResults.length > 0 ? 'Suas memórias' : 'Nenhuma memória encontrada'}
              </h2>
              
              {searchResults.length === 0 ? (
                <Card className="bg-gray-900 border-gray-800 text-white">
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
                        <Search className="text-gray-400 h-8 w-8" />
                      </div>
                      <p className="text-gray-400 mb-4">Não encontramos memórias associadas a este email.</p>
                      <Link 
                        to="/create" 
                        className="inline-flex items-center text-memred-light hover:text-memred hover:underline"
                      >
                        Criar uma nova memória
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {searchResults.map(memory => (
                    <Card key={memory.id} className="bg-gray-900 border-gray-800 overflow-hidden transition-all duration-300 hover:border-memred/40 hover:shadow-[0_0_15px_rgba(255,0,0,0.15)]">
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={memory.previewPhoto} 
                          alt={memory.pageTitle} 
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                        <div className="absolute top-2 right-2">
                          <StatusBadge status="active" />
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle>{memory.pageTitle}</CardTitle>
                        <CardDescription className="text-gray-400">
                          Criado em {format(memory.createdAt, 'dd/MM/yyyy', { locale: ptBR })}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="pt-0 flex justify-between">
                        <span className="text-xs text-gray-400">ID: {memory.id.substring(0, 8)}...</span>
                        <Button 
                          variant="link" 
                          className="text-memred-light hover:text-memred p-0 h-auto text-sm flex items-center"
                          onClick={() => handleViewMemory(memory.pageName)}
                        >
                          Ver memória <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </motion.div>
          )}
          
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-xl font-medium mb-4">Não encontrou o que procurava?</h3>
              <p className="text-gray-300 mb-6">
                Se você está tendo dificuldades para encontrar suas memórias ou tem alguma dúvida, 
                consulte nossa página de ajuda ou entre em contato conosco.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/faq" 
                  className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Perguntas Frequentes
                </Link>
                <Link 
                  to="/create" 
                  className="bg-gradient-to-r from-memred to-memred-light hover:from-memred-dark hover:to-memred-light text-white px-6 py-2 rounded-lg transition"
                >
                  Criar Nova Memória
                </Link>
                <Button 
                  onClick={() => {
                    toast({
                      title: "Suporte",
                      description: "Nossa equipe de suporte foi notificada e entrará em contato em breve.",
                    });
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
                >
                  <Headset className="mr-2 h-5 w-5" />
                  Suporte
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchMemory;

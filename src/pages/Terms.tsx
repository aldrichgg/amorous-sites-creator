
import { useEffect } from 'react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Termos de Uso</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3 text-memcyan">1. Aceitação dos Termos</h2>
            <p className="text-gray-300 leading-relaxed">
              Ao acessar e utilizar o site Loveiit, você concorda com estes Termos de Uso. Se você não concordar com qualquer parte destes termos, solicitamos que não utilize nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-memcyan">2. Descrição dos Serviços</h2>
            <p className="text-gray-300 leading-relaxed">
              O Loveiit oferece uma plataforma para criação e compartilhamento de memórias digitais. Nossos serviços permitem que os usuários criem páginas personalizadas com fotos, mensagens e elementos interativos para compartilhar com seus entes queridos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-memcyan">3. Cadastro e Contas</h2>
            <p className="text-gray-300 leading-relaxed">
              Para utilizar determinados recursos do Loveiit, pode ser necessário criar uma conta. Você é responsável por manter a confidencialidade de suas credenciais de acesso e por todas as atividades que ocorrem sob sua conta. Você concorda em notificar-nos imediatamente sobre qualquer uso não autorizado de sua conta.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-memcyan">4. Conteúdo do Usuário</h2>
            <div className="space-y-3 text-gray-300 leading-relaxed">
              <p>
                Ao publicar, enviar ou compartilhar conteúdo em nossa plataforma, você nos concede uma licença não exclusiva, transferível, sublicenciável, isenta de royalties e mundial para usar, reproduzir, modificar, distribuir e exibir esse conteúdo em conexão com nossos serviços.
              </p>
              <p>
                Você é o único responsável pelo conteúdo que compartilha e garante que possui todos os direitos necessários para conceder a licença acima. Além disso, você concorda que seu conteúdo não violará direitos de terceiros nem conterá material que seja ilegal, difamatório, obsceno ou inadequado.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-memcyan">5. Uso Aceitável</h2>
            <p className="text-gray-300 leading-relaxed">
              Você concorda em não utilizar o Loveiit para qualquer finalidade ilegal ou proibida pelos Termos de Uso. Isso inclui, mas não se limita a, distribuir conteúdo que seja ofensivo, pornográfico, difamatório, ameaçador, abusivo, discriminatório ou que viole direitos de propriedade intelectual de terceiros.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-memcyan">6. Propriedade Intelectual</h2>
            <p className="text-gray-300 leading-relaxed">
              O Loveiit e seu conteúdo original, recursos e funcionalidades são e permanecerão propriedade exclusiva da IMPULSEGRAM e de seus licenciadores. O serviço é protegido por direitos autorais, marcas registradas e outras leis de propriedade intelectual. Nossos logotipos e nomes comerciais não podem ser utilizados sem nossa aprovação prévia por escrito.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-memcyan">7. Alterações nos Serviços e Termos</h2>
            <p className="text-gray-300 leading-relaxed">
              Reservamo-nos o direito de modificar ou descontinuar, temporária ou permanentemente, nossos serviços (ou qualquer parte dele) a qualquer momento, com ou sem aviso prévio. Também podemos atualizar estes Termos de Uso periodicamente. As mudanças entrarão em vigor imediatamente após serem publicadas na plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-memcyan">8. Limitação de Responsabilidade</h2>
            <p className="text-gray-300 leading-relaxed">
              Em nenhuma circunstância a IMPULSEGRAM, nem seus diretores, funcionários, parceiros, agentes, fornecedores ou afiliados serão responsáveis por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo, sem limitação, perda de lucros, dados, uso, boa vontade ou outras perdas intangíveis, resultantes de: (i) seu acesso ou uso ou incapacidade de acessar ou usar o serviço; (ii) qualquer conduta ou conteúdo de terceiros no serviço; (iii) qualquer conteúdo obtido do serviço; e (iv) acesso não autorizado, uso ou alteração de suas transmissões ou conteúdo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-memcyan">9. Lei Aplicável</h2>
            <p className="text-gray-300 leading-relaxed">
              Estes Termos serão regidos e interpretados de acordo com as leis da República Federativa do Brasil, independentemente de seus conflitos de princípios legais.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-memcyan">10. Contato</h2>
            <p className="text-gray-300 leading-relaxed">
              Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco através das informações disponíveis em nosso site.
            </p>
          </section>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;

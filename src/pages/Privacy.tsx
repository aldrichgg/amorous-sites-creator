
import { useEffect } from 'react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Política de Privacidade</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3 text-memcyan">1. Introdução</h2>
            <p className="text-gray-300 leading-relaxed">
              A presente Política de Privacidade tem por finalidade demonstrar o compromisso da IMPULSEGRAM (Loveiit) com a privacidade e proteção dos dados pessoais coletados de seus usuários, estabelecendo regras sobre a coleta, registro, armazenamento, uso, compartilhamento e eliminação dos dados coletados dentro do escopo dos serviços e funcionalidades do nosso site, de acordo com as leis em vigor, com transparência e clareza junto ao usuário, e em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-memcyan">2. Definições</h2>
            <div className="space-y-3 text-gray-300 leading-relaxed">
              <p>Para os fins desta Política de Privacidade, aplicam-se as seguintes definições:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><span className="font-medium">Dados pessoais:</span> informação relacionada a pessoa natural identificada ou identificável;</li>
                <li><span className="font-medium">Tratamento:</span> toda operação realizada com dados pessoais;</li>
                <li><span className="font-medium">Titular:</span> pessoa natural a quem se referem os dados pessoais;</li>
                <li><span className="font-medium">Controlador:</span> pessoa natural ou jurídica que toma as decisões referentes ao tratamento de dados pessoais;</li>
                <li><span className="font-medium">Operador:</span> pessoa natural ou jurídica que realiza o tratamento de dados pessoais em nome do controlador;</li>
                <li><span className="font-medium">Consentimento:</span> manifestação livre, informada e inequívoca pela qual o titular concorda com o tratamento de seus dados pessoais para uma finalidade determinada.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-memcyan">3. Coleta de Dados</h2>
            <div className="space-y-3 text-gray-300 leading-relaxed">
              <p>Os dados pessoais são coletados quando você:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cria uma conta em nossa plataforma;</li>
                <li>Utiliza nossos serviços para criar memórias digitais;</li>
                <li>Entra em contato conosco por meio de nossos canais de atendimento;</li>
                <li>Navega em nosso site (por meio de cookies e tecnologias similares);</li>
                <li>Interage com nossas comunicações de marketing.</li>
              </ul>
              
              <p>Coletamos os seguintes tipos de dados:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><span className="font-medium">Dados de identificação:</span> nome, e-mail, número de telefone, endereço;</li>
                <li><span className="font-medium">Dados de navegação:</span> endereço IP, informações sobre o dispositivo usado, páginas visitadas, tempo de permanência, cookies;</li>
                <li><span className="font-medium">Conteúdo do usuário:</span> fotos, mensagens, links compartilhados e outros conteúdos que você opte por incluir em suas criações;</li>
                <li><span className="font-medium">Dados de pagamento:</span> informações de pagamento, histórico de transações (processados por nossos parceiros de pagamento).</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-memcyan">4. Finalidades do Tratamento</h2>
            <div className="space-y-3 text-gray-300 leading-relaxed">
              <p>Utilizamos seus dados pessoais para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fornecer, personalizar e melhorar nossos serviços;</li>
                <li>Processar transações e enviar notificações relacionadas à sua conta e serviços;</li>
                <li>Comunicar-nos com você sobre nossos serviços, atualizações e promoções;</li>
                <li>Proteger a segurança e integridade de nossos serviços;</li>
                <li>Cumprir obrigações legais e regulatórias;</li>
                <li>Resolver disputas e solucionar problemas;</li>
                <li>Prevenir atividades potencialmente proibidas ou ilegais.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-memcyan">5. Base Legal para o Tratamento</h2>
            <div className="space-y-3 text-gray-300 leading-relaxed">
              <p>O tratamento de dados pessoais é realizado com base nas seguintes hipóteses legais previstas na LGPD:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Mediante o fornecimento de consentimento pelo titular;</li>
                <li>Para o cumprimento de obrigação legal ou regulatória;</li>
                <li>Para a execução de contrato ou de procedimentos preliminares relacionados a contrato do qual seja parte o titular;</li>
                <li>Para o exercício regular de direitos em processo judicial, administrativo ou arbitral;</li>
                <li>Para atender aos interesses legítimos do controlador ou de terceiros;</li>
                <li>Para a proteção do crédito.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-memcyan">6. Compartilhamento de Dados</h2>
            <div className="space-y-3 text-gray-300 leading-relaxed">
              <p>Podemos compartilhar seus dados pessoais com:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><span className="font-medium">Prestadores de serviços:</span> empresas que nos auxiliam na operação do site e fornecimento dos serviços (processamento de pagamentos, hospedagem, análise de dados, serviços de e-mail);</li>
                <li><span className="font-medium">Parceiros comerciais:</span> quando necessário para fornecer serviços solicitados por você;</li>
                <li><span className="font-medium">Autoridades governamentais:</span> quando exigido por lei, regulamento ou processo legal;</li>
                <li><span className="font-medium">Profissionais como advogados e contadores:</span> para exercício regular de direitos.</li>
              </ul>
              <p>
                Todos os terceiros com os quais compartilhamos dados estão sujeitos a rigorosas obrigações contratuais de garantir a segurança e confidencialidade dos dados pessoais, em conformidade com a LGPD.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-memcyan">7. Direitos dos Titulares</h2>
            <div className="space-y-3 text-gray-300 leading-relaxed">
              <p>De acordo com a LGPD, você tem os seguintes direitos em relação aos seus dados pessoais:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Confirmação da existência de tratamento;</li>
                <li>Acesso aos dados;</li>
                <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
                <li>Anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a LGPD;</li>
                <li>Portabilidade dos dados;</li>
                <li>Eliminação dos dados pessoais tratados com o consentimento;</li>
                <li>Informação sobre entidades públicas e privadas com as quais o controlador realizou uso compartilhado de dados;</li>
                <li>Informação sobre a possibilidade de não fornecer consentimento e sobre as consequências da negativa;</li>
                <li>Revogação do consentimento.</li>
              </ul>
              <p>
                Para exercer seus direitos, entre em contato conosco através dos canais indicados nesta política.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-memcyan">8. Segurança dos Dados</h2>
            <p className="text-gray-300 leading-relaxed">
              Adotamos medidas técnicas e organizacionais para proteger seus dados pessoais contra acesso não autorizado, destruição, perda, alteração, comunicação ou qualquer forma de tratamento inadequado ou ilícito. Entre as medidas de segurança implementadas estão criptografia, controles de acesso, monitoramento contínuo e treinamento da equipe em melhores práticas de segurança da informação.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-memcyan">9. Armazenamento e Exclusão de Dados</h2>
            <p className="text-gray-300 leading-relaxed">
              Armazenamos seus dados pessoais pelo tempo necessário para cumprir as finalidades para as quais foram coletados, incluindo obrigações legais, contratuais, de prestação de contas ou requisição de autoridades competentes. Uma vez que os dados pessoais não sejam mais necessários para estas finalidades, eles serão excluídos ou anonimizados, a menos que sua retenção seja permitida ou exigida por lei.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-memcyan">10. Cookies e Tecnologias Similares</h2>
            <div className="space-y-3 text-gray-300 leading-relaxed">
              <p>
                Utilizamos cookies e tecnologias similares para melhorar a sua experiência, personalizar conteúdo e anúncios, e analisar o tráfego do site. Você pode configurar seu navegador para recusar todos os cookies ou para indicar quando um cookie está sendo enviado. No entanto, algumas funcionalidades do site podem não funcionar adequadamente sem cookies.
              </p>
              <p>
                Os tipos de cookies que utilizamos incluem:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><span className="font-medium">Cookies necessários:</span> essenciais para o funcionamento básico do site;</li>
                <li><span className="font-medium">Cookies de preferências:</span> permitem que o site memorize informações que mudam a forma como o site se comporta ou aparece;</li>
                <li><span className="font-medium">Cookies estatísticos:</span> ajudam a entender como os visitantes interagem com o site;</li>
                <li><span className="font-medium">Cookies de marketing:</span> usados para rastrear visitantes em sites para exibir anúncios relevantes.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-memcyan">11. Transferência Internacional de Dados</h2>
            <p className="text-gray-300 leading-relaxed">
              Alguns de nossos prestadores de serviços podem estar localizados em países diferentes do seu país de residência. Quando transferimos seus dados pessoais para fora do Brasil, garantimos que sejam tratados de acordo com esta Política de Privacidade e as leis de proteção de dados aplicáveis. Implementamos salvaguardas apropriadas para assegurar que seus dados recebam um nível adequado de proteção, como cláusulas contratuais padrão aprovadas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-memcyan">12. Encarregado de Proteção de Dados</h2>
            <p className="text-gray-300 leading-relaxed">
              Para informações sobre nossa coleta e processamento de dados pessoais, ou para exercer seus direitos como titular dos dados, entre em contato com nosso Encarregado de Proteção de Dados (DPO) através do e-mail: privacidade@loveiit.com.br.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-memcyan">13. Atualizações desta Política</h2>
            <p className="text-gray-300 leading-relaxed">
              Podemos atualizar esta Política de Privacidade periodicamente para refletir alterações em nossas práticas de privacidade ou por outros motivos operacionais, legais ou regulatórios. Recomendamos que você revise esta política regularmente para estar informado sobre como protegemos suas informações. A data da última atualização será sempre indicada no final desta política.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-memcyan">14. Lei Aplicável</h2>
            <p className="text-gray-300 leading-relaxed">
              Esta Política de Privacidade será regida e interpretada de acordo com as leis da República Federativa do Brasil, em especial a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
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

export default Privacy;

import '@auth/styles/layout-style.scss';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
      default: 'Whatsapp',
      template: 'Whatsapp',
    },
    description: 'Este é um site incrível feito com Next.js e App Router.',
    icons: {
      icon: '/images/favicon.png',
    },
  };
  
  export default function authPage({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <div className='container'>
            <div className='container-top'></div>
            <div className='container-bottom'>
                <div className='container-bottom-child'>
                    <div className="auth-page">
                        <div className='auth-page-box'>
                            <h1 className='title-primary'>
                                Encontre o Apoio Emocional Que Você Precisa
                            </h1>
                            <p className='title-secoundary'>
                                O caminho necessário para alcançar a saúde mental
                            </p> 
                            <img src="/bio-imagem.png" 
                            alt="Acessar o Whatsapp. Use o WhatsApp no seu navegador 
                            para enviar mensagens privadas para seus amigos e familiares." />
                        </div>  
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
  }
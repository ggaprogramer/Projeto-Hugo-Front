import '../styles/consulta.scss';
import { MdOutlineModeEdit } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaCalendarDays } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { BsCameraVideoFill } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import { LuBellRing } from "react-icons/lu";
import { MdSupportAgent } from "react-icons/md";
import Questions from '@app/components/Questions';
import { FaRegFaceAngry } from "react-icons/fa6";
import { FaRegFaceFrown } from "react-icons/fa6";
import { FaRegFaceMeh } from "react-icons/fa6";
import { FaRegFaceGrin } from "react-icons/fa6";
import { FaRegFaceGrinStars } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

export default function ConsultaComponent(props: {authToken: string | undefined}){
    const token = props.authToken;
    
    return (
        <div className='container-consulta'>
            <h1>
                Detalhes da Consulta
            </h1>
            <p>
                Informações completas sobre sua consulta.
            </p>
            <div className='box-info'>
                <div>
                    <img src='/user.png'></img>
                    <div className='avaliacoes'>
                        <img src='/estrela-preenchida.png'></img>
                        <img src='/estrela-preenchida.png'></img>
                        <img src='/estrela-preenchida.png'></img>
                        <img src='/estrela-semi-preenchida.png'></img>
                        <img src='/estrela-cinza.png'></img>
                        <p>(120 avaliações)</p>
                    </div>
                </div>
                <div>
                    <div className='info-1'>
                        <h2>
                            Dra. Ana Carolina Silva
                        </h2>
                        <span>
                            Piscologia Clínica
                        </span>
                        <span>
                            CRP: 06/123456
                        </span>
                    </div>
                    <div className='info-2'>
                        <div>
                            <FaCalendarDays/>
                            <div>
                                <p>Data:</p>
                                <p>10 de outubro de 2023</p>
                            </div>
                        </div>
                        <div>
                            <FaClock/>
                            <div>
                                <p>Horário:</p>
                                <p>14:30 - 15:30</p>
                            </div>
                        </div>
                        <div>
                            <BsCameraVideoFill/>
                            <div>
                                <p>Modalidade:</p>
                                <p>Vídeo Consulta</p>
                            </div>
                        </div>
                    </div>
                    <div className='info-3'>
                        <p>
                            <IoInformationCircleOutline/>
                            Informações da Consulta
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, quos saepe ea 
                            reprehenderit explicabo dignissimos quas debitis ullam? Recusandae fugiat quos perspiciatis 
                            perferendis ducimus ipsam error quisquam aperiam vitae non?
                        </p>
                    </div>
                    <div className='info-botoes'>
                        <button>
                            <BsCameraVideoFill/>
                            Acessar Vídeo Consulta
                        </button>
                        <button>
                            <MdOutlineModeEdit/>
                            Reagendar
                        </button>
                        <button>
                            <MdCancel/>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
            <div className='avisos'>
                <div className='aviso'>
                    <MdOutlineMail/>
                    <h3>
                        Informações por E-mail
                    </h3>
                    <p>
                        Enviamos os detalhes da sua consulta para seu e-mail cadastrado.
                    </p>
                </div>
                <div className='aviso'>
                    <LuBellRing/>
                    <h3>
                        Lembretes
                    </h3>
                    <p>
                        Você receberá lembretes 24h e 1h antes da sua consulta.
                    </p>
                </div>
                <div className='aviso'>
                    <MdSupportAgent/>
                    <h3>
                        Suporte
                    </h3>
                    <p>
                        Precisa de ajuda? Nossa equipe está disponível por chat ou telefone.
                    </p>
                </div>
            </div>

            <div className='instrucoes'>
                <h2>
                    <FaEdit/>
                    Instruções e Recomendações
                </h2>
                <div className='instrucoes-box'>
                    <div className='instrucao'>
                        <h4>
                            <FaEdit/>
                            Antes da Consulta:
                        </h4>
                        <ul>
                            <li>Escolha um local privado e silencioso para sua consulta</li>
                            <li>Teste sua câmera e microfone com antecedência</li>
                            <li>Tenha uma conexão estável com a internet</li>
                            <li>Acesse a sala virtual 5 minutos antes do horário agendado</li>
                            <li>Tenha em mãos papel e caneta para fazer anotações</li>
                        </ul>
                    </div>
                    <div className='instrucao'>
                        <h4>
                            <FaEdit/>
                            Durante a Consulta:
                        </h4>
                        <ul>
                            <li>Mantenha seu celular no silencioso para evitar interrupções</li>
                            <li>Avise outras pessoas da casa para não interromperem</li>
                            <li>Mantenha a câmera ligada durante toda a sessão</li>
                            <li>Fale claramente e posicione-se de forma confortável</li>
                        </ul>
                    </div>
                    <div className='instrucao'>
                        <h4>
                            <FaEdit/>
                            Após a Consulta:
                        </h4>
                        <ul>
                            <li>Verifique as próximas datas disponíveis para agendamento</li>
                            <li>Avalie a consulta para nos ajudar a melhorar</li>
                            <li>Verifique se há documentos disponíveis para download</li>
                            <li>Reserve um momento para refletir sobre a sessão</li>
                        </ul>
                    </div>
                </div>
            </div>

            <Questions/>

            <div className='experiencia-agendamento'>
                <h2>Como foi sua experiência de agendamento?</h2>
                <div>
                    <button>
                        <FaRegFaceAngry/>
                    </button>
                    <button>
                        <FaRegFaceFrown/>
                    </button>
                    <button>
                        <FaRegFaceMeh/>
                    </button>
                    <button>
                        <FaRegFaceGrin/>
                    </button>
                    <button>
                        <FaRegFaceGrinStars/>
                    </button>
                </div>
                <p>Seu feedback nos ajuda a melhorar nossos serviços</p>
                <textarea name="" id="" cols={4} rows={6} placeholder='Escreva a sua avaliação aqui...'></textarea>
                <button>Enviar</button>
            </div>
        </div>
    )
}
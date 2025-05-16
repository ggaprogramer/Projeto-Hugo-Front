import '../styles/agendamentos-perfil.scss';
import { FaCalendarAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { LuBrain } from "react-icons/lu";
import { MdAutoGraph } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";
import { AiOutlineVideoCamera } from "react-icons/ai";

export default function AgendamentosPerfil(){


    return (
        <>
            <div className="container-agendamentos">
                <div className='metricas'>
                    <div className='proxima-consultas'>
                        <h3>
                            Próxima Consulta
                            <FaCalendarAlt/>
                        </h3>
                        <div>
                            <img src="/user.png" alt="" />
                            <div>
                                <h4>
                                    Dra. Maria Betânia
                                </h4>
                                <p>
                                    <FaClock/>
                                    Quarta feira, 15 de junho
                                </p>
                                <p>
                                    <FaClock/>
                                    14:30 - 15:30
                                </p>
                            </div>
                        </div>
                        <button><HiCursorClick/>Ver detalhes</button>
                    </div>
                    <div className='quantidade-consultas'>
                        <h3>
                            Total de Consultas
                            <LuBrain/>
                        </h3>
                        <h2>
                            12
                        </h2>
                        <p>
                            Nos últimos 6 meses
                        </p>
                    </div>
                    <div className='progresso-consultas'>
                        <h3>
                            Progresso
                            <MdAutoGraph/>
                        </h3>
                        <div className='progresso'>
                            <div>
                                <p>
                                    Pendentes
                                </p>
                                <p>
                                    70%
                                </p>
                            </div>
                            <span>
                                <span></span>
                            </span>
                        </div>
                        <div className='progresso'>
                            <div>
                                <p>
                                    Aprovados
                                </p>
                                <p>
                                    70%
                                </p>
                            </div>
                            <span>
                                <span></span>
                            </span>
                        </div>
                        <div className='progresso'>
                            <div>
                                <p>
                                    Concluídos
                                </p>
                                <p>
                                    70%
                                </p>
                            </div>
                            <span>
                                <span></span>
                            </span>
                        </div>
                        <div className='progresso'>
                            <div>
                                <p>
                                    Cancelados
                                </p>
                                <p>
                                    70%
                                </p>
                            </div>
                            <span>
                                <span></span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className='agendamentos'>
                    <h2>
                        Minhas Consultas
                        <FaCalendarAlt/>
                    </h2>
                    <div className='tabela'>
                        <table>
                            <tr>
                                <th>
                                    Terapeuta
                                </th>
                                <th>
                                    Data
                                </th>
                                <th>
                                    Horário
                                </th>
                                <th>
                                    Tipo
                                </th>
                                <th>
                                    Status
                                </th>
                                <th>
                                    Ações
                                </th>
                            </tr>
                            <tr>
                                <td className='terapeuta'>
                                    <img src="/user.png" alt="" />
                                    <div>
                                        <p>
                                            Dra. Mariana da Silva
                                        </p>
                                        <p>
                                            Psicóloga Clínica
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    15 de junho de 2025
                                </td>
                                <td>
                                    14:30 - 15:30
                                </td>
                                <td className='tipo'>
                                    <span>Online</span>
                                </td>
                                <td className='status'>
                                    <span className='approved'>Confirmado</span>
                                </td>
                                <td className='acoes'>
                                    <div>
                                        <button>
                                            <IoEyeSharp/>
                                        </button>
                                        <button>
                                            <AiOutlineVideoCamera/>
                                        </button>
                                        <button>
                                            <SlOptionsVertical/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div>
                        <p>
                            Mostrando 4 de 12 consultas
                        </p>
                        <div className='navegacao'>
                            <button>&laquo;</button>
                            <button>&lsaquo;</button>
                            <button className='selected'>1</button>
                            <button>&rsaquo;</button>
                            <button>&raquo;</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
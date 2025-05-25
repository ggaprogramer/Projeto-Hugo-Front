'use client';

import '../styles/agendamentos-perfil.scss';
import { FaCalendarAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { LuBrain } from "react-icons/lu";
import { MdAutoGraph } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useState, useRef, useEffect } from 'react';
import {ControlSessionFilterProfile, SessionFilterProfile, SessionProfile} from '../interfaces';
import {Errors} from '@auth/interfaces';
import ErrorAuth from '@auth/components/ErrorAuth'
import getSessionProfile from '../functions/getSessionProfile';
import Pagination from '../components/Pagination';
import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";

export default function AgendamentosPerfil(){
    const [control, setControl] = useState<ControlSessionFilterProfile>({
        sessionsProfile: [],
        pageSelected: 0,
        totalPages: 0,
        totalElements: 0,
        pageSize: 5
    });

    const [formInputs, setFormInputs] = useState<{
        name: string | null;
        date: Date | null;
        status: string;
    }>({
        name: null,
        date: null,
        status: 'TODOS',
    });

    function formatSessionDateTime(
        dateHourSession: Date,
        dateHourSessionFinallized: Date
        ): { formattedDate: string; formattedTime: string } {

        // Lista de meses em português
        const monthsPT = [
            "janeiro", "fevereiro", "março", "abril", "maio", "junho",
            "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
        ];

        const dateHourSessionFormatted = new Date(dateHourSession);
        const dateHourSessionFinallizedFormatted = new Date(dateHourSessionFinallized);
        
        const day = dateHourSessionFormatted.getDate()
        const month = monthsPT[dateHourSessionFormatted.getMonth()];
        const year = dateHourSessionFormatted.getFullYear();

        const formattedDate = `${day} de ${month} de ${year}`;

        const pad = (num: number) => String(num).padStart(2, "0");

        const startHour = `${pad(dateHourSessionFormatted.getHours())}:${pad(dateHourSessionFormatted.getMinutes())}`;
        const endHour = `${pad(dateHourSessionFinallizedFormatted.getHours())}:${pad(dateHourSessionFinallizedFormatted.getMinutes())}`;

        const formattedTime = `${startHour} - ${endHour}`;

        return {
            formattedDate,
            formattedTime
        };
    }

    useEffect(() => {
        const makeFilterInitial = async () => {
            await makeFilter();
        }
        makeFilterInitial();
    }, []);

    useEffect(() => {
        const reloadFilter = async () => {
            await makeFilter();
        };
        reloadFilter();
    }, [control.pageSelected, control.pageSize]);

    const [viewFiltroPaginaDropBox, setViewFiltroPaginaDropBox] = useState<boolean>(false);
    const handleFiltroPaginaDropBox = () => {
        if(viewFiltroPaginaDropBox) {
            setViewFiltroPaginaDropBox(false);
        } else {
            setViewFiltroPaginaDropBox(true);
        }
    }

    const [errors, setErrors] = useState<Errors[]>([]);
    
    const buttonFilter = useRef<HTMLButtonElement>(null);
    const loader = useRef<HTMLSpanElement>(null);

    const [proximaConsulta, setProximaConsulta] = useState<SessionProfile | null>(null);
    useEffect(() => {
        if(control?.sessionsProfile && control?.sessionsProfile?.length > 0){
            for(let i = 0; i < control?.sessionsProfile?.length; i++){
                if(control?.sessionsProfile[i]?.status === 'APPROVED'){
                    setProximaConsulta(control.sessionsProfile[i]);
                    break;
                }
            }
        };
    }, [control.sessionsProfile]);

    const viewLoader = () => {
        buttonFilter?.current?.setAttribute('style', 'display: none');
        loader?.current?.setAttribute('style', 'display: flex');
    }
    const disableLoader = () => {
        buttonFilter?.current?.setAttribute('style', 'display: flex');
        loader?.current?.setAttribute('style', 'display: none');
    }

    const handleFormInputs = (name: string, e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const input = e.target as HTMLInputElement;

        if(name === 'name') {
            setFormInputs({...formInputs, name: input.value});
        } else if(name === 'date') {
            setFormInputs({...formInputs, date: new Date(input.value)});
        } 
        else if(name === 'status') {
            setFormInputs({...formInputs, status: input.value});
        }
    }

    const makeFilter = async () => {
        const body: SessionFilterProfile = {
            pagina: control.pageSelected,
            tamanho: control.pageSize,
            ordenarPor: "dateHourSession",
            direcao: "DESC",
            nomeProfessional: formInputs.name ? formInputs.name : "",
            date: formInputs.date,
            status: formInputs.status,
        }

        let errors: Errors[] = [];
        try{
            viewLoader();
            const json = await getSessionProfile(body);
            const data: SessionProfile[] = json.content; 
            setControl({...control, 
                sessionsProfile: data, 
                totalElements: json.totalElements, 
                pageSelected: json.pageable.pageNumber, 
                pageSize: json.size,
                totalPages: json.totalPages});
            setErrors([]);
            disableLoader();
        } catch(e){
            disableLoader();
            errors.push({type: 'system', description: 'Houve um erro na comunicação com o servidor.'});
            setErrors(errors);
        }
    }

    const makeCleanFilter = () => {
        setFormInputs({...formInputs,
            name: null,
            date: null,
            status: 'TODOS',
        });
    }

    const formatDateForInput = (date: Date): string => {
        return date.toISOString().split("T")[0]; // yyyy-MM-dd
    };

    const percentProgress = (name: string) => {
        if(control && control?.sessionsProfile && control?.sessionsProfile.length > 0){
            let count = 0;
            for(let i = 0; i <= control.sessionsProfile.length; i++){
                if(name === 'PROCESSING' && control?.sessionsProfile[i]?.status === 'PROCESSING'){
                    count+=1;
                } else if(name === 'APPROVED' && control?.sessionsProfile[i]?.status === 'APPROVED'){
                    count+=1;
                } else if(name === 'FINISHED' && control?.sessionsProfile[i]?.status === 'FINISHED'){
                    count+=1;
                } else if(name === 'CANCELLED' && control?.sessionsProfile[i]?.status === 'CANCELLED'){
                    count+=1;
                }
            }
            if(control && control?.sessionsProfile && control?.sessionsProfile.length > 0) {
                return `${count / control.sessionsProfile.length * 100}%`;
            } 
            return '0%';
        } 
        return '0%';
    }

    const percentProgressSpan = (name: string) => {
        const porcent = percentProgress(name);
        if(name === 'PROCESSING'){
            return (<span style={{width: porcent}} className='processing'></span>)
        } else if(name === 'APPROVED'){
            return (<span style={{width: porcent}} className='approved'></span>)
        } else if(name === 'FINISHED'){
            return (<span style={{width: porcent}} className='finished'></span>)
        } else if(name === 'CANCELLED'){
            return (<span style={{width: porcent}} className='canceled'></span>)
        } 
    }

    return (
        <>
            <div className="container-agendamentos">
                <div className='metricas'>
                    {proximaConsulta &&
                        <div className='proxima-consultas'>
                            <h3>
                                Próxima Consulta Confirmada
                                <FaCalendarAlt/>
                            </h3>
                            <div>
                                {
                                    proximaConsulta.linkPhotoProfessional
                                    ?
                                    <img src={proximaConsulta.linkPhotoProfessional} alt="" />
                                    :
                                    <img src="/user.png" alt="" />
                                }
                                <div>
                                    <h4>
                                        {proximaConsulta.gender === 'MULHER' ? 'Dra. ' : 'Dr. '}  {proximaConsulta.professionalName}
                                    </h4>
                                    <p>
                                        <FaClock/>
                                        {formatSessionDateTime(proximaConsulta.dateHourSession, proximaConsulta.dateHourSessionFinallized).formattedDate}
                                    </p>
                                    <p>
                                        <FaClock/>
                                        {formatSessionDateTime(proximaConsulta.dateHourSession, proximaConsulta.dateHourSessionFinallized).formattedTime}
                                    </p>
                                </div>
                            </div>
                            <button><HiCursorClick/>Ver detalhes</button>
                        </div>
                    }
                    <div className='quantidade-consultas'>
                        <h3>
                            Total de Consultas
                            <LuBrain/>
                        </h3>
                        <h2>
                            {control?.totalElements}
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
                                    {percentProgress('PROCESSING')}
                                </p>
                            </div>
                            <span>
                                {percentProgressSpan('PROCESSING')}
                            </span>
                        </div>
                        <div className='progresso'>
                            <div>
                                <p>
                                    Aprovados
                                </p>
                                <p>
                                    {percentProgress('APPROVED')}
                                </p>
                            </div>
                            <span>
                                {percentProgressSpan('APPROVED')}
                            </span>
                        </div>
                        <div className='progresso'>
                            <div>
                                <p>
                                    Concluídos
                                </p>
                                <p>
                                    {percentProgress('FINISHED')}
                                </p>
                            </div>
                            <span>
                                {percentProgressSpan('FINISHED')}
                            </span>
                        </div>
                        <div className='progresso'>
                            <div>
                                <p>
                                    Cancelados
                                </p>
                                <p>
                                    {percentProgress('CANCELLED')}
                                </p>
                            </div>
                            <span>
                                {percentProgressSpan('CANCELLED')}
                            </span>
                        </div>
                    </div>
                </div>
                <div className='agendamentos'>
                    <h2>
                        Minhas Consultas
                        <FaCalendarAlt/>
                    </h2>
                    <div className='filtros'>
                        <label>
                            <p>Busca por nome:</p>
                            <input type="text" value={formInputs.name ? formInputs.name : ''} name='name' placeholder='Nome do profissional'
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleFormInputs('name', e)}  />
                        </label>
                        <label>
                            <p>Busca por data:</p>
                            <input type="date" name='date' value={formInputs.date ? formatDateForInput(formInputs.date) : ''} 
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleFormInputs('date', e)}  />
                        </label>
                        <label>
                            <p>Busca por status:</p>
                            <select name="status" value={formInputs.status}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleFormInputs('status', e)} >
                                <option value="TODOS">Todos</option>
                                <option value="PROCESSING">Processando</option>
                                <option value="APPROVED">Aprovado</option>
                                <option value="FINISHED">Finalizado</option>
                                <option value="CANCELLED">Cancelado</option>
                            </select>
                        </label>
                        <button onClick={makeCleanFilter}>
                            <FaTrashAlt/>
                            Limpar
                        </button>
                        <button ref={buttonFilter} onClick={makeFilter}>
                            <IoSearch/>
                            Pesquisar
                        </button>
                        <span ref={loader} className='loader'></span>
                    </div>
                    <div className='filtro-pagina'>
                        <p onClick={() => handleFiltroPaginaDropBox()}>
                            Quantidade por página: {control.pageSize} 
                            {
                                !viewFiltroPaginaDropBox
                                ?
                                <GoChevronDown/>
                                :
                                <GoChevronUp/>
                            }
                        </p>
                        {
                            viewFiltroPaginaDropBox
                            &&
                            <div className='filtro-pagina-dropbox'>
                                <p onClick={() => setControl({...control, pageSize: 5, pageSelected: 0})} 
                                className={`${control.pageSize === 5 ? 'selected' : ''}`}>
                                    5
                                </p>
                                <p onClick={() => setControl({...control, pageSize: 10, pageSelected: 0})} 
                                className={`${control.pageSize === 10 ? 'selected' : ''}`}>
                                    10
                                </p>
                                <p onClick={() => setControl({...control, pageSize: 15, pageSelected: 0})} 
                                className={`${control.pageSize === 15 ? 'selected' : ''}`}>
                                    15
                                </p>
                                <p onClick={() => setControl({...control, pageSize: 20, pageSelected: 0})} 
                                className={`${control.pageSize === 20 ? 'selected' : ''}`}>
                                    20
                                </p>
                                <p onClick={() => setControl({...control, pageSize: 25, pageSelected: 0})} 
                                className={`${control.pageSize === 25 ? 'selected' : ''}`}>
                                    25
                                </p>
                            </div>
                        }
                    </div>
                    <ErrorAuth errors={errors} type='system'/>
                    <div className='tabela'>
                        <table>
                            <thead>
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
                            </thead>
                            <tbody>
                                {control.sessionsProfile.map(session => {
                                    return (
                                        <tr key={session.id}>
                                            <td className='terapeuta'>
                                                {
                                                    session.linkPhotoProfessional
                                                    ?
                                                    <img src={session.linkPhotoProfessional} alt="" />
                                                    :
                                                    <img src="/user.png" alt="" />
                                                }
                                                <div>
                                                    <p>
                                                        {session.gender === 'MULHER' ? 'Dra. ' : 'Dr. '}  {session.professionalName}
                                                    </p>
                                                    <p>
                                                        Psicóloga Clínica
                                                    </p>
                                                </div>
                                            </td>
                                            <td>
                                                {formatSessionDateTime(session.dateHourSession, session.dateHourSessionFinallized).formattedDate}
                                            </td>
                                            <td>
                                                {formatSessionDateTime(session.dateHourSession, session.dateHourSessionFinallized).formattedTime}
                                            </td>
                                            <td className='tipo'>
                                                <span>Online</span>
                                            </td>
                                            <td className='status'>
                                                {
                                                    session.status === 'PROCESSING'
                                                    &&
                                                    <span className='processing'>Processando</span>
                                                }

                                                {
                                                    session.status === 'APPROVED'
                                                    &&
                                                    <span className='approved'>Aprovado</span>
                                                }

                                                {
                                                    session.status === 'FINISHED'
                                                    &&
                                                    <span className='finished'>Finalizado</span>
                                                }

                                                {
                                                    session.status === 'CANCELED'
                                                    &&
                                                    <span className='canceled'>Cancelado</span>
                                                }

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
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <p>
                            {
                                control.totalElements === 1
                                ?
                                ` Foi encontrada 1 consulta:`
                                :
                                ` Foram encontradas ${control.totalElements} consultas:`
                            }
                        </p>
                        {   
                            control.totalElements > control.pageSize
                            &&
                            <Pagination control={control} setControl={setControl}/>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
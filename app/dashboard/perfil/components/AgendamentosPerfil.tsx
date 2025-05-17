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
import { IoSearch } from "react-icons/io5";
import { useState, useRef } from 'react';
import {ControlSessionFilterProfile, SessionFilterProfile, SessionProfile} from '../interfaces';
import {Errors} from '@auth/interfaces';
import ErrorAuth from '@auth/components/ErrorAuth'
import getSessionProfile from '../functions/getSessionProfile';

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

    const [errors, setErrors] = useState<Errors[]>([]);
    
    const buttonFilter = useRef<HTMLButtonElement>(null);
    const loader = useRef<HTMLSpanElement>(null);

    const viewLoader = () => {
        buttonFilter?.current?.setAttribute('style', 'display: none');
        loader?.current?.setAttribute('style', 'display: inline-block');
    }
    const disableLoader = () => {
        buttonFilter?.current?.setAttribute('style', 'display: inline-block');
        loader?.current?.setAttribute('style', 'display: none');
    }

    const handleFormInputs = (name: string, e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const input = e.target as HTMLInputElement;

        if(name === 'nome') {
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
            ordenarPor: "name",
            direcao: "ASC",
            nomeProfessional: formInputs.name ? formInputs.name : "",
            date: formInputs.date,
            status: formInputs.status,
        }

        let errors: Errors[] = [];
        try{
            viewLoader();
            const response = await getSessionProfile(body);
            console.log(response);
            if(response?.ok){
                const json = await response.json();
                console.log(json);
                const data: SessionProfile[] = json.content; 
                setControl({...control, 
                    sessionsProfile: data, 
                    totalElements: json.totalElements, 
                    pageSelected: json.pageable.pageNumber, 
                    pageSize: json.size,
                    totalPages: json.totalPages});
                setErrors([]);
                disableLoader();
            } 
        } catch(e){
            console.log(e);
            disableLoader();
            errors.push({type: 'system', description: 'Houve um erro na comunicação com o servidor.'});
            setErrors(errors);
        }
    }

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
                                <span className='processing'></span>
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
                                <span className='approved'></span>
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
                                <span className='finished'></span>
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
                                <span className='canceled'></span>
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
                            <input type="text" name='name' placeholder='Nome do profissional'
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleFormInputs('name', e)}  />
                        </label>
                        <label>
                            <p>Busca por data:</p>
                            <input type="date" name='date' onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleFormInputs('date', e)}  />
                        </label>
                        <label>
                            <p>Busca por status:</p>
                            <select name="status" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleFormInputs('status', e)} >
                                <option value="TODOS">Todos</option>
                                <option value="PROCESSING">Processando</option>
                                <option value="APPROVED">Aprovado</option>
                                <option value="FINISHED">Finalizado</option>
                                <option value="CANCELLED">Cancelado</option>
                            </select>
                        </label>
                        <button ref={buttonFilter} onClick={makeFilter}>
                            <IoSearch/>
                            Pesquisar
                        </button>
                        <span ref={loader} className='loader'></span>
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
                            </tbody>
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
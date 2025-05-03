'use client';

import { FaCalendarAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import '../styles/configuration-profissional.scss';
import {useState, useEffect, useRef, FormEvent} from 'react';
import {ConfigurationAgendamentos, Dates} from '../interfaces';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Message from '@app/components/Message';
import {MessageType} from '@app/interfaces';

function addHourToDateArray(dates: Dates[], newDate: Date, newHour: string): Dates[] {
    const existingDate = dates.find(d => d.day.toISOString().split('T')[0] === newDate.toISOString().split('T')[0]);
    
    if (existingDate) {
        // Se o dia já existir, adiciona a nova hora
        if (!existingDate.hours.includes(newHour)) {
            existingDate.hours.push(newHour);
        }
    } else {
        // Se o dia não existir, cria um novo objeto Dates
        dates.push({ day: newDate, hours: [newHour] });
    }
    
    return dates;
}

function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');  // Adiciona 0 à frente se o dia for menor que 10
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Meses começam do 0, então somamos 1
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export default function ConfigurationProfissional() {

    // Mensagem - Início
    const [viewMessageConfig, setViewMessageConfig] = useState<{
        status: boolean
        message: string,
        type: MessageType
    }>({
        status: false,
        message: '',
        type: 'INFO'
    });
    const viewMessage = (message: string, type: MessageType) => {
        setViewMessageConfig({message: message, type: type, status: true });
    }

    useEffect(() => {
        let id: NodeJS.Timeout;
    
        if (viewMessageConfig.status) {
            id = setTimeout(() => {
                setViewMessageConfig(prev => ({ ...prev, status: false }));
            }, 5000);
        }
    
        return () => {
            if (id) clearTimeout(id);
        };
    }, [viewMessageConfig]);
    // Mensagem - Fim

    const [formInputsAgendamentos, setFormInputsAgendamentos] = useState<ConfigurationAgendamentos>({
        precoAgendamento: '',
        duracaoAgendamento: '',
        datasAgendamentos: [],
    });

    // Configurações Calendário - Início
    const dateNow = new Date();
    const [dateSelected, setDateSelected] = useState(dateNow);
    const [hourSelected, setHourSelected] = useState<string | null>();
    const [hoursOfDate, setHoursOfDate] = useState<string[]>([]);
    const [reload, setReload] = useState<number>(0);

    useEffect(() => {
        for(let i = 0; i < formInputsAgendamentos.datasAgendamentos.length; i++){
            if(formInputsAgendamentos.datasAgendamentos[i].day.toDateString() === dateSelected.toDateString()){
                setHoursOfDate([...formInputsAgendamentos.datasAgendamentos[i].hours]);
                break;
            }
        }
        setHourSelected(null);
    }, [dateSelected, reload]);

    // Função para verificar se um dia tem agendamento
    const haveAgendamento = (dateCalendar: any) => {
        return formInputsAgendamentos.datasAgendamentos.some((date) => date.day.toDateString() === dateCalendar.toDateString());
    };

    const variableHaveAgendamento = haveAgendamento(dateSelected);

    // Classe CSS para os dias com agendamentos disponíveis
    const tileClassName = ({ date, view }: any) => {
        if (view === 'month' && haveAgendamento(date)) {
        return 'selected'; // Adiciona uma classe CSS para dias com agendamento disponível
        }
        return null;
    };

    const onChange = (novaData: any) => {
        setDateSelected(novaData);
    };

    const formatDescriptionOne = () => {
        if(dateSelected.toDateString() === dateNow.toDateString()){
            return 'hoje';
        } else if(dateSelected.getDate() === dateNow.getDate() + 1 &&
        dateSelected.getMonth() === dateNow.getMonth() && 
        dateSelected.getFullYear() === dateNow.getFullYear()) {
            return 'amanhã';
        } else{
            return dateSelected.toLocaleDateString();
        }
    }
    // Configurações Calendário - Fim

    const inputAdicionarAgendamento = useRef<HTMLInputElement>(null);

    const handleSubmitAgendamento = (value: string, name: string) => {
        const regex = /^\d{1,10}(\.|\,)?\d{0,2}$/;
        if(name === 'preco-agendamento') {
            if(regex.test(value)){
                setFormInputsAgendamentos({...formInputsAgendamentos, precoAgendamento: value});
            } else {
                setFormInputsAgendamentos({...formInputsAgendamentos, precoAgendamento: ''});
            }
        } else if(name === 'duracao-agendamento'){
            if(regex.test(value)){
                setFormInputsAgendamentos({...formInputsAgendamentos, duracaoAgendamento: value});
            } else {
                setFormInputsAgendamentos({...formInputsAgendamentos, duracaoAgendamento: ''});
            }
        } 
    }

    const handleAdicionarAgendamento = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value = inputAdicionarAgendamento.current?.value;

        if(value){
            const dates = addHourToDateArray(formInputsAgendamentos.datasAgendamentos, dateSelected, value);
            setFormInputsAgendamentos({...formInputsAgendamentos, datasAgendamentos: dates});
            setReload(reload + 1);
            viewMessage(`Parabéns, o seu agendamento ${formatDate(dateSelected)} ${value} foi cadastrado com sucesso!`, 'SUCCESS');
        } else {

        }
    }

    return (
        <>
            <div className='configuration-professional'>
                <h1>
                    <IoMdSettings/>
                    Configurações
                </h1>

                <div className='configuration-agendamentos'>
                    <h2>
                        <FaCalendarAlt/>
                        Agendamentos
                    </h2>
                    <div className="agendamentos-inputs">
                        <div>
                            <label htmlFor="preco-agendamento">
                                Preço do agendamento (R$):
                            </label>
                            <input onInput={(e) => handleSubmitAgendamento((e.target as HTMLInputElement).value, 'preco-agendamento')}
                                value={formInputsAgendamentos.precoAgendamento} type="text" name='preco-agendamento' id='preco-agendamento' placeholder='R$ 00.00' />
                        </div>
                        <div>
                            <label htmlFor="duracao-agendamento">
                                Duração do agendamento (minutos):
                            </label>
                            <input onInput={(e) => handleSubmitAgendamento((e.target as HTMLInputElement).value, 'duracao-agendamento')}
                                value={formInputsAgendamentos.duracaoAgendamento} type="text" name='duracao-agendamento' id='duracao-agendamento' placeholder='00 minutos' />
                        </div>
                    </div>
                    <button className="button-submit">Salvar</button>

                    <h2>
                        <FaCalendarAlt/>
                        Datas e horários escolhidos
                    </h2>
                    <div className="agendamentos">
                        <Calendar onChange={onChange}
                            value={dateSelected}
                            tileClassName={tileClassName}
                            className='custom-calendar'
                        />
                        {
                            variableHaveAgendamento 
                            && 
                            <>
                                <p>
                                    Seus horários disponíveis para <strong>{formatDescriptionOne()}</strong>
                                </p>
                                <div className='horarios'>
                                    {hoursOfDate.map(horario => {
                                        if(horario === hourSelected){
                                            return (<span key={horario} onClick={() => setHourSelected(horario)} className='horario selecionado'>
                                                {horario}
                                            </span>)
                                        } else {
                                            return (<span key={horario} onClick={() => setHourSelected(horario)} className='horario'>
                                                {horario}
                                            </span>)
                                        }
                                    })}
                                </div>
                            </>
                        }
                        {
                            dateSelected 
                            &&
                            <>
                                <p>
                                    Adicionar um horário para <strong>{formatDescriptionOne()}</strong>:
                                </p>
                                <form onSubmit={handleAdicionarAgendamento} className="adicionar-agendamento">
                                    <input ref={inputAdicionarAgendamento} type="time" name="adicionar-time-agendamento" />
                                    <button type="submit" className="button-submit">Adicionar</button>
                                </form>
                            </>
                        }
                    </div>
                </div>
            </div>
            {viewMessageConfig.status && <Message message={viewMessageConfig.message} type={viewMessageConfig.type}/>}
        </>
    )
}
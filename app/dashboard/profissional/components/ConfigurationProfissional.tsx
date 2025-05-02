'use client';

import { FaCalendarAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import '../styles/configuration-profissional.scss';
import {useState, useEffect} from 'react';
import {ConfigurationAgendamentos, Dates} from '../interfaces';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function transformDatetimeToDates(datetimeList: string[]): Dates[] {
    const datesMap: { [key: string]: string[] } = {}; // Map to hold days and their hours

    // Iterar sobre a lista de datetimes
    datetimeList.forEach(datetime => {
        const dateObj = new Date(datetime); // Convertendo para objeto Date
        const dayString = dateObj.toISOString().split('T')[0]; // Obtendo o formato 'YYYY-MM-DD'
        const hourString = dateObj.toISOString().split('T')[1].split('.')[0]; // Obtendo o formato 'HH:mm:ss'

        // Adicionando a hora ao dia correspondente no mapa
        if (!datesMap[dayString]) {
            datesMap[dayString] = [];
        }
        datesMap[dayString].push(hourString);
    });

    // Convertendo o mapa para o formato desejado
    const result: Dates[] = Object.keys(datesMap).map(day => ({
        day: new Date(day),
        hours: datesMap[day],
    }));

    return result;
}

export default function ConfigurationProfissional() {

    const [formInputsAgendamentos, setFormInputsAgendamentos] = useState<ConfigurationAgendamentos>({
        precoAgendamento: '',
        duracaoAgendamento: '',
        datasAgendamentos: transformDatetimeToDates([]),
    });

    const dateNow = new Date();
    const [dateSelected, setDateSelected] = useState(dateNow);
    const [hourSelected, setHourSelected] = useState<string | null>();
    const [hoursOfDate, setHoursOfDate] = useState<string[]>([]);

    useEffect(() => {
        for(let i = 0; i < formInputsAgendamentos.datasAgendamentos.length; i++){
            if(formInputsAgendamentos.datasAgendamentos[i].day.toDateString() === dateSelected.toDateString()){
                setHoursOfDate([...formInputsAgendamentos.datasAgendamentos[i].hours]);
                break;
            }
        }
        setHourSelected(null);
    }, [dateSelected]);

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

    const verifyNumberInput = (value: string, name: string) => {
        const regex = /^\d{1,10}(\.|\,)?\d{0,2}$/;
        if(name === 'preco-agendamento') {
            if(regex.test(value)){
                setFormInputsAgendamentos({...formInputsAgendamentos, precoAgendamento: value});
            } else {
                setFormInputsAgendamentos({...formInputsAgendamentos, precoAgendamento: ''});
            }
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
                            <input onInput={(e) => verifyNumberInput((e.target as HTMLInputElement).value, 'preco-agendamento')}
                                value={formInputsAgendamentos.precoAgendamento} type="text" name='preco-agendamento' id='preco-agendamento' placeholder='R$ 00.00' />
                        </div>
                        <div>
                            <label htmlFor="duracao-agendamento">
                                Duração do agendamento (minutos):
                            </label>
                            <input onInput={(e) => verifyNumberInput((e.target as HTMLInputElement).value, 'duracao-agendamento')}
                                value={formInputsAgendamentos.duracaoAgendamento} type="text" name='duracao-agendamento' id='duracao-agendamento' placeholder='00 minutos' />
                        </div>
                    </div>
                    <button className="button-submit">Salvar</button>

                    <div className="agendamentos-inputs">
                        <div>
                            <label htmlFor="adicionar-um-agendamento">
                                Criar um agendamento (adicionar data e hora):
                            </label>
                            <input type="datetime-local" 
                                name='adicionar-um-agendamento' id='adicionar-um-agendamento'/>
                        </div>
                    </div>
                    <button className="button-submit">Adicionar agendamento</button>

                    <div className="agendamentos-inputs">
                        <div>
                            <p>
                                Criar vários agendamentos (adicionar datas e hora):
                            </p>
                            <div>
                                <label htmlFor="preco-agendamento">
                                    Quantos agendamentos você quer criar?
                                </label>
                                <input onInput={(e) => verifyNumberInput((e.target as HTMLInputElement).value, 'preco-agendamento')}
                                    value={formInputsAgendamentos.precoAgendamento} type="text" 
                                    name='preco-agendamento' id='preco-agendamento' placeholder='10 agendamentos' />
                            </div>
                            <label htmlFor="adicionar-varios-agendamentos-data">
                                <p>Dias úteis</p>
                                <input type="radio" name="adicionar-varios-agendamentos-data" id="adicionar-varios-agendamentos-data" />
                            </label>
                            <label htmlFor="adicionar-varios-agendamentos-data">
                                <p>Finais de Semana</p>
                                <input type="radio" name="adicionar-varios-agendamentos-data" id="adicionar-varios-agendamentos-data" />
                            </label>
                            <label htmlFor="adicionar-varios-agendamentos-data">
                                <p>Segunda, Quarta, Sexta</p>
                                <input type="radio" name="adicionar-varios-agendamentos-data" id="adicionar-varios-agendamentos-data" />
                            </label>
                            <label htmlFor="adicionar-varios-agendamentos-data">
                                <p>Terça, Quinta</p>
                                <input type="radio" name="adicionar-varios-agendamentos-data" id="adicionar-varios-agendamentos-data" />
                            </label>
                            <label htmlFor="adicionar-varios-agendamentos-data">
                                <p>Escolher um dia</p>
                                <input type="radio" name="adicionar-varios-agendamentos-data" id="adicionar-varios-agendamentos-data" />
                            </label>

                        </div>
                    </div>
                    <button className="button-submit">Adicionar vários agendamentos</button>

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
                        {variableHaveAgendamento && 
                        <p>
                            Seus horários disponíveis para {formatDescriptionOne()}
                        </p>}
                        {variableHaveAgendamento &&
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
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
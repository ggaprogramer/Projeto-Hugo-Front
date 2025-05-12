'use client';

import { FaCalendarAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import '../styles/configuration-profissional.scss';
import {useState, useEffect, useRef, FormEvent} from 'react';
import {ConfigurationAgendamentos, Dates, ConfigAgendamentos} from '../interfaces';
import createDayHour from '../functions/createDayHour';
import getDayHour from '../functions/getDayHour';
import deleteDayHour from '../functions/deleteDayHour';
import updateConfig from '../functions/updateConfig';
import extractConfigProfessional from '../functions/extractConfigProfessional';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Message from '@app/components/Message';
import {MessageType} from '@app/interfaces';
import { GiPriceTag } from "react-icons/gi";
import { config } from "process";

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

function removeHourFromDateArray(dates: Dates[], targetDate: Date, targetHour: string): Dates[] {
    const existingDate = dates.find(d => d.day.toDateString() === targetDate.toDateString());

    if (existingDate) {
        // Se o dia existe, remove a hora especificada
        existingDate.hours = existingDate.hours.filter(hour => hour !== targetHour);

        // Se não houver mais horas para o dia, opcionalmente pode-se remover o dia
        if (existingDate.hours.length === 0) {
            const index = dates.indexOf(existingDate);
            if (index !== -1) {
                dates.splice(index, 1); // Remove o objeto 'day' se não houver mais horas
            }
        }
    }

    return dates;
}

function sortHoursInDate(dates: Dates): Dates {
    // Ordena as horas dentro do objeto Dates
    dates.hours.sort((a, b) => a.localeCompare(b));

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
        const newDate = new Date();
        const newDateFormatted = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());

        return formInputsAgendamentos.datasAgendamentos
        .some((date) => 
            date.day.toDateString() === dateCalendar.toDateString() &&
            dateCalendar >= newDateFormatted
        );
    };

    const variableHaveAgendamento = haveAgendamento(dateSelected);

    // Classe CSS para os dias com agendamentos disponíveis
    const tileClassName = ({ date, view }: any) => {
        const newDate = new Date();
        const newDateFormatted = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
        if(date < newDateFormatted) {
            return 'disabled';
        }
        else if (view === 'month' && haveAgendamento(date)) {
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

    useEffect(() => {
        const extractConfigAndDayHour = async () => {
            let datesExtract: Dates[] = await getDayHour();
            datesExtract = datesExtract.map(date => {
                return sortHoursInDate({day: new Date(date.day), hours: date.hours});
            });
            const config = await extractConfigProfessional();
            let duration = config.duration ? config.duration : ''
            let price = config.price ? config.price : ''
            setFormInputsAgendamentos({precoAgendamento: price, duracaoAgendamento: duration, datasAgendamentos: datesExtract});
        };
        extractConfigAndDayHour();
    }, [reload]);

    // Form Agendamento - Início
    const inputAdicionarAgendamento = useRef<HTMLInputElement>(null);

    const handleConfigAgendamento = (value: string, name: string) => {
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

    const submitConfigAgendamento = async () => {
        try{
            if(!formInputsAgendamentos.precoAgendamento || !formInputsAgendamentos.duracaoAgendamento){
                throw new Error();
            }
            const body = {
                price: formInputsAgendamentos.precoAgendamento ? parseFloat(formInputsAgendamentos.precoAgendamento) : undefined,
                duration: formInputsAgendamentos.duracaoAgendamento ? parseInt(formInputsAgendamentos.duracaoAgendamento) : undefined,
            }
            const responseOk = await updateConfig(body);
            if(responseOk){
                setReload(reload + 1);
                viewMessage(`Parabéns, as suas configurações de agendamentos foram atualizadas!`, 'SUCCESS');
            } else{
                viewMessage(`Ocorreu algum erro no sistema ao atualizar as suas configurações de agendamentos. Por favor, falar com o suporte.`, 'ERROR');
            }
        } catch{
            viewMessage(`As configurações de agendamento não podem ficar vazias!`, 'ERROR');
        }
    }

    const handleAdicionarAgendamento = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value = inputAdicionarAgendamento.current?.value;

        if(dateSelected < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())){
            viewMessage(`Não é possível adicionar um horário em um dia no passado!`, 'ERROR');
        } else if(value){
            const body: Dates = {
                day: dateSelected,
                hours: [value]
            }
            const responseStatus = await createDayHour(body);
            if(responseStatus === 200){
                let dates = addHourToDateArray(formInputsAgendamentos.datasAgendamentos, dateSelected, value);
                dates = dates.map(date => sortHoursInDate(date));
                setFormInputsAgendamentos({...formInputsAgendamentos, datasAgendamentos: dates});
                setReload(reload + 1);
                viewMessage(`Parabéns, o seu agendamento ${formatDate(dateSelected)} ${value} foi cadastrado com sucesso!`, 'SUCCESS');
            } else if(responseStatus === 401) {
                viewMessage(`O agendamento: ${formatDate(dateSelected)} ${value} já existe ou você está tentando adicionar um horário no passado!`, 'ERROR');
            } else{
                viewMessage(`Ocorreu algum erro no sistema ao cadastrar um novo agendamento. Por favor, falar com o suporte.`, 'ERROR');
            }
        } else {
            viewMessage(`O horário não pode ficar vazio!`, 'ERROR');
        }
    }

    const handleDeleteDateHour = async (date: Date, time: string) => {
        const dateFormatted: Dates = {
            day: date,
            hours: [time],
        }
        const responseOk = await deleteDayHour(dateFormatted);
        if(responseOk){
            let dates = removeHourFromDateArray(formInputsAgendamentos.datasAgendamentos, dateSelected, time);
            dates = dates.map(date => sortHoursInDate(date));
            setFormInputsAgendamentos({...formInputsAgendamentos, datasAgendamentos: dates});
            setReload(reload + 1);
            viewMessage(`O seu agendamento foi excluido!`, 'SUCCESS');
        } else {
            viewMessage(`Ocorreu algum erro no sistema ao excluir um novo agendamento. Por favor, falar com o suporte.`, 'ERROR');
        }
    }
    // Form Agendamento - Fim

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
                            <input onInput={(e) => handleConfigAgendamento((e.target as HTMLInputElement).value, 'preco-agendamento')}
                                value={formInputsAgendamentos.precoAgendamento} type="text" name='preco-agendamento' id='preco-agendamento' placeholder='R$ 00.00' />
                        </div>
                        <div>
                            <label htmlFor="duracao-agendamento">
                                Duração do agendamento (minutos):
                            </label>
                            <input onInput={(e) => handleConfigAgendamento((e.target as HTMLInputElement).value, 'duracao-agendamento')}
                                value={formInputsAgendamentos.duracaoAgendamento} type="text" name='duracao-agendamento' id='duracao-agendamento' placeholder='00 minutos' />
                        </div>
                    </div>
                    <button onClick={submitConfigAgendamento} className="button-submit">Salvar</button>

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
                                            return (
                                                <div key={`${horario}-div`}>
                                                    <span key={horario} onClick={() => setHourSelected(horario)} className='horario selecionado'>
                                                        {horario}
                                                    </span>
                                                    <button key={`${horario}-delete`} onClick={e => handleDeleteDateHour(dateSelected, horario)}>Excluir</button>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div key={`${horario}-div`}>
                                                    <span key={horario} onClick={() => setHourSelected(horario)} className='horario'>
                                                        {horario}
                                                    </span>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                            </>
                        }
                        {
                            dateSelected  &&
                            dateSelected >= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) &&
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
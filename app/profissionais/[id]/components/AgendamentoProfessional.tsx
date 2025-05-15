"use client";

import '../styles/agendamentos-professional.scss';
import {useRef, useState, useEffect} from 'react';
import {ProfessionalAnyInterface} from '@dashboard/profissional/interfaces';
import getDayHour from '@dashboard/profissional/functions/getDayHour';
import {CreateSessionRequest, CreateSessionResponse} from '../interfaces';
import createSession from '../functions/createSession';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

import Message from '@app/components/Message';
import {MessageType} from '@app/interfaces';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface Dates {
    day: Date,
    hours: string[]
}

function sortHoursInDate(dates: Dates): Dates {
    // Ordena as horas dentro do objeto Dates
    dates.hours.sort((a, b) => a.localeCompare(b));

    return dates;
}

export default function AgendamentoProfessional(props: {professional: ProfessionalAnyInterface, userIsAuthenticated: string | undefined}){
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

    const router = useRouter();
    const pathname = usePathname();

    const loader = useRef<HTMLSpanElement>(null);
    const buttonAgendamento = useRef<HTMLButtonElement>(null);
        
    const viewLoader = () => {
        buttonAgendamento?.current?.setAttribute('style', 'display: none');
        loader?.current?.setAttribute('style', 'display: inline-block');
    }

    const disableLoader = () => {
        buttonAgendamento?.current?.setAttribute('style', 'display: inline-block');
        loader?.current?.setAttribute('style', 'display: none');
    }
    
    const professional = props.professional?.professionalInfo;
    const configAgendamento = props.professional?.configAgendamentoDTO;

    const dateNow = new Date();
    const [dateSelected, setDateSelected] = useState(dateNow);
    const [hourSelected, setHourSelected] = useState<string | null>();
    const [hoursOfDate, setHoursOfDate] = useState<string[]>([]);
    const [datesAndHoursOfProfessional, setDatesAndHoursOfProfessional] = useState<Dates[]>([]);

    const [reload, setReload] = useState<number>(0);

    const extractConfigAndDayHour = async () => {
        if(professional){
            let datesExtract: Dates[] = await getDayHour(professional.uuid);
            if(datesExtract){
                datesExtract = datesExtract.map(date => {
                    return sortHoursInDate({day: new Date(date.day), hours: date.hours});
                });
                setDatesAndHoursOfProfessional(datesExtract);
            }
        }
    };
    const viewHoursSelected = () => {
        for(let i = 0; i < datesAndHoursOfProfessional.length; i++){
            if(datesAndHoursOfProfessional[i].day.toDateString() === dateSelected.toDateString()){
                setHoursOfDate([...datesAndHoursOfProfessional[i].hours]);
                break;
            }
        }
        setHourSelected(null);
    }
    const removeHoursSelected = () => {
        const newHours = [];
        for(let i = 0; i < hoursOfDate.length; i++){
            if(hoursOfDate[i] !== hourSelected){
                newHours.push(hoursOfDate[i]);
            }
        }
        setHoursOfDate(newHours);
        setHourSelected(null);
    }
    useEffect(() => {
        extractConfigAndDayHour();
    }, []);

    useEffect(() => {
        viewHoursSelected();
    }, [dateSelected]);

    // Função para verificar se um dia tem agendamento
    const haveAgendamento = (dateCalendar: any) => {
        const newDate = new Date();
        const newDateFormatted = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());

        return datesAndHoursOfProfessional
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

    const handleConfirmarAgendamento = async () => {
        viewLoader();
        if(!props?.userIsAuthenticated){
            router.push(`/auth/login?redirect=${pathname}`);
        } else if(professional?.uuid && dateSelected && hourSelected) {
            const body: CreateSessionRequest = {
                idProfessional: professional.uuid,
                day: dateSelected,
                hour: hourSelected,
            }

            const data: CreateSessionResponse = await createSession(body);
            if(data && data.status === 'ERROR'){
                viewMessage(data.message, 'ERROR');
            } else {
                await extractConfigAndDayHour();
                viewMessage(`Parabéns, o seu agendamento ${dateSelected.toLocaleDateString()} às ${hourSelected} foi confirmado com sucesso!`, 'SUCCESS');
                removeHoursSelected();
            }
        } else {
            viewMessage(`Ocorreu algum erro ao realizar o agendamento. Por favor, fale com o suporte.`, 'ERROR');
        }
        disableLoader();
    }

    return (
        <>
            <div className='info-agendamentos'>
                <h2>
                    Agende sua consulta
                </h2>
                <p>
                    Selecione o dia e horário de sua preferência para agendar sua consulta com a Dra. Sofia Mendes.
                </p>
                <Calendar onChange={onChange}
                    value={dateSelected}
                    tileClassName={tileClassName}
                    className='custom-calendar'
                />
                {variableHaveAgendamento && 
                <p>
                    Horários disponíveis para {formatDescriptionOne()}:
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
                
                {dateSelected && 
                hourSelected && 
                <button ref={buttonAgendamento} 
                onClick={handleConfirmarAgendamento}>Confirmar agendamento para {dateSelected.toLocaleDateString()} às {hourSelected}</button> }
                <span ref={loader} className='loader'></span>

            </div>
            {viewMessageConfig.status && <Message message={viewMessageConfig.message} type={viewMessageConfig.type}/>}
        </>
    )
}
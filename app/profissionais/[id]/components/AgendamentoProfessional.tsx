"use client";

import '../styles/agendamentos-professional.scss';
import {useRef, useState, useEffect} from 'react';
import {ProfessionalAnyInterface} from '@dashboard/profissional/interfaces';
import getDayHour from '@dashboard/profissional/functions/getDayHour';

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

export default function AgendamentoProfessional(props: {professional: ProfessionalAnyInterface}){
    const professional = props.professional?.professionalInfo;
    const configAgendamento = props.professional?.configAgendamentoDTO;

    const dateNow = new Date();
    const [dateSelected, setDateSelected] = useState(dateNow);
    const [hourSelected, setHourSelected] = useState<string | null>();
    const [hoursOfDate, setHoursOfDate] = useState<string[]>([]);
    const [datesAndHoursOfProfessional, setDatesAndHoursOfProfessional] = useState<Dates[]>([]);

    useEffect(() => {
        for(let i = 0; i < datesAndHoursOfProfessional.length; i++){
            if(datesAndHoursOfProfessional[i].day.toDateString() === dateSelected.toDateString()){
                setHoursOfDate([...datesAndHoursOfProfessional[i].hours]);
                break;
            }
        }
        setHourSelected(null);
    }, [dateSelected]);

    useEffect(() => {
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
        extractConfigAndDayHour();
    }, []);

    // Função para verificar se um dia tem agendamento
    const haveAgendamento = (dateCalendar: any) => {
        return datesAndHoursOfProfessional.some((date) => date.day.toDateString() === dateCalendar.toDateString());
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

    return (
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
            <button>Confirmar agendamento para {dateSelected.toLocaleDateString()} às {hourSelected}</button> }

        </div>
    )
}
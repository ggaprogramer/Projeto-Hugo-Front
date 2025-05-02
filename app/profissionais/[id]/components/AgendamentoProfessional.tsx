"use client";

import '../styles/agendamentos-professional.scss';
import {useRef, useState, useEffect} from 'react';
import {ProfessionalInfo} from '@dashboard/profissional/interfaces';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface Dates {
    day: Date,
    hours: string[]
}

const dates: Dates[] = [
    { day: new Date(2025, 2, 15), hours: [
        '08:00',
        '09:00',
        '10:00',
        '11:00',
    ]},
    { day: new Date(2025, 2, 16), hours: [
        '08:00',
        '09:00',
        '10:00',
        '11:00',
    ]},
    { day: new Date(2025, 2, 17), hours: [
        '08:00',
        '09:00',
        '10:00',
        '11:00',
    ]},
    { day: new Date(2025, 2, 20), hours: [
        '12:00',
        '13:00',
        '14:00',
        '15:00',
    ]},
    { day: new Date(2025, 2, 22), hours: [
        '16:00',
        '17:00',
        '18:00',
        '19:00',
    ]}
];

export default function AgendamentoProfessional(props: {professional: ProfessionalInfo}){
    const professional = props.professional;

    const dateNow = new Date();
    const [dateSelected, setDateSelected] = useState(dateNow);
    const [hourSelected, setHourSelected] = useState<string | null>();
    const [hoursOfDate, setHoursOfDate] = useState<string[]>([]);

    useEffect(() => {
        for(let i = 0; i < dates.length; i++){
            if(dates[i].day.toDateString() === dateSelected.toDateString()){
                setHoursOfDate([...dates[i].hours]);
                break;
            }
        }
        setHourSelected(null);
    }, [dateSelected]);

    // Função para verificar se um dia tem agendamento
    const haveAgendamento = (dateCalendar: any) => {
        return dates.some((date) => date.day.toDateString() === dateCalendar.toDateString());
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
                Horários disponíveis para {formatDescriptionOne()}
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
import { MessageBox } from '@app/interfaces';
import '../styles/message.scss';
import { FaCheckCircle } from "react-icons/fa";
import { BiSolidError } from "react-icons/bi";
import { MdError } from "react-icons/md";
import {useEffect, useState} from 'react';

export default function Message(props: MessageBox){
    const message = props.message;
    const type = props.type;

    return (
        <>  
            {   
                type === "INFO" &&
                <span className="message info">
                    <BiSolidError/>{message}
                </span>
            }
            {
                type === "SUCCESS" &&
                <span className="message success">
                    <FaCheckCircle/>{message}
                </span>
            }
            {
                type === "ERROR" &&
                <span className="message error">
                    <MdError/>{message}
                </span>
            }
        </>
    )
}
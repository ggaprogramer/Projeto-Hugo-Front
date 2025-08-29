import {ControlSessionFilterProfessional} from '../interfaces';

export default function Pagination(props: {control: ControlSessionFilterProfessional, setControl: Function}) {
    const control = props.control;
    const setControl = props.setControl;

    return (
        <div className='navegacao'>
            {
                control.pageSelected !== 0
                &&
                <>
                    <button onClick={() => setControl({...control, pageSelected: 0})}>&laquo;</button>
                    <button onClick={() => setControl({...control, pageSelected: control.pageSelected - 1})}>&lsaquo;</button>
                </>
            }
            <button className='selected'>{control.pageSelected + 1}</button>
            {
                control.pageSelected + 1 < control.totalPages
                &&
                <>
                    <button onClick={() => setControl({...control, pageSelected: control.pageSelected + 1})}>&rsaquo;</button>
                    <button onClick={() => setControl({...control, pageSelected: control.totalPages - 1})}>&raquo;</button>
                </>
            }
        </div>
    );
}
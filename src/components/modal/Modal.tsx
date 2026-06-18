'use client';
import { useRef } from "react";
import './style/modal.css';

interface Props {
    caption?: string,
    id: string,
    src: string
}

const Modal = ({ caption='', src, id }: Props) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const handleClose = () => {
        if (modalRef.current) {
            modalRef.current.classList.add('hidden');
        }
    };

    return (
        <div id={id} ref={modalRef} className="modal-comp hidden fixed z-10 left-0 top-0 overflow-auto pt-[100px] w-full h-full">
            <span className="close absolute text-white font-bold cursor-pointer no-underline text-4xl top-4 right-9" onClick={handleClose}>&times;</span>
            <img className="modal-content block m-auto w-[90%]" src={`${import.meta.env.BASE_URL}${src}`} alt={caption} />
            <div id="caption" className="text-gray-400 text-center block m-auto w-[80%] pt-2.5">{caption}</div>
        </div>
    );
};

export default Modal;
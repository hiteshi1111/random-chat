import React from 'react'
import { formatTime } from '../utils/formatTime';

const Message = (props) => {
    return (
        props.activity ? (
            <p className='text-center text-[#aaa] text-[12px] py-[10px]'>{props.from?.username} {props.activity}</p>
        ):(
            <div className='text-white text-[14px]'>
                <span className='font-semibold text-[#aaa]'>{props.from?.username}</span>{" "}
                <span className='text-[#aaa]'>({formatTime(props.createdAt, "time")})</span>{": "}
                <div className='pl-[5px]'>~ {props.message}</div>
            </div>
        )
    )
}

export default Message;
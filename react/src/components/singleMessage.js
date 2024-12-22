import React from 'react'
import { formatTimestamp } from '../utils/formatTime';
import Timestamp from './timestamp';

const SingleMessage = ({previousMessage, ...props}) => {
    const isSameDay = (message1, message2) => {
        return formatTimestamp(message1?.createdAt, "day") === formatTimestamp(message2?.createdAt, "day");
    };
    return (
        <>
        {(!isSameDay(props, previousMessage)) && (
            <Timestamp date={props?.createdAt} />
        )}
        {props.activity ? (
            <p className='text-center text-[#aaa] text-[12px] py-[10px]'>{props.from?.username} {props.activity}</p>
        ):(
            <div className='text-white text-[14px] break-all'>
                <span className='font-semibold text-[#aaa]'>{props.from?.username}</span>{" "}
                <span className='text-[#aaa]'>({formatTimestamp(props.createdAt, "time")})</span>{": "}
                <div className='pl-[5px]'>~ {props.message}</div>
            </div>
        )}
        </>
    )
}

export default SingleMessage;
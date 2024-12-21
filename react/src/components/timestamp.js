import React from 'react';
import { formatTimestamp, isToday, isYesterday } from '../utils/formatTime';

const Timestamp = ({date}) => {
    const dateObj = new Date(date);

    let label;
    if (isToday(dateObj)) {
        label = 'Today';
    } else if (isYesterday(dateObj)) {
        label = 'Yesterday';
    } else {
        label = formatTimestamp(date, "day");
    }
    return (
        <div className='w-full text-center relative max-w-[1050px] mx-auto mt-[10px]'>
            <div className='absolute bottom-[12px] w-full text-center border-b -z-10'></div>
            <div><span className='text-[#aaa] text-[12px] rounded-full inline-block px-[10px] bg-black py-[5px]'>{label}</span></div>
        </div>
    )
}

export default Timestamp;
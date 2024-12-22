import React from 'react'
import { useSelector } from 'react-redux';

const Loader = () => {
    const { loading } = useSelector(state => state.ui);
    return (
        <div className={`absolute left-0 top-0 bottom-0 z-[1111] bg-black h-[100vh] w-full flex-col justify-center items-center ${loading ? "flex" : "hidden"}`}>
            <div class="loader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <p className='text-[#aaa] mt-[30px] animate-pulse'>Loading...</p>
        </div>
    )
}

export default Loader;
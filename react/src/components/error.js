import React from 'react';
import { useSelector } from 'react-redux';

const Error = () => {
    const { error } = useSelector(state => state.ui);
    return (
        <div className={`absolute left-0 top-0 bottom-0 z-[1111] bg-black h-[100vh] w-full flex-col justify-center items-center text-white ${error ? "flex" : "hidden"}`}>
            <div id="terminal">
                <code>
                    {'>'} Trying lingo.com ...<br/>
                    {'>'} Connecting to your chat room.<br/>
                    {'>'} GET / http/1.1<br/>
                    {'>'} Host: lingo.com<br/>
                    {'>'} HTTP/1.1 500 Internal Server Error<span className="cursor">_</span>
                    <br/>
                    <br/>
                    Try reloading the page...
                </code>
                <div className="overlay"></div>
            </div>
        </div>
    )
}

export default Error;
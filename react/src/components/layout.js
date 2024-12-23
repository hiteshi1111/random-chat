import React from 'react'
import Loader from './loader';
import Error from './error';

const Layout = ({children, className=""}) => {
    return (
        <div className={`w-full h-[100vh] overflow-hidden`}>
            <div className={`relative max-w-[500px] mx-auto px-[20px] md:px-[30px] h-[100vh] ${className}`}>
                <Loader />
                <Error />
                {children}
            </div>
        </div>
    )
}

export default Layout;
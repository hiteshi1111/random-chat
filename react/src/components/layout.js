import React from 'react'
import Loader from './loader';
import Error from './error';

const Layout = ({children, className="", upperClassName=""}) => {
    return (
        <div className={`w-full ${upperClassName}`}>
            <div className={`relative max-w-[500px] mx-auto px-[20px] md:px-[30px] ${className}`}>
                <Loader />
                <Error />
                {children}
            </div>
        </div>
    )
}

export default Layout;
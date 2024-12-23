import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { checkEmptyFields } from '../utils/validation';
import { PostRequest } from '../utils/request';
import Layout from '../components/layout';
import { uiActions } from '../store/ui-slice';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formInput, setFormInput] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("");

    function loginHandler(){
        dispatch(uiActions.setLoading(true));
        setError("");
        if (checkEmptyFields(formInput)){
            setError("Fields must not be empty!");
            dispatch(uiActions.setLoading(false));
        }else{
            PostRequest(process.env.REACT_APP_ENDPOINT_URL + "account/login", formInput).then(response => {
                localStorage.setItem("xiu", response.data)
                navigate("/chat");
            }).catch(error => {
                console.log("login error >", error);
                setError(error?.data || "Something went wrong!");
                dispatch(uiActions.setLoading(false));
            })
        }
    }

    const handleKeyDown = (event) => {        
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            loginHandler();
        }
    };

    return (
        <Layout className='flex flex-col justify-center items-center'>
            {error && (
                <p className='text-white text-[12px] mb-[5px]'>{error}</p>
            )}
            <input
                placeholder='Username'
                value={formInput.username}
                onChange={(e) => {
                    setFormInput((prevState) => ({...prevState, username: e.target.value}) );
                    setError("");
                }}
                className='border px-[10px]'
                maxLength={20}
                onKeyDown={handleKeyDown}
            />
            <input
                type="password"
                placeholder='Password'
                value={formInput.password}
                onChange={(e) => {
                    setFormInput((prevState) => ({...prevState, password: e.target.value}) );
                    setError("");
                }}
                className='border px-[10px] mt-[10px]'
                maxLength={30}
                onKeyDown={handleKeyDown}
            />
            <button onClick={loginHandler} className='mt-[30px]'>
                Login
            </button>
            <p className='mt-[10px] text-[14px] text-white'>Don't have an account?{" "} 
                <Link 
                    to="/register" 
                    className='hover:underline'
                >Create Account!</Link>
            </p>
        </Layout>
    )
}

export default Home;
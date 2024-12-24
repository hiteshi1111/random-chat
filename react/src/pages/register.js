import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { checkEmptyFields, validateMobile, validatePassword } from '../utils/validation';
import { PostRequest } from '../utils/request';
import Layout from '../components/layout';
import { uiActions } from '../store/ui-slice';
import { useDispatch } from 'react-redux';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formInput, setFormInput] = useState({
        username: "",
        mobile: "",
        password: ""
    })
    const [error, setError] = useState("");

    function registrationHandler(){
        dispatch(uiActions.setLoading(true));
        setError("");
        if (checkEmptyFields(formInput)){
            setError("Fields must not be empty!");
            dispatch(uiActions.setLoading(false));
        }else if(!validateMobile(formInput.mobile)){
            setError("Invalid mobile!");
            dispatch(uiActions.setLoading(false));
        }else if(!validatePassword(formInput.password)){
            setError("Password must contain atleast 8 characters including one letter, one number and one special character!");
            dispatch(uiActions.setLoading(false));
        }else{
            PostRequest(process.env.REACT_APP_ENDPOINT_URL + "account", formInput).then(response => {
                navigate("/")
                dispatch(uiActions.setLoading(false));
            }).catch(error => {
                console.log("register error >", error);
                setError(error?.data || "Something went wrong!");
                dispatch(uiActions.setLoading(false));
            })
        }
    }

    const handleKeyDown = (event) => {        
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            registrationHandler();
        }
    };

    return (
        <Layout className='flex flex-col justify-center items-center'>
            {error && (
                <div className='text-white text-[12px] mb-[5px] text-left w-full'>{error}</div>
            )}
            <input
                placeholder='Username'
                value={formInput.username}
                onChange={(e) => {
                    setFormInput((prevState) => ({...prevState, username: e.target.value}) )
                    setError("")
                }}
                className='border px-[10px]'
                maxLength={20}
                onKeyDown={handleKeyDown}
            />
            <input
                placeholder='Mobile'
                value={formInput.mobile}
                onChange={(e) => {
                    setFormInput((prevState) => ({...prevState, mobile: e.target.value}) )
                    setError("")
                }}
                className='border px-[10px] mt-[10px]'
                maxLength={10}
                onKeyDown={handleKeyDown}
            />
            <input
                type='password'
                placeholder='Password'
                value={formInput.password}
                onChange={(e) => {
                    setFormInput((prevState) => ({...prevState, password: e.target.value}) )
                    setError("")
                }}
                className='border px-[10px] mt-[10px]'
                maxLength={30}
                onKeyDown={handleKeyDown}
            />
            <button onClick={registrationHandler} className='mt-[30px]'>
                Register
            </button>
            <p className='mt-[10px] text-[14px] text-white text-left w-full'>Already have an account?{" "} 
                <Link 
                    to="/" 
                    className='hover:underline'
                >Login!</Link>
            </p>
        </Layout>
    )
}

export default Register;
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { checkEmptyFields, validateMobile, validatePassword, validateUsername } from '../utils/validation';
import { PostRequest } from '../utils/request';

const Register = () => {
    const navigate = useNavigate();
    const [formInput, setFormInput] = useState({
        username: "",
        mobile: "",
        password: ""
    })
    const [error, setError] = useState("");

    function registrationHandler(){
        setError("");
        if (checkEmptyFields(formInput)){
            setError("Fields must not be empty!");
        }else if(!validateUsername(formInput.username)){
            setError("Invalid username!");
        }else if(!validateMobile(formInput.mobile)){
            setError("Invalid mobile!");
        }else if(!validatePassword(formInput.password)){
            setError("Password must contain atleast 8 characters including one letter, one number and one special character!");
        }else{
            PostRequest(process.env.REACT_APP_ENDPOINT_URL + "account", formInput).then(response => {
                navigate("/")
            }).catch(error => {
                console.log("register error >", error);
                setError(error?.data || "Something went wrong!");
            })
        }
    }

    return (
        <div className='w-full'>
            <div className='max-w-[500px] mx-auto px-[10px] md:px-[30px] border py-[30px] my-[60px]'>
                {error && (
                    <p className='text-white text-[12px] mb-[5px]'>{error}</p>
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
                />
                <button onClick={registrationHandler} className='mt-[30px]'>
                    Register
                </button>
                <p className='mt-[10px] text-[12px] text-white'>Already have an account?{" "} 
                    <Link 
                        to="/" 
                        className='hover:underline'
                    >Login!</Link>
                </p>
            </div>
        </div>
    )
}

export default Register;
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { checkEmptyFields } from '../utils/validation';
import { PostRequest } from '../utils/request';
import Layout from '../components/layout';

const Home = () => {
    const navigate = useNavigate();
    const [formInput, setFormInput] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("");

    function loginHandler(){
        setError("");
        if (checkEmptyFields(formInput)){
            setError("Fields must not be empty!");
        }else{
            PostRequest(process.env.REACT_APP_ENDPOINT_URL + "account/login", formInput).then(response => {
                localStorage.setItem("xiu", response.data)
                navigate("/chat")
            }).catch(error => {
                console.log("login error >", error);
                setError(error?.data || "Something went wrong!");
            })
        }
    }

    return (
        <Layout className='md:border py-[60px] my-[60px]'>
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
            />
            <button onClick={loginHandler} className='mt-[30px]'>
                Login
            </button>
            <p className='mt-[10px] text-[12px] text-white'>Don't have an account?{" "} 
                <Link 
                    to="/register" 
                    className='hover:underline'
                >Create Account!</Link>
            </p>
        </Layout>
    )
}

export default Home;
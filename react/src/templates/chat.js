import React, { useEffect, useState } from 'react'
import Message from '../components/message';
import { GetRequest, PostRequest } from '../utils/request';

const Chat = () => {
    const [allMessages, setAllMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");

    const accountId = localStorage.getItem("xiu");

    useEffect(() => {
        if (accountId){
            GetRequest(process.env.REACT_APP_ENDPOINT_URL + "message/" + accountId).then(response => {
                setAllMessages(response.data);
            }).catch(error => {
                console.log("message fetching error >", error);
            })
        }
    },[accountId])

    function sendMessageHandler(){
        PostRequest(process.env.REACT_APP_ENDPOINT_URL + "message/" + accountId, { 
            message: inputMessage
        }).then(response => {
            console.log("sent", response.data)
        }).catch(error => {
            console.log("message sending error >", error);
        })
    }

    return (
        <div className='w-full h-[100vh] overflow-hidden'>
            <div className='relative max-w-[500px] mx-auto border py-[30px] h-[100vh]'>
                <div className='px-[30px] h-[calc(100vh_-_110px)] overflow-hidden overflow-y-auto pb-[10px]'>
                    {allMessages.length > 0 ? (
                        allMessages.map((msg, i) => (
                            <Message {...msg} key={i} />
                        ))
                    ):(
                        <p className='text-center px-[30px] py-[70px] text-[#aaa]'>No Conversation!</p>
                    )}
                </div>
                <div className='absolute bottom-0 left-0 flex w-full p-[15px]'>
                    <input 
                        value={inputMessage}
                        placeholder='Type your message here...'
                        onChange={(e) => setInputMessage(e.target.value)}
                        className='border h-[50px] px-[10px]'
                    />
                    <button 
                        onClick={sendMessageHandler}
                        disabled={inputMessage.length === 0} 
                        className='max-w-[50px] text-[25px]'
                    >{">"}</button>
                </div>
            </div>
        </div>
    )
}

export default Chat;
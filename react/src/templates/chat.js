import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { BiSolidSend } from "react-icons/bi";
import { GetRequest, PostRequest } from '../utils/request';
import { chatActions } from '../store/chat-slice';
import SingleMessage from '../components/singleMessage';
import { uiActions } from '../store/ui-slice';
import Layout from '../components/layout';
import { AiOutlineLogout } from 'react-icons/ai';
import { RiBearSmileFill } from "react-icons/ri";
import EmojiKeypad from '../components/emojiKeypad';

const Chat = () => {
    const inputRef = useRef(null);
    const chatRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { message, allMessages, realTimeMessages } = useSelector(state => state.chat);
    const { emojiKeypad } = useSelector(state => state.ui);
    const accountId = localStorage.getItem("xiu");

    useEffect(() => {
        dispatch(uiActions.setLoading(true));
        if (accountId){
            GetRequest(process.env.REACT_APP_ENDPOINT_URL + "message/" + accountId).then(response => {
                dispatch(chatActions.setAllMessages(response.data));
                dispatch(uiActions.setLoading(false));
            }).catch(error => {
                console.log("message fetching error >", error);
                dispatch(uiActions.setLoading(false));
                dispatch(uiActions.setError(true));
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[accountId])

    function sendMessageHandler(){
        PostRequest(process.env.REACT_APP_ENDPOINT_URL + "message/" + accountId, { 
            message: message?.trim()
        }).then(response => {
            dispatch(chatActions.setMessage(""))
            dispatch(chatActions.setRealTimeMessages([...realTimeMessages, response.data]));
            chatRef.current.scrollIntoView({ behavior: "smooth" });
        }).catch(error => {
            console.log("message sending error >", error);
        })
    }

    const handleKeyDown = (event) => {        
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            sendMessageHandler();
        }
    };

    return (
        <Layout className='!px-0 !md:px-0 py-[30px] border'>
            <AiOutlineLogout
                title="Logout"
                color='#fff' 
                size={20} 
                onClick={() => {
                    localStorage.removeItem("xiu");
                    navigate("/")
                }}
                className='absolute right-[10px] top-[10px] cursor-pointer'
            />
            <div ref={chatRef} className='px-[30px] h-[calc(100vh_-_110px)] overflow-hidden overflow-y-auto pb-[10px]'>
                {allMessages.length > 0 ? (
                    <>
                    {allMessages.map((msg, i) => (
                        <SingleMessage {...msg} key={i} previousMessage={allMessages[i - 1]} />
                    ))}
                    {realTimeMessages.map((msg, i) => (
                        <SingleMessage {...msg} key={i} previousMessage={realTimeMessages[i - 1]} />
                    ))}
                    </>
                ):(
                    <p className='text-center px-[30px] py-[30px] text-[#aaa] h-[70vh] flex flex-col justify-center items-center'>No Conversation!</p>
                )}
            </div>
            <div className='absolute bottom-0 left-0 flex flex-col w-full p-[15px] z-[9999] bg-black'>
                <EmojiKeypad inputTop={inputRef} />
                <div className='flex w-full'>
                    <div className='flex border items-center w-full px-[10px]'>
                        <RiBearSmileFill 
                            title="Emoticon"
                            color='#fff' 
                            size={20}
                            className="cursor-pointer"
                            onClick={() => dispatch(uiActions.setEmojiKeypad(!emojiKeypad))}
                        />
                        <input 
                            ref={inputRef}
                            value={message}
                            placeholder='Type your message here...'
                            onChange={(e) => dispatch(chatActions.setMessage(e.target.value)) }
                            className="border h-[48px] px-[10px] border-none outline-none"
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <button 
                        title="Send"
                        onClick={sendMessageHandler}
                        disabled={message.trim().length === 0} 
                        className='max-w-[50px] flex justify-center items-center'
                    > <BiSolidSend size={25} className='-rotate-90' /> </button>
                </div>
            </div>
        </Layout>
    )
}

export default Chat;
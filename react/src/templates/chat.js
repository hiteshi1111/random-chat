import React, { useEffect } from 'react'
import { GetRequest, PostRequest } from '../utils/request';
import { useDispatch, useSelector } from 'react-redux';
import { chatActions } from '../store/chat-slice';
import SingleMessage from '../components/singleMessage';

const Chat = () => {
    const dispatch = useDispatch();
    const { messageInput, allMessages } = useSelector(state => state.chat)
    const accountId = localStorage.getItem("xiu");

    useEffect(() => {
        if (accountId){
            GetRequest(process.env.REACT_APP_ENDPOINT_URL + "message/" + accountId).then(response => {
                dispatch(chatActions.setAllMessages(response.data));
            }).catch(error => {
                console.log("message fetching error >", error);
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[accountId])

    function sendMessageHandler(){
        PostRequest(process.env.REACT_APP_ENDPOINT_URL + "message/" + accountId, { 
            message: messageInput?.trim()
        }).then(response => {
            console.log("sent", response.data);
        }).catch(error => {
            console.log("message sending error >", error);
        })
    }

    return (
        <div className='w-full h-[100vh] overflow-hidden'>
            <div className='relative max-w-[500px] mx-auto border py-[30px] h-[100vh]'>
                <div className='px-[30px] h-[calc(100vh_-_110px)] overflow-hidden overflow-y-auto pb-[10px]'>
                    {allMessages.length > 0 ? (
                        <>
                        {allMessages.map((msg, i) => (
                            <SingleMessage {...msg} key={i} previousMessage={allMessages[i - 1]} />
                        ))}
                        </>
                    ):(
                        <p className='text-center px-[30px] py-[70px] text-[#aaa]'>No Conversation!</p>
                    )}
                </div>
                <div className='absolute bottom-0 left-0 flex w-full p-[15px]'>
                    <input 
                        value={messageInput}
                        placeholder='Type your message here...'
                        onChange={(e) => dispatch(chatActions.setMessageInput(e.target.value)) }
                        className='border h-[50px] px-[10px]'
                    />
                    <button 
                        onClick={sendMessageHandler}
                        disabled={messageInput.length === 0} 
                        className='max-w-[50px] text-[25px]'
                    >{">"}</button>
                </div>
            </div>
        </div>
    )
}

export default Chat;
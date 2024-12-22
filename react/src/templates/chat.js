import React, { useEffect } from 'react'
import { GetRequest, PostRequest } from '../utils/request';
import { useDispatch, useSelector } from 'react-redux';
import { chatActions } from '../store/chat-slice';
import SingleMessage from '../components/singleMessage';
import { uiActions } from '../store/ui-slice';
import Layout from '../components/layout';

const Chat = () => {
    const dispatch = useDispatch();
    const { messageInput, allMessages } = useSelector(state => state.chat)
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
            message: messageInput?.trim()
        }).then(response => {
            dispatch(chatActions.setMessageInput(""))
            console.log("sent", response.data);
        }).catch(error => {
            console.log("message sending error >", error);
        })
    }

    return (
        <Layout className='!px-0 !md:px-0 py-[30px] h-[100vh] border' upperClassName='h-[100vh] overflow-hidden'>
            <div className='px-[30px] h-[calc(100vh_-_110px)] overflow-hidden overflow-y-auto pb-[10px]'>
                {allMessages.length > 0 ? (
                    <>
                    {allMessages.map((msg, i) => (
                        <SingleMessage {...msg} key={i} previousMessage={allMessages[i - 1]} />
                    ))}
                    </>
                ):(
                    <p className='text-center px-[30px] py-[30px] text-[#aaa] h-[70vh] flex flex-col justify-center items-center'>No Conversation!</p>
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
                    disabled={messageInput.trim().length === 0} 
                    className='max-w-[50px] text-[25px]'
                >{">"}</button>
            </div>
        </Layout>
    )
}

export default Chat;
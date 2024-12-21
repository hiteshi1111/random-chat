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

    console.log("allMessages >", allMessages)

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

const data = [
    {
        id: "123",
        username: "hiteshi1111",
        message: "Hey, how's everyone?",
        createdAt: "2024-12-21T10:00:00Z",
    },
    {
        id: "124",
        username: "czan_user",
        message: "Doing good! How about you, Hiteshi?",
        createdAt: "2024-12-21T10:01:00Z",
    },
    {
        id: "125",
        username: "walking_death",
        message: "Hey folks! What's up?",
        createdAt: "2024-12-21T10:02:00Z",
    },
    {
        id: "123",
        username: "hiteshi1111",
        message: "All good here! Just prepping for the holidays. What about you two?",
        createdAt: "2024-12-21T10:03:00Z",
    },
    {
        id: "124",
        username: "czan_user",
        message: "Same here. Hoping to get some rest this time.",
        createdAt: "2024-12-21T10:04:00Z",
    },
    {
        id: "125",
        username: "walking_death",
        message: "Rest? Nah, I'm planning a trip. Who's joining? 😄",
        createdAt: "2024-12-21T10:05:00Z",
    },
    {
        id: "123",
        username: "hiteshi1111",
        activity: "joined the room",
        createdAt: "2024-12-21T10:06:00Z",
    },
    {
        id: "123",
        username: "hiteshi1111",
        message: "Sounds fun! Where are you planning to go?",
        createdAt: "2024-12-21T10:06:00Z",
    },
    {
        id: "124",
        username: "czan_user",
        message: "Depends on the place. Let’s hear the plan first!",
        createdAt: "2024-12-21T10:07:00Z",
    },
    {
        id: "125",
        username: "walking_death",
        message: "Thinking about a mountain getaway. Fresh air and some peace.",
        createdAt: "2024-12-21T10:08:00Z",
    },
    {
        id: "123",
        username: "hiteshi1111",
        message: "I'm in! Let’s make this happen.",
        createdAt: "2024-12-21T10:09:00Z",
    },
    {
        id: "124",
        username: "czan_user",
        message: "Alright, count me in too. Let’s finalize the details soon.",
        createdAt: "2024-12-21T10:10:00Z",
    },
    {
        id: "123",
        username: "hiteshi1111",
        message: "Hey, how's everyone?",
        createdAt: "2024-12-21T10:00:00Z",
    },
    {
        id: "124",
        username: "czan_user",
        message: "Doing good! How about you, Hiteshi?",
        createdAt: "2024-12-21T10:01:00Z",
    },
    {
        id: "125",
        username: "walking_death",
        message: "Hey folks! What's up?",
        createdAt: "2024-12-21T10:02:00Z",
    },
    {
        id: "123",
        username: "hiteshi1111",
        message: "All good here! Just prepping for the holidays. What about you two?",
        createdAt: "2024-12-21T10:03:00Z",
    },
    {
        id: "124",
        username: "czan_user",
        message: "Same here. Hoping to get some rest this time.",
        createdAt: "2024-12-21T10:04:00Z",
    },
    {
        id: "125",
        username: "walking_death",
        message: "Rest? Nah, I'm planning a trip. Who's joining? 😄",
        createdAt: "2024-12-21T10:05:00Z",
    },
    {
        id: "123",
        username: "hiteshi1111",
        message: "Sounds fun! Where are you planning to go?",
        createdAt: "2024-12-21T10:06:00Z",
    },
    {
        id: "124",
        username: "bubu69",
        activity: "left the room",
        createdAt: "2024-12-21T10:07:00Z",
    },
    {
        id: "124",
        username: "czan_user",
        message: "Depends on the place. Let’s hear the plan first!",
        createdAt: "2024-12-21T10:07:00Z",
    },
    {
        id: "125",
        username: "walking_death",
        message: "Thinking about a mountain getaway. Fresh air and some peace.",
        createdAt: "2024-12-21T10:08:00Z",
    },
    {
        id: "123",
        username: "hiteshi1111",
        message: "I'm in! Let’s make this happen.",
        createdAt: "2024-12-21T10:09:00Z",
    },
    {
        id: "124",
        username: "czan_user",
        message: "Alright, count me in too. Let’s finalize the details soon.",
        createdAt: "2024-12-21T10:10:00Z",
    }
];

export default Chat;
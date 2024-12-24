import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IoClose } from "react-icons/io5";
import { uiActions } from '../store/ui-slice';
import { chatActions } from '../store/chat-slice';
import { PostRequest } from '../utils/request';

const EmojiKeypad = () => {
    const dispatch = useDispatch();
    const { emojiKeypad } = useSelector(state => state.ui);
    const { realTimeMessages } = useSelector(state => state.chat);
    const accountId = localStorage.getItem("xiu");

    function sendMessageHandler(emoji){
        PostRequest(process.env.REACT_APP_ENDPOINT_URL + "message/" + accountId, { 
            message: emoji
        }).then(response => {
            dispatch(chatActions.setMessage(""))
            dispatch(chatActions.setRealTimeMessages([...realTimeMessages, response.data]));
        }).catch(error => {
            console.log("message sending error >", error);
        })
    }

    return (
        <div
            className={`absolute bottom-[62px] left-[15px] w-full max-w-[468px] h-[300px] bg-black border ${emojiKeypad ? "block" : "hidden"}`}
        >
            <div className='flex justify-end p-[5px]'>
                <IoClose 
                    size={20} 
                    color='#fff' 
                    className='cursor-pointer' 
                    onClick={() => dispatch(uiActions.setEmojiKeypad(false))}
                />
            </div>
            <div className='px-[10px] py-[5px] grid grid-cols-2 gap-[10px] overflow-hidden overflow-y-auto h-[260px]'>
                {emojiData.map((emoji, i) => (
                    <button 
                        key={i} 
                        className='text-[18px] md:text-[20px] text-white border px-[10px] py-[5px] bg-transparent'
                        onClick={() => {
                            sendMessageHandler(emoji);
                            dispatch(uiActions.setEmojiKeypad(false));
                        }}
                    >{emoji}</button>
                ))}
            </div>
        </div>
    )
}

const emojiData = [
    "⋆. 𐙚 ˚",
    "≽^• ˕ • ྀི≼",
    "⋆˚✿˖°",
    "(˶˃⤙˂˶)",
    "𖹭",
    "❀",
    "(*ᴗ͈ˬᴗ͈)ꕤ*.ﾟ",
    "⋆.˚✮🎧✮˚.⋆",
    "⋆.˚🦋༘⋆",
    "★",
    "𝄞⨾𓍢ִ໋",
    "ʚɞ",
    "໒꒰ྀིᵔ ᵕ ᵔ ꒱ྀི১",
    "──── ୨୧ ────",
    "☕︎",
    "( ꩜ ᯅ ꩜;)⁭ ⁭",
    "≽^•⩊•^≼",
    "(˵ •̀ ᴗ - ˵ ) ✧",
    "ᶠᶸᶜᵏᵧₒᵤ!",
    "(˚ ˃̣̣̥⌓˂̣̣̥ )",
    "─── ⋆⋅☆⋅⋆ ──",
    "𓍯𓂃𓏧♡",
    "▶︎ •၊၊||၊|။|||| |",
    "꒷꒦︶꒷꒦︶ ๋ ࣭ ⭑꒷꒦",
    "⎛⎝ ≽  >  ⩊   < ≼ ⎠⎞",
    "⊹ ࣪ ﹏𓊝﹏𓂁﹏⊹ ࣪ ˖",
    "▄︻デ══━一💥",
    "⋆❅*𖢔𐂂꙳",
    "𝗜'𝗺 𝗷𝘂𝘀𝘁 𝗮 𝗴𝗶𝗿𝗹 🎀ྀི",
    "⋆༺𓆩☠︎︎𓆪༻⋆",
    "🃜 🃚 🃖 🃁 🂭 🂺",
    "( ｡ •̀ ᴖ •́ ｡)",
    "♡⸝⸝",
    "♛",
    "𖤐",
    "𝄞",
    "˗ˏˋ ★ ˎˊ˗",
    "( •̯́ ₃ •̯̀)",
    "-ˋˏ ༻❁✿❀༺ ˎˊ-",
    "ദ്ദി ༎ຶ‿༎ຶ )",
    "<(˶ᵔᵕᵔ˶)>",
    "I know your 𝑔𝑎𝑦~",
    "(╥‸╥)",
    "⋆꙳•̩̩͙❅*̩̩͙‧͙ ‧͙*̩̩͙❆ ͙͛ ˚₊⋆",
    "( ◡̀_◡́)ᕤ",
    "°❀⋆.ೃ࿔*:･°❀⋆.ೃ࿔*:･",
    "ฅ^•ﻌ•^ฅ",
    "╭∩╮( •̀_•́ )╭∩╮",
    "⪩. .⪨",
    "꧁ᬊᬁ𝕽𝖔𝖘𝖊ᬊ᭄꧂",
    "𓌉◯𓇋",
    "(˶ ˘ ³˘)ˆᵕ ˆ˶)",
    "▬▬ι═══════ﺤ",
    "✧˖°. 사랑 𝜗𝜚 ‧₊˚ ⊹",
    "愛"
]

export default EmojiKeypad;
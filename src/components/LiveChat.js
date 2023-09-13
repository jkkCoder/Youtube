import React, { useEffect } from 'react'
import ChatMessage from './ChatMessage'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../utils/chatSlice'
import { generateRandomComment } from '../utils/constants'

const LiveChat = () => {
  const dispatch = useDispatch()

  const chatMsg = useSelector(state => state.chat.messages)
  console.log("chat message is ", ChatMessage)

  useEffect(() => {
    const i = setInterval(() => {
        //polling{ assume this comment as fake api call and dispatching it}

        const messageObj = generateRandomComment()
        dispatch(addMessage(messageObj))
    },1000)

    return() => {
        clearInterval(i)
    }
  },[])
  return (
    <div className='overflow-y-scroll ml-2 h-[550px] w-full bg-gray-100 rounded-lg p-2 border border-black flex flex-col-reverse'>
        {
            chatMsg.map((c) => (
                <ChatMessage name={c.name} message={c.message} />
            ))
        }
    </div>
  )
}

export default LiveChat
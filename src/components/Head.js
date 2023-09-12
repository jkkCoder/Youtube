import React from 'react'
import {HAMBURGER_MENU, USER_ICON, YOUTUBE_LOGO} from "../utils/constants"
import { useDispatch } from 'react-redux'
import { toggleMenu } from '../utils/appSlice'

const Head = () => {
  const dispatch = useDispatch()
  const toggleMenuHandler = () => {
    dispatch(toggleMenu())
  }
  return (
    <div className='grid grid-flow-col p-5 mb-5 shadow-lg'>
        <div className='flex col-span-1'>
            <img onClick={() => toggleMenuHandler()} className='h-8 cursor-pointer' alt="hamburger" src={HAMBURGER_MENU} />
            <a href='/'><img className='h-8 mx-2' alt="youtube logo" src={YOUTUBE_LOGO} /></a>
        </div>
        <div className='col-span-10 text-center px-20'>
            <input className='w-1/2 border border-gray-400 p-2 rounded-l-full' type="text" />
            <button className='border border-gray-400 py-2 px-5 bg-gray-100 rounded-r-full'>🔍</button>
        </div>
        <div className='col-span-1'>
            <img className='h-8' alt="user" src={USER_ICON} />
        </div>
    </div>
  )
}

export default Head
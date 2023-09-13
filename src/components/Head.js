import React, { useEffect, useState } from 'react'
import {HAMBURGER_MENU, USER_ICON, YOUTUBE_LOGO, YOUTUBE_SEARCH_RECOMMENDATION_API} from "../utils/constants"
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../utils/appSlice'
import { cacheResults } from '../utils/searchSlice'
import { Link, useNavigate } from 'react-router-dom'

const Head = () => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState("")
  const [suggestion, setSuggestion] = useState([])
  const [showSuggestion , setShowSuggestion ] = useState(false)
  const navigate = useNavigate()

  const searchCache = useSelector(state => state.search)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if(searchCache[search]){
        setSuggestion(searchCache[search])
        return;
      }
      getSearchSuggestions()
    },200)

    return () => {
      clearTimeout(timer)
    }
  },[search])

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_RECOMMENDATION_API + search)
    const json = await data.json()

    setSuggestion(json[1])

    //update cache
    dispatch(cacheResults({[search] : json[1]}))
  }

  const toggleMenuHandler = () => {
    dispatch(toggleMenu())
  }

  const routeToSearch = (query) => {
    navigate('/search?query='+query)
  }

  return (
    <div className='grid grid-flow-col p-5 mb-5 shadow-lg'>
        <div className='flex col-span-1'>
            <img onClick={() => toggleMenuHandler()} className='h-8 cursor-pointer' alt="hamburger" src={HAMBURGER_MENU} />
            <Link to='/'><img className='h-8 mx-2' alt="youtube logo" src={YOUTUBE_LOGO} /></Link>
        </div>
        <div className='col-span-10 px-10'>
            <div>
              <input 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                className='w-1/2 border border-gray-400 px-5 p-2 rounded-l-full' 
                type="text" 
                onFocus={() => setShowSuggestion(true)}
                onBlur={() => setShowSuggestion(false)}
              />
              <button onClick={() => routeToSearch(search)} className='border border-gray-400 py-2 px-5 bg-gray-100 rounded-r-full'>🔍</button>
            </div>
            {
              suggestion.length >0 && showSuggestion  && (
                <div className='absolute bg-white py-2 px-5 w-[34rem] shadow-lg rounded-lg border border-gray-50'>
                  <ul>
                    {
                      suggestion.map(s => <li onMouseDown={() => routeToSearch(s)} key={s}  className='cursor-pointer py-2 px-3 shadow-sm hover:bg-gray-100'>{'🔍 '+s}</li>)
                    }
                  </ul>
                </div>
              )
            }
        </div>
        <div className='col-span-1'>
            <img className='h-8' alt="user" src={USER_ICON} />
        </div>
    </div>
  )
}

export default Head
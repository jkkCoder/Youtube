import React, { useEffect, useState } from 'react'
import { YOUTUBE_VIDEOS_API } from '../utils/constants'
import VideoCards from './VideoCards'
import { Link } from 'react-router-dom'

const VideoContainer = () => {
  const [videos, setvideos] = useState([])
  useEffect(() => {
    getVideos()
  },[])

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEOS_API)
    const json = await data.json()
    setvideos(json.items)
  }

  return (
    <div className='flex flex-wrap'>
      {
        videos.map(video => <Link key={video.id}  to={"/watch?v="+video.id} ><VideoCards info={video} /></Link>)
      }
    </div>
  )
}

export default VideoContainer
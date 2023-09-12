import React, { useEffect, useState } from 'react'
import { YOUTUBE_VIDEOS_API } from '../utils/constants'
import VideoCards from './VideoCards'

const VideoContainer = () => {
  const [videos, setvideos] = useState([])
  useEffect(() => {
    getVideos()
  },[])

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEOS_API)
    const json = await data.json()
    console.log("json is ", json)
    setvideos(json.items)
  }

  console.log("videos is " ,videos)
  return (
    <div className='flex flex-wrap'>
      {
        videos.map(video => <VideoCards key={video.id} info={video} />)
      }
    </div>
  )
}

export default VideoContainer
import React from 'react'

const VideoCards = ({info}) => {
    console.log("info is ", info)
  const {snippet, statistics} = info;
  const {channelTitle, title, thumbnails} = snippet;
  return (
    <div className='p-2 m-2 w-64 shadow-lg'>
        <img alt="thumbnail" className="rounded-lg" src={thumbnails.high.url} />
        <ul>
            <li className='font-bold py-2'>{title}</li>
            <li>{channelTitle}</li>
            <li>{statistics.viewCount} views</li>
        </ul>
    </div>
  )
}

export default VideoCards
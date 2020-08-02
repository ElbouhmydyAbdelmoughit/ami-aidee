import React from 'react'
import VideoCallPage from '../../components/VideoCallPage'

const VideoCallScreen = ({ auxiliary, startMode = 'video' }) => {
  return <VideoCallPage auxiliary={auxiliary} startMode={startMode} />
}

export default VideoCallScreen

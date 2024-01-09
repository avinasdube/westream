import React, { useEffect, useState } from 'react';
import './ViewBar.scss';
import MoreVideos from '../MoreVideos/MoreVideos';
import { API_BASE_URL, getVideos } from '../../api/api';
import { API_ENDPOINTS } from '../../utils/constants';

const ViewBar = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState();

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await getVideos();
      setVideos(response.data)
    }
    fetchVideos();
  }, [])

  return (
    <div className="viewbarContainer">
      {currentVideo && <>
        <div className="videoPlayer">
          <video controls src={`${API_BASE_URL}${API_ENDPOINTS.uploadPath}/${currentVideo.videoFilePath}`} />
        </div>
        <div className="videoTitle">{currentVideo.title}</div>
        <div className="videoDescrip">{currentVideo.description}</div>
      </>}
      <MoreVideos videos={videos} currentVideo={currentVideo} setCurrentVideo={setCurrentVideo} />
    </div>
  )
}

export default ViewBar;
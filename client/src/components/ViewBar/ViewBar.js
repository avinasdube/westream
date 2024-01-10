import React, { useEffect, useRef, useState } from 'react';
import './ViewBar.scss';
import dots from '../../assets/icons/dots.png';
import MoreVideos from '../MoreVideos/MoreVideos';
import { API_BASE_URL, deleteVideo, getVideos } from '../../api/api';
import { API_ENDPOINTS } from '../../utils/constants';

const ViewBar = () => {
  // defining various states
  const [delOpen, setDelOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentSubtitle, setCurrentSubtitle] = useState(null);
  const videoRef = useRef(null);

  // fetching and setting videos on component mount
  useEffect(() => {
    // a function to fetch videos from database using api
    const fetchVideos = async () => {
      const response = await getVideos();
      setVideos(response.data);
    };
    fetchVideos();
  }, []);

  // a function to parse timestamp string to seconds
  const parseTimestamp = (timestamp) => {
    const [hours, minutes, seconds] = timestamp.split(':');
    return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
  };

  const handleTimeUpdate = () => {
    // setting playedSeconds of currently playing video using useRef
    const playedSeconds = videoRef.current.currentTime;

    // finding subtitle that matches the current video time
    const newSubtitle = currentVideo?.subtitles.find(
      (subtitle) =>
        playedSeconds >= parseTimestamp(subtitle.timestamp) &&
        playedSeconds <= parseTimestamp(subtitle.timestamp) + 3 // display subs for 3 seconds
    );

    // updating the current subtitle if newSubtitle is not same
    if (newSubtitle !== currentSubtitle) {
      setCurrentSubtitle(newSubtitle);
    }
  }

  // function to handle delete dropdown
  const handleDelDropdown = () => {
    delOpen === false ? setDelOpen(true) : setDelOpen(false);
  }

  // function to handle video deletion
  const handleDelete = async () => {
    const vid = currentVideo._id;
    try {
      await deleteVideo(vid)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="viewbarContainer">
      {currentVideo && (
        <>
          <div className="videoPlayer">
            <video
              ref={videoRef}
              src={`${API_BASE_URL}${API_ENDPOINTS.uploadPath}/${currentVideo.videoFilePath}`}
              onTimeUpdate={handleTimeUpdate}
              controls
            />
            {currentSubtitle && <p className="subtt">{currentSubtitle.text}</p>}
          </div>
          <div className="titleMain">
            <div className="videoTitle">{currentVideo.title}</div>
            <img className="optionIcon" src={dots} alt='' onClick={handleDelDropdown}></img>
            <div className={`delDrop ${delOpen === true ? 'active' : ''}`}>
              <div className="delBtn" onClick={handleDelete}>Delete</div>
            </div>
          </div>
          <div className="videoDescrip">{currentVideo.description}</div>
        </>
      )}
      <MoreVideos
        videos={videos}
        currentVideo={currentVideo}
        setCurrentVideo={setCurrentVideo}
      />
    </div>
  );
};

export default ViewBar;

import React, { useEffect, useRef, useState } from 'react';
import './ViewBar.scss';
import dots from '../../assets/icons/dots.png';
import MoreVideos from '../MoreVideos/MoreVideos';
import { API_BASE_URL, deleteVideo, getSubtitles, getVideos } from '../../api/api';
import { API_ENDPOINTS } from '../../utils/constants';
import { parseTimestamp, parseVTTContent } from '../../utils/utilityFunctions';

const ViewBar = () => {

  // setting necessary states
  const [delOpen, setDelOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentSubtitle, setCurrentSubtitle] = useState(null);
  const [parsedSubtitle, setParsedSubtitle] = useState(null);

  // defining videoRef
  const videoRef = useRef(null);

  // fetching videos and subtitle on component mount
  useEffect(() => {

    // api call to fetch video details
    const fetchVideos = async () => {
      const response = await getVideos();
      setVideos(response.data);
    };

    // api call to fetch vtt subtitle file of current video
    const fetchSubtitles = async () => {
      if (currentVideo) {
        const vid = currentVideo._id;
        const gotSubt = await getSubtitles(vid);
        const vttContent = gotSubt.data;

        // parsing vttContent and setting parsedSubtitle
        const parsedVTTContent = parseVTTContent(vttContent);
        setParsedSubtitle(parsedVTTContent)
      }
    };

    fetchVideos();
    fetchSubtitles();
  }, [currentVideo]); // update subtitles when the currentVideo changes

  // function to handle time update and subtitles (video progress with subtitles)
  const handleTimeUpdate = () => {
    // getting playedSeconds of currently playing video using useRef
    const playedSeconds = videoRef.current.currentTime;

    // finding subtitle that matches the current playedSecond
    const newSubtitle = parsedSubtitle?.find(
      (subtitle) =>
        playedSeconds >= parseTimestamp(subtitle.timestamp) &&
        playedSeconds <= parseTimestamp(subtitle.timestamp) + 3
    );

    // updating the current subtitle if newSubtitle is not same
    if (newSubtitle !== currentSubtitle) {
      setCurrentSubtitle(newSubtitle);
    }
  };

  // function to handle delete dropdown
  const handleDelDropdown = () => {
    setDelOpen((prevOpen) => !prevOpen);
  };

  // function to handle video deletion
  const handleDelete = async () => {
    const vid = currentVideo._id;
    try {
      await deleteVideo(vid);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

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
            <img
              className="optionIcon"
              src={dots}
              alt=""
              onClick={handleDelDropdown}
            ></img>
            <div className={`delDrop ${delOpen === true ? 'active' : ''}`}>
              <div className="delBtn" onClick={handleDelete}>
                Delete
              </div>
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

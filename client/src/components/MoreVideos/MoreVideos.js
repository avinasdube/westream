import React from 'react';
import './MoreVideos.scss';

import { API_BASE_URL } from '../../api/api';
import { API_ENDPOINTS } from '../../utils/constants';

const MoreVideos = ({ videos, setCurrentVideo, currentVideo }) => {
    // filtering out currently playing video from list if video is being played
    const allVideos = currentVideo ? videos.filter((video) => video.title !== currentVideo.title) : videos

    return (
        <div className="moreVideosContainer">
            {currentVideo && <div id="h1">More Videos</div>}
            <div className="videosList">
                {allVideos && allVideos.map((video, index) => (
                    <div className="videoPlayer" onClick={() => setCurrentVideo(video)} key={index}>
                        <video src={`${API_BASE_URL}${API_ENDPOINTS.uploadPath}/${video.videoFilePath}`} className="video" />
                        <div>{video.title}</div>
                    </div>))}
            </div>
        </div>
    )
}

export default MoreVideos
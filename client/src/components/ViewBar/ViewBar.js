import React from 'react';
import './ViewBar.scss';

import cottonbro from '../../assets/videos/production-720p.mp4';

const ViewBar = () => {
  return (
    <div className="viewbarContainer">
      <div className="videoPlayer">
          <video controls src={cottonbro} />
      </div>
      <div className="videoTitle">Girls showing martial arts in a cave</div>
      <div className="videoDescrip">Two girls in a primal costume showing off martial art with fire in a cave.</div>
    </div>
  )
}

export default ViewBar;
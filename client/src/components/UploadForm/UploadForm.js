import React from 'react';
import './UploadForm.scss';
import uploadVideo from '../../assets/icons/upload.png';

const UploadForm = () => {
    return (
        <div className="uploadFormContainer">
            <div className="formHeading">
                <div className="blurBg">
                    <div id="h1">Hello, User !</div>
                    <div id="h2">Start by uploading a new video.</div>
                </div>
            </div>

            <form>
                {/*Video file input */}
                <div id="h1">Select your video file</div>
                <input id="upldvd" type="file" accept="video/*" hidden />
                <label className="uploadBox" htmlFor="upldvd"><img className="formUploadIcon" src={uploadVideo} alt=''></img></label>

                {/*Video title input */}
                <div id="h1">Enter video title</div>
                <input type='text' placeholder='Enter your video title here'></input>

                {/*Video description input */}
                <div id="h1">Enter video description</div>
                <input type='text' placeholder='Enter your video description here'></input>

                {/*Video subtitle input */}
                <div id="h1">Write your subtitles here</div>
                <textarea className="inputSubs" placeholder="Enter your subtitles here" rows={10} />
                <button type='submit'>Upload</button>
            </form>
        </div>
    )
}

export default UploadForm
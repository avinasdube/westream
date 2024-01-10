import React, { useState } from 'react';
import './UploadForm.scss';
import uploadVideo from '../../assets/icons/upload.png';
import cancel from '../../assets/icons/cancel.png';
import info from '../../assets/icons/info.png';
import { uploadnew } from '../../api/api';

const UploadForm = ({ setPage }) => {
    // defining states to handle form data change
    const [currentVidSrc, setCurrentVidSrc] = useState(null)
    const [videoFile, setVideoFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    // function to handle change in file input
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const videoSrc = URL.createObjectURL(file);
            setCurrentVidSrc(videoSrc)
            setVideoFile(file)
        }
    }

    const handleInfoToggle = () => {
        isOpen === false ? setIsOpen(true) : setIsOpen(false)
    }

    // function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent default reload

        if (!title || !description || !subtitle || !videoFile) {
            alert('All fields are required to fill')
            return;
        }

        // splitting the input into lines and then extracting timestamps and texts from them
        const subtitleLines = subtitle.split('\n');
        const subtitles = subtitleLines.map((line) => {
            const [timestamp, ...textParts] = line.split(' ');
            const text = textParts.join(' ');
            return { timestamp, text };
        });

        try {
            // creating a formData object to append form data
            const formData = new FormData();

            formData.append("title", title)
            formData.append("description", description)
            formData.append("subtitles", JSON.stringify(subtitles))
            formData.append('videoFile', videoFile)

            // sending the form data to the server using api
            await uploadnew(formData);

            // clearing the form                                                                                                                                                                                                                                                                                                                                                                                                           setVideoFile(null);
            setTitle('');
            setDescription('');
            setSubtitle('');
            setVideoFile(null)

            setPage('view')
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div className="uploadFormContainer">
            <div className="formHeading">
                <div className="blurBg">
                    <div id="h1">Hello, User !</div>
                    <div id="h2">Start by uploading a new video.</div>
                </div>
            </div>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/*Video file input */}

                <div className="headingBar">
                    <div id="h1">{currentVidSrc ? 'Selected Video File' : 'Select your video file'}</div>
                    {currentVidSrc && <img className="menuIcon" src={cancel} alt='' onClick={() => setCurrentVidSrc(null)}></img>}
                </div>
                {!currentVidSrc && <>
                    <input
                        id="upldvd"
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        hidden >
                    </input>
                    <label
                        className="uploadBox"
                        htmlFor="upldvd">
                        <img
                            className="formUploadIcon"
                            src={uploadVideo}
                            alt=''>
                        </img>
                    </label>
                </>}
                {currentVidSrc &&
                    <>
                        <video src={currentVidSrc} style={{ borderRadius: '8px' }} />
                        <p style={{ marginTop: '0' }}>{videoFile.name}</p>
                    </>}

                {/*Video title input */}

                <div id="h1">Enter video title</div>
                <input
                    type='text'
                    placeholder='Enter your video title here'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}>
                </input>

                {/*Video description input */}

                <div id="h1">Enter video description</div>
                <input
                    type='text'
                    placeholder='Enter your video description here'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}>
                </input>

                {/*Video subtitle input */}

                <div className="headingBar">
                    <div id="h1">Enter your subtitles here</div>
                    <img className="menuIcon" src={info} alt='' onClick={handleInfoToggle}></img>
                    <div className={`infoBox ${isOpen === true ? 'active' : ''}`}>
                        <div className='infoHeading'>Write subtitles in this format :</div>
                        <p>
                            00:00:01 Ram-Ram bhai sareya ne ! <br></br>
                            00:00:03 Aaj hai mere coding ka 3sra din. <br></br>
                            00:00:04 Subah maine kiya 3 ghante debugging.
                        </p>
                    </div>
                </div>
                <textarea
                    className="inputSubs"
                    placeholder="00:00:00 This is the first line of subtitle"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    rows={10} />

                <button type='submit'>Upload</button>
            </form>
        </div>
    )
}

export default UploadForm;
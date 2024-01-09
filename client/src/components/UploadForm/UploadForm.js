import React, { useState } from 'react';
import './UploadForm.scss';
import uploadVideo from '../../assets/icons/upload.png';
import { uploadnew } from '../../api/api';

const UploadForm = ({ setPage }) => {
    // defining states to handle form data change
    const [videoFile, setVideoFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [subtitle, setSubtitle] = useState('');

    // function to handle change in file input
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setVideoFile(file)
    }

    // function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent default reload

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

                <div id="h1">Select your video file</div>
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

                <div id="h1">Enter your subtitles here (Timestamp Text)</div>
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
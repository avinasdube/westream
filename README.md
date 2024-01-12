# WESTREAM

Westream is a fully-responsive web application based on MERN stack which allows a user to upload videos with subtitles and then play those videos with subtitles synced. It is a production level application which covers all the major concepts of developing a full-stack MERN application.

## Major Features

1. Upload a video
2. Upload subtitles along with video.
3. Play a video
4. Delete a video

Note : When a user uploads a video, this application creates a VTT file on server and also stores the video file on server, pushing only file name to database. And, when user plays a video, it loads the subtitles of that particular video and synchronizes it with the video.

## Directory Structure

- `client`: Contains the React.js frontend code.
- `server`: Includes the Node.js and Express.js backend code.
- `package.json`: Global configuration and scripts for the entire project.

## Client

Client directory contains all the source code for frontend.

### Installation

```bash
# From the root directory
cd client
npm install
```

## Server

Server directory contains all the source code for backend.

### Installation

```bash
# From the root directory
cd server
npm install
```

Note : You can also run scripts directory from the root directory. Check 'package.json' in root directory.

## Configuration

Check `.env.example` file in both `Client` and `Server` directories to set up Necessary Environment Variables.

## Tech Stack

This application is developed using MERN stack :

1. MongoDB
2. Express.js
3. Reactjs
4. Node.js

## Dependencies

### Additional dependencies used - Client

1. SASS
2. Axios

### Additional dependencies used - Server

1. CORS
2. DOTENV
3. Express
4. Mongoose
5. Multer
6. Nodemon

## Icons

Icons used in this app are sourced from [icons8](https://icons8.com)

## Stock Videos

Stock videos uploaded as default are sourced from [Youtube](https://youtube.com) and [Pexels](https://pexels.com)

## Deployed On

Both Frontend and Backend of this application is deployed on [Render](https://render.com)

Developed and Designed By - [Avinash Dubey](https://github.com/avinasdube/)

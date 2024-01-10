import { multerUpload } from "../middlewares/multerMiddleware.js"
import { Video } from "../models/videoModel.js";

// function to control the video upload
export const uploadNewVideo = async (req, res) => {
  try {
    // using multerUpload function from multerMidddleware
    multerUpload(req, res, async (err) => {

      if (err) {
        console.error(err);
        return res.status(500).send('Error uploading files');
      }

      // setting video details
      const { title, description } = req.body;
      const subtitles = JSON.parse(req.body.subtitles || '[]');
      const videoFilePath = req.file.originalname;

      // creating new video object with above details using video model
      const newVideo = new Video({
        title,
        description,
        subtitles,
        videoFilePath,
      })

      // saving newWideo to database
      await newVideo.save();

      res.status(201).json({ message: "Video Uploaded" })

    })
  } catch (error) {
    console.log(error);
  }
}

// function to fetch all videos
export const getAllVideos = async (req, res) => {
  try {
    // fetching all videos from videos document
    const AllVideos = await Video.find();
    res.status(200).json(AllVideos)
  } catch (error) {
    console.log(error)
  }
}

// function to delete a selected video
export const deleteThisVideo = async (req, res) => {
  try {
    const deleteID = req.params.vid;
    const deleted = await Video.deleteOne({ _id: deleteID });
    res.status(201).json({ message: "Deleted", deleted })
  } catch (error) {
    console.log(error);
  }
}
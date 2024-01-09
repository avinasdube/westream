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

      const { title, description } = req.body;
      const subtitles = JSON.parse(req.body.subtitles || '[]');
      const videoFilePath = req.file.originalname;

      const newVideo = new Video({
        title,
        description,
        subtitles,
        videoFilePath,
      })

      await newVideo.save();

      res.status(201).json({message: "Video Uploaded"})

    })
  } catch (error) {
    console.log(error);
  }
}

export const getAllVideos = async (req, res)=>{
  try{
    const AllVideos = await Video.find();
    res.status(200).json(AllVideos)
  }catch(error){
    console.log(error)
  }
} 
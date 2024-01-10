import express from "express";
import { uploadNewVideo, getAllVideos, deleteThisVideo } from "../controllers/videoControl.js";

// creating an express router
const router = express.Router();

// setting up router path
router.post("/uploadvideo", uploadNewVideo);
router.get("/getvideos", getAllVideos)
router.delete("/deletevideo/:vid", deleteThisVideo)

// exporting router
export default router;
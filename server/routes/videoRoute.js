import express from "express";
import { uploadNewVideo, getAllVideos } from "../controllers/videoControl.js";

// creating an express router
const router = express.Router();

// setting up router path
router.post("/uploadvideo", uploadNewVideo);
router.get("/getvideos", getAllVideos)

// exporting router
export default router;
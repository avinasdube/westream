import mongoose from "mongoose";

// creating a subtitles schema
const subtitleSchema = new mongoose.Schema({
    timestamp: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
})

// creating a video schema
const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    subtitles: [subtitleSchema], // using subtitles schema
    videoFilePath: {
        type: String,
        required: true
    },
}, { timestamps: true })

// creating and exporting Video model 
export const Video = mongoose.model("Video", videoSchema);
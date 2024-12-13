import mongoose from "mongoose";





const youtubeVideos_Schema = new mongoose.Schema({
    videoId: { 
        type: String, 
        required: true, 
        // unique: true
    },
    title: {
         type: String, 
         required: true
    },
    description: {
         type: String
    },
    likes: { 
        type: Number, 
        default: 0 
    },
    views: { 
        type: Number, 
        default: 0
    },
    comments: { 
        type: Number, 
        default: 0
    },
});


const Video = mongoose.model("Video", youtubeVideos_Schema);

export default Video;
import express from "express";
import axios from "axios";
import Video from "../models/youtubeSchema.js";
const router = express.Router();

const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';




//      This is the logic for the fetching videos based on a search query 
router.get('/videos', async (req, res) => {
    const { query } = req.query; // Search query
    try {
        const response = await axios.get(`${YOUTUBE_API_BASE_URL}/search`, {
            params: {
                part: 'snippet',
                q: query,
                maxResults: 5,
                type: 'video',
                key: process.env.YOUTUBE_API_KEY,
            },
        });

        const videoIds = response.data.items.map(item => item.id.videoId);

        // Fetch detailed stats for each video
        const statsResponse = await axios.get(`${YOUTUBE_API_BASE_URL}/videos`, {
            params: {
                part: 'snippet,statistics',
                id: videoIds.join(','),
                key: process.env.YOUTUBE_API_KEY,
            },
        });

        const videos = statsResponse.data.items.map(item => ({
            videoId: item.id,
            title: item.snippet.title,
            description: item.snippet.description,
            likes: item.statistics.likeCount || 0,
            views: item.statistics.viewCount || 0,
            comments: item.statistics.commentCount || 0,
        }));

        // Save videos to MongoDB
        await Video.insertMany(videos, { ordered: false }); 

        res.status(200).json({ success: true, videos});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching YouTube data' });
    }
});



//  This is the code for the Fetch comments for a specific video
router.get('/videos/:videoId/comments', async (req, res) => {
    const { videoId } = req.params;

    try {
        const response = await axios.get(`${YOUTUBE_API_BASE_URL}/commentThreads`, {
            params: {
                part: 'snippet',
                videoId,
                maxResults: 10,
                key: process.env.YOUTUBE_API_KEY,
            },
        });

        const comments = response.data.items.map(item => ({
            comment: item.snippet.topLevelComment.snippet.textDisplay,
            author: item.snippet.topLevelComment.snippet.authorDisplayName,
            likes: item.snippet.topLevelComment.snippet.likeCount,
        }));

        res.status(200).json({success:true, comments});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching comments' });
    }
});



// This is the code for the Fetch channel stats
router.get('/channel/:channelId', async (req, res) => {
    const { channelId } = req.params;

    try {
        const response = await axios.get(`${YOUTUBE_API_BASE_URL}/channels`, {
            params: {
                part: 'snippet,statistics',
                id: channelId,
                key: process.env.YOUTUBE_API_KEY,
            },
        });

        const channel = response.data.items[0];

        const channelData = {
            id: channel.id,
            name: channel.snippet.title,
            description: channel.snippet.description,
            followers: channel.statistics.subscriberCount || 0,
            totalViews: channel.statistics.viewCount || 0,
        };

        res.status(200).json(channelData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching channel stats' });
    }
});


// This is the code for the Fetch playlists by a channel
router.get('/channel/:channelId/playlists', async (req, res) => {
    const { channelId } = req.params;

    try {
        const response = await axios.get(`${YOUTUBE_API_BASE_URL}/playlists`, {
            params: {
                part: 'snippet',
                channelId,
                maxResults: 5,
                key: process.env.YOUTUBE_API_KEY,
            },
        });

        const playlists = response.data.items.map(item => ({
            playlistId: item.id,
            title: item.snippet.title,
            description: item.snippet.description,
        }));

        res.status(200).json(playlists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching playlists' });
    }
});



// This is the logic for fetching all the video in a playlist 
router.get('/playlist/:playlistId/items', async (req, res) => {
    const { playlistId } = req.params;
    console.log(req.params)

    try {
        const response = await axios.get(`${YOUTUBE_API_BASE_URL}/playlistItems`, {
            params: {
                part: 'snippet',
                playlistId,
                maxResults: 20,
                key: process.env.YOUTUBE_API_KEY,
            },
        });

        const items = response.data.items.map(item => ({
            videoId: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
        }));

        res.status(200).json({ success: true, items});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching playlist items' });
    }
});



// This is the logic for fetching the popular or trending videos of the youtube 
router.get('/videos/trending', async (req, res) => {
    try {
        const response = await axios.get(`${YOUTUBE_API_BASE_URL}/videos`, {
            params: {
                part: 'snippet,statistics',
                chart: 'mostPopular',
                regionCode: 'US',
                maxResults: 5,
                key: process.env.YOUTUBE_API_KEY,
            },
        });

        const trendingVideos = response.data.items.map(item => ({
            videoId: item.id,
            title: item.snippet.title,
            description: item.snippet.description,
            likes: item.statistics.likeCount || 0,
            views: item.statistics.viewCount || 0,
        }));

        res.status(200).json({success: true, trendingVideos});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching trending videos' });
    }
});


export default router;

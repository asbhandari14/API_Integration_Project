import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import TableInfo from './TableInfo';





const VideoComments = () => {

    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [apiData, setApiData] = useState([]);



    function extractYouTubeID(url) {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let videoId = extractYouTubeID(youtubeUrl);
        if(videoId == null) alert("This is the not the correct video url link")
        try {

            const response = await axios.get(`http://localhost:8000/api/youtube_data/videos/${videoId}/comments`, { withCredentials: true, headers: { "Content-Type": "application/json" } });

            console.log(response)

            if (response.data.success) {
                setApiData([...response.data.comments]);
                console.log(response)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        setYoutubeUrl(value);
    }

    return (
        <>
            <div className="searchVideo_container w-[50%] mx-auto text-zinc-600 flex flex-col justify-center items-center">
                <h1 className='text-2xl font-semibold text-red-600 mb-8'>Enter the youtube videos and see its top 10 comments</h1>
                <form onSubmit={handleFormSubmit} className='w-full flex justify-start items-center gap-6'>
                    <input name="youtubeUrl" value={youtubeUrl} type="text" className='w-full py-2 px-6 border border-gray-400 rounded-lg' placeholder='Search the videos here' onChange={handleInput} />
                    <button type='submit' className='py-2 px-6 bg-green-400 text-white rounded-lg'>Search</button>
                </form>
            </div>
            <TableInfo apiData={apiData} />
        </>
    )
}

export default VideoComments

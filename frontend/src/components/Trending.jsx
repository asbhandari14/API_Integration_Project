import React, { useEffect, useState } from 'react';
import TableInfo from './TableInfo';
import axios from 'axios';





const Trending = () => {
    const [apiData, setApiData] = useState([]);

    const getTrendingVideos=async()=>{
        try {
            const response = await axios("https://api-integration-project-backend.onrender.com/api/youtube_data/videos/trending");

            console.log(response);
            if(response.data.success){
                setApiData([...response.data.trendingVideos]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getTrendingVideos();
 
    }, [])
    return (
        <>
            <div className="trendingVideosContainer w-[80%] mx-auto text-zinc-600 flex justify-center items-center">
                <h1 className='text-3xl font-semibold text-red-600'>These are some youtube trending videos info</h1>
            </div>
            <TableInfo apiData={apiData} />
        </>
    )
}

export default Trending
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import TableInfo from './TableInfo';





const AllPlaylist = () => {

    const [query, setQuery] = useState("");
    const [apiData, setApiData] = useState([]);

    function extractPlaylistId(url) {
        const regex = /[?&]list=([^&]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let playlistId = extractPlaylistId(query);
        if(playlistId == null) alert("Enter a valid youtube playlist link");
        try {
            const response = await axios.get(`http://localhost:8000/api/youtube_data/playlist/${playlistId}/items`, { withCredentials: true, headers: { "Content-Type": "application/json" } });

            if (response.data.success) {
                setApiData([...response.data.items]);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        setQuery(value);
    }

    return (
        <>
            <div className="searchVideo_container w-[50%] mx-auto text-zinc-600 flex flex-col justify-center items-center">
                <h1 className='text-2xl font-semibold text-red-600 mb-8 text-center'>Enter youtube playlist here and see info of top 20 videos of that playlist</h1>
                <form onSubmit={handleFormSubmit} className='w-full flex justify-start items-center gap-6'>
                    <input name="query" value={query} type="text" className='w-full py-2 px-6 border border-gray-400 rounded-lg' placeholder='Search the videos here' onChange={handleInput} />
                    <button type='submit' className='py-2 px-6 bg-green-400 text-white rounded-lg'>Search</button>
                </form>
            </div>
            <TableInfo apiData={apiData} />
        </>
    )
}

export default AllPlaylist
import React, { useEffect, useState } from 'react';
import axios from "axios";
import TableInfo from './TableInfo';

const SearchVideos = () => {
    const [query, setQuery] = useState("");
    const [apiData, setApiData] = useState([]);

    const handleFormSubmit=async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8000/api/youtube_data/videos?query=${query}`, {withCredentials: true, headers : {"Content-Type" : "application/json"}});

            if(response.data.success){
                setApiData([...response.data.videos]);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleInput=(e)=>{
        const {name, value} = e.target;
        setQuery(value);
    }


    return (
        <>
            <div className="searchVideo_container w-[50%] mx-auto text-zinc-600 flex flex-col justify-center items-center">
                <h1 className='text-2xl font-semibold mb-8 text-red-600'> Search topic and get info of Top 5 youtube video result </h1>
                <form onSubmit={handleFormSubmit} className='w-full flex justify-start items-center gap-6'>
                    <input name="query" value={query} type="text" className='w-full py-2 px-6 border border-gray-400 rounded-lg' placeholder='Search the videos here' onChange={handleInput} />
                    <button type='submit' className='py-2 px-6 bg-green-400 text-white rounded-lg'>Search</button>
                </form>
            </div>
            <TableInfo apiData={apiData} />
        </>
    )
}

export default SearchVideos

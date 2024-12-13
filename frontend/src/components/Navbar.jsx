import React from 'react';
import { NavLink } from 'react-router-dom';





const Navbar = () => {
  return (
    <>
      <div className="navbar_container w-full h-30 flex justify-center items-center text-zinc-600">
        <ul className='w-[70%] flex justify-around items-center border border-gray-400 rounded-full my-20 py-3'>
          <NavLink to="/"><li>Search Videos</li></NavLink>
          <NavLink to="/videoComments"><li>Videos Comments</li></NavLink>
          <NavLink to="/allVideos"><li>Videos of Playlist</li></NavLink>
          <NavLink to="/trending"><li>Trending</li></NavLink>
        </ul>
      </div>
    </>
  )
}

export default Navbar

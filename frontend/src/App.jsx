import React from 'react'
import Navbar from './components/Navbar'
import SearchVideos from './components/SearchVideos'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Trending from './components/Trending';
import AllVideos from './components/AllVideos';
import VideoComments from './components/VideoComments';

const App = () => {
  return (
    <>
      {/* <h1>This is the App.js page</h1> */}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<SearchVideos />} />
          <Route path='/videoComments' element={<VideoComments />} />
          <Route path='/allVideos' element={<AllVideos />} />
          <Route path='/trending' element={<Trending />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App

import React, { useContext } from 'react';
import { PageHeader } from "./layouts/PageHeader";
import { VideoItems } from "./components/VideoItem";
import useGetVideos from "./hooks/GetVideos";
import { UserContext } from './context/UserContext';
import { Divider } from '@mui/material';




function App() {
  const { user_id } = useContext(UserContext);
  const { videos, error } = useGetVideos(`http://localhost:1234/videos/${user_id}`);

  const VideoData = videos.map((video, index) => {
    if (video.video_url === '' || video.title === 'TEst') {
      return null;
    }
    return <VideoItems key={index} {...video} />;
  }); 
  

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 to-white">
      <PageHeader />
      <h1 className="flex justify-center text-4xl pb-5">
        Welcome to Learnwell
      </h1>
      <Divider />
      {/* <Carousel slides={SLIDES} options={OPTIONS} /> */}
      <div className="outline-black flex-grow">
        <div className='flex flex-wrap gap-x-5 gap-y-10 pt-10 justify-center items-start'>
          {VideoData}
        </div>
      </div>
    </div>
  );
}

export default App;
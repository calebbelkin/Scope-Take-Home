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

  const firstName = user_id.split('_')[0];
  const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 to-white">
      <PageHeader />
      {user_id === '' ? (
        <h1 className="flex justify-center text-4xl pb-5">
          Welcome to Learnwell - Please Log In to Get Started
        </h1>
      ) : (
        <h1 className="flex justify-center text-4xl pb-5">
          Welcome {capitalizedFirstName}
        </h1>
      )}
      <Divider />
      {user_id && videos.length === 0 && (
        <h2 className="flex justify-center text-2xl pt-5">
          Upload your first video to get started
        </h2>
      )}
      <div className="outline-black flex-grow">
        <div className='flex flex-wrap gap-x-5 gap-y-10 pt-10 justify-center items-start'>
          {VideoData}
        </div>
      </div>
    </div>
  );
}

export default App;
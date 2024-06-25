import React, { useContext } from 'react';
import { Divider } from '@mui/material';
import { PageHeader } from "./layouts/PageHeader";
import { VideoItems } from "./components/VideoItem";
import useGetVideos from "./hooks/GetVideos";
import { UserContext } from './context/UserContext';

function App() {
  const { user_id } = useContext(UserContext);
  const { videos, error } = useGetVideos(`http://localhost:1234/videos/${user_id}`);

  const renderVideoData = videos.map((video, index) => {
    if (video.video_url === '' || video.title === 'TEst') {
      return null;
    }
    return <VideoItems key={video.id || index} {...video} />;
  });

  const firstName = user_id.split('_')[0];
  const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 to-white">
      <PageHeader />
      {user_id && videos.length > 0 ? (
        <h1 className="flex justify-center font-newsreader text-4xl pb-5">
          Welcome Back, {capitalizedFirstName}!
        </h1>
      ) : (
        <h1 className="flex justify-center font-newsreader text-5xl pb-5">
          Welcome to Learnwell
        </h1>
      )}
      <Divider />
      {user_id && videos.length === 0 && (
        <h2 className="flex justify-center text-2xl font-newsreader pt-5">
          Upload your first video to get started
        </h2>
      )}
      {user_id === '' && (
        <h2 className="flex justify-center font-newsreader text-3xl pt-20">
          Please Log In to Get Started
        </h2>
      )}
      {user_id !== '' && videos.length > 0 && (
        <h2 className="flex justify-center text-3xl font-newsreader pt-5">
          Your Uploads
        </h2>
      )}
      <div className="flex-grow">
        <div className="flex flex-wrap gap-x-5 gap-y-10 pt-10 justify-center items-start">
          {renderVideoData}
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useContext } from 'react';
import { PageHeader } from "./layouts/PageHeader";
import { VideoItems } from "./components/VideoItem";
import useGetVideos from "./hooks/GetVideos";
import { UserContext } from './context/UserContext';
import { VideoContext } from './context/VideoContext';

function App() {
  const { user_id } = useContext(UserContext);
  const { videos, error } = useGetVideos(`http://localhost:1234/videos/${user_id}`);

  const VideoData = videos.map((video, index) => {
    if (video.video_url == '') {
      return null;
    }
    return <VideoItems key={index} {...video} />;
  });

  return (
    <div className="max-h-screen flex flex-col bg-[#3AAfA9]">
      <PageHeader />
      <h1 className="flex justify-center text-4xl">
        Welcome to Learnwell
      </h1>
      <div className="outline-black">
        <div className='flex flex-wrap gap-x-5 gap-y-10 pt-10 justify-center items-start'>
          {VideoData}
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { createContext, useState, ReactNode } from 'react';

interface VideoContextProps {
  curr_video_id: string;
  setCurrVideoId: (id: string) => void;
}

export const VideoContext = createContext<VideoContextProps>({
    curr_video_id: '',
    setCurrVideoId: () => {},
});

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [curr_video_id, setCurrVideoId] = useState('');

  return (
    <VideoContext.Provider value={{ curr_video_id, setCurrVideoId }}>
      {children}
    </VideoContext.Provider>
  );
};
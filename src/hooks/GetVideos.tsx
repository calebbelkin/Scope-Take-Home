import { useState, useEffect } from "react";
import { VideoItemsProps } from "../components/VideoItem";

const useGetVideos = (url: string) => {
  const [videos, setVideos] = useState<VideoItemsProps[]>([]);
  const [error, setError] = useState<Error | null>(null);


  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        const data = text ? JSON.parse(text) : [];
        setVideos(data.videos);

      } catch (error) {
        setError(error as Error);
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [url]);

  return { videos, error };
};

export default useGetVideos;

import VideoCard from "./VideoCard";
import ReactPlayer from "react-player";

type VideoItemsProps = {
    created_at: string;
  video_url: string;
  user_id: string;
  description: string;
  title: string;
  num_comments: number;
  id: string;
  };

export function VideoItems ({
    created_at,
    video_url,
    user_id, 
    description,
    title,
    num_comments,
    id
}: VideoItemsProps) {


    return (
        <div className="flex flex-col gap-2 p-4 relative aspect-video ">
            {/* <a href={video_url} className=""> */}

         
            {/* <iframe
              src={video_url}
              title={title}
              className="block w-full h-full object-cover rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe> */}
            <ReactPlayer url={video_url} controls/>  
          <div>
      
            <VideoCard title={title} video_url={video_url} description={description}/>
          {/* <h2 className="text-xl font-bold">{title}</h2> */}
            {/* <p className="text-sm">{description}</p>  */}
            <p className="text-xs text-gray-500">Uploaded by: {user_id}</p> 
          </div>
        </div>
    );
}
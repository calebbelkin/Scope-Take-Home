
type VideoItemsProps = {
    user_id: string;
    description: string;
    video_url: string;
    title: string;
  };

export function VideoItems ({
    user_id, 
    description,
    video_url,
    title,
}: VideoItemsProps) {


    return (
        <div className="flex flex-col gap-2 p-4 w-[450px] h-[325px]">
          <a href={video_url} className="relative aspect-video">
            <iframe
              src={video_url}
              title={title}
              // style={{ width: '450px', height: '300px' }}
              className="block w-full h-full object-cover rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </a>
          <div>
          <h2 className="text-xl font-bold">{title}</h2>
            {/* <p className="text-sm">{description}</p>  */}
            <p className="text-xs text-gray-500">Uploaded by: {user_id}</p> 
          </div>
        </div>
    );
}
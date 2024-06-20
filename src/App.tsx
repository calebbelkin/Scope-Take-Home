import { PageHeader } from "./layouts/PageHeader"
import { CategoryPills } from "./components/CategoryPills"
import { useState } from "react"
import { VideoItems } from "./components/VideoItem"
import VideoGrid from "./layouts/VideoGrid"
import useGetVideos from "./hooks/GetVideos"





function App() {
  const user_id = 'caleb_belkin'
  const { videos, error } = useGetVideos(`http://localhost:1234/videos/${user_id}`)

// const MockVideos = [
//     {
//       user_id: "caleb_belkin",
//       description:
//         "The YouTube home page may seem simple at first (that is what I thought), but there are so many small complex interactions that actually make building out this home page design quite complicated. In this video I will show you exactly how to build out the entire YouTube home page from scratch with TailwindCSS, React, and TypeScript.",
//       video_url: "https://www.youtube.com/embed/ymGB1lqP1CM",
//       title: "How To Create The YouTube Home Page With Tailwind, React, and TypeScript",
//     },
//     {
//       user_id: "caleb_belkin",
//       description:
//         "Learn how to setup React with TypeScript. Compare the pros and cons of using TypeScript in an React project. Learn more in the full course 👉",
//       video_url: "https://www.youtube.com/embed/ydkQlJhodio",
//       title: "How to use TypeScript with React... But should you?",
//     },
//     {
//       user_id: "caleb_belkin",
//       description:
//         "Learn how to setup React with TypeScript. Compare the pros and cons of using TypeScript in an React project. Learn more in the full course 👉",
//       video_url: "https://www.youtube.com/embed/ydkQlJhodio",
//       title: "How to use TypeScript with React... But should you?",
//     },
//     {
//       user_id: "caleb_belkin",
//       description:
//         "The YouTube home page may seem simple at first (that is what I thought), but there are so many small complex interactions that actually make building out this home page design quite complicated. In this video I will show you exactly how to build out the entire YouTube home page from scratch with TailwindCSS, React, and TypeScript.",
//       video_url: "https://www.youtube.com/embed/ymGB1lqP1CM",
//       title: "How To Create The YouTube Home Page With Tailwind, React, and TypeScript",
//     },
//   ];

  // const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const VideoData = videos.map((video, index) => {
    return (
      <VideoItems key={index} {...video}/>
    )
  })

  return (
    <div className="max-h-screen flex flex-col bg-[#3AAfA9]">
      <PageHeader />
      {/* <div className="grid gris-cols-[auto,1fr] flex-grow-1 overflow-auto"></div> */}
      {/* <div>Sidebar</div> */}
      {/* <div className="overflow-x-hidden px-8 pb-4"> */}
      {/* <div className="sticky top-0 bg-white z-10 pb-4">
        <CategoryPills categories={categories} selectedCategory={selectedCategory} onSelect={setSelectedCategory}/>
      </div> */}
      {/* </div> */}
      <h1 className="flex justify-center text-4xl">
        Welcome to Learnwell
      </h1>
      <div className="outline-black">
      <div className='flex flex-wrap gap-x-5 gap-y-10 pt-10 justify-center items-start'>
      {VideoData}
      </div>
      </div>
      </div>
  )
}

export default App

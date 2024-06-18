import { PageHeader } from "./layouts/PageHeader"
import { CategoryPills } from "./components/CategoryPills"
import { categories } from "./data/home"
import { useState } from "react"
import { VideoItems } from "./components/VideoItem"
import   BasicModal  from "./components/UploadCard"



function App() {

  // const [selectedCategory, setSelectedCategory] = useState(categories[0])

  return (
    <div className="max-h-screen flex flex-col bg-[#F1CF54]">
      <PageHeader />
      <div className="grid gris-cols-[auto,1fr] flex-grow-1 overflow-auto"></div>
      {/* <div>Sidebar</div> */}
      {/* <div className="overflow-x-hidden px-8 pb-4"> */}
      {/* <div className="sticky top-0 bg-white z-10 pb-4">
        <CategoryPills categories={categories} selectedCategory={selectedCategory} onSelect={setSelectedCategory}/>
      </div> */}
      {/* </div> */}
      <h1 className="flex justify-center text-4xl">
        Welcome to Learnwell
      </h1>
      <VideoItems />
    </div>
  )
}

export default App

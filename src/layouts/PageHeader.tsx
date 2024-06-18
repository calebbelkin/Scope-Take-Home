import Logo from "../assets/main_logo.png"
import { UniformButton } from "../components/Button"
import { useState } from "react";
import UploadCard from "../components/UploadCard";




export function PageHeader() {
    const [showFullWidthSearch, setShowFullWidthSearch] = useState(false)
    return (
      <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-6">
        <div className={`flex gap-4 items-center flex-shrink-0 ${showFullWidthSearch ? 'hidden' : 'flex'}`} >
          {/* <Button variant="ghost" size="icon">
            <ion-icon name="menu-outline"></ion-icon>
          </Button> */}
          <a href="/">
            <img src={Logo} className="h-10" />
          </a>
        </div>
        {/* <form className={`md:flex gap-4 flex-grow justify-center ${showFullWidthSearch ? 'flex' : 'hidden'}`}>
            {showFullWidthSearch && (
            <Button variant="ghost" size="icon"  onClick={() => setShowFullWidthSearch(false)} className={`flex-shrink-0 ${showFullWidthSearch ? 'flex' : 'hidden'}`}>
                <ion-icon name="arrow-back-outline"></ion-icon>
            </Button>
            )}
        <div className="flex flex-grow max-w-[600px]">
            <input
            type="search"
            placeholder="Search"
            className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
          />
             <Button className="py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0">
                <ion-icon name="search-outline"></ion-icon>
            </Button>
            </div>
            <Button type="button" size="icon">
                <ion-icon className="flex-shrink-0" name="mic-outline"></ion-icon>
            </Button>
        </form> */}
        <div className={`flex-shrink-0 md:gap-2 ${showFullWidthSearch ? 'hidden' : 'flex'}`}>
         <UniformButton onClick={() => setShowFullWidthSearch(true)} variant="ghost" size="icon" className="md:hidden">
            <ion-icon name="search-outline"></ion-icon>
          </UniformButton>
          <UniformButton variant="ghost" size="icon" className="md:hidden">
            <ion-icon name="mic-outline"></ion-icon>
          </UniformButton>
          <UploadCard />
          {/* <Button variant="ghost" size="icon">
            <ion-icon name="notifications-outline"></ion-icon>
          </Button> */}
          <UniformButton variant="ghost" size="icon" className="text-lg">
            <ion-icon name="person-circle-outline"></ion-icon>
          </UniformButton>
        </div>
      </div>
    );
  }
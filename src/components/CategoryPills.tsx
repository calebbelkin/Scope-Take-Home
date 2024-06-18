import { Button } from "./Button"
import { useState } from "react"

type CategoryPillProps = {
   categories: string[]
   selectedCategory: string
   onSelect:(category: string) => void 
}

export function CategoryPills ({ categories, selectedCategory, onSelect }: CategoryPillProps) {
    const [isLeftVisable, setIsLeftVisable] = useState(false)
    const [isRightVisable, setIsRightVisable] = useState(true)
    return (
        <div className="overflow-x-hidden relative">
            <div className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]">
                {categories.map(category => (
                    <Button variant={selectedCategory === category ? 'dark' : 'default'} onClick={() => onSelect(category)} className="py-1 px-3 rounded-lg whitespace-nowrap" key={category}>
                    {category}
                </Button>
                ))}
           </div>
           {isLeftVisable && (
           <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
            <Button variant="ghost" size='icon' className="h-full aspect-square w-auto p-1.5">
            <ion-icon name="chevron-back-outline"></ion-icon>
            </Button>
           </div>
           )}
           {isRightVisable && (
           <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
            <Button variant="ghost" size='icon' className="h-full aspect-square w-auto p-1.5">
            <ion-icon name="chevron-forward-outline"></ion-icon>
            </Button>
           </div>
           )}
       </div>
    ) 
}
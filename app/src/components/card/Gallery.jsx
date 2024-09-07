import Minisprite from "./images/Minisprite"
import Sprite from "./images/Sprite"

import GalleryController from "./GalleryController"

import { useState } from "react"

export default function Gallery({ pokename, imgList }) {
    const gallery = new Array()
    /* Une seule image pour le moment pour ne pas avoir à implémenter le controller */
    const list = ((Object.values(imgList)))

    list.forEach(element => {
        const data = element[1]
        const unit = {
            name: data.name,
            img: {
                minisprite: data.minisprite,
                sprite: data.sprite
            }
        }
        gallery.push(unit)
    })

    const initialState = 0

    const [activeIndex, setActiveIndex] = useState(initialState);

    function updateGallery(index) {
        if (index == gallery.length){
            setActiveIndex(0)
        }
        else if (index === -1) {
            setActiveIndex(gallery.length-1)
        }
        else {
            setActiveIndex(index)
        }
    }
    return (
        <>
            <Minisprite img={gallery[activeIndex].img.minisprite.regular} />
            <Sprite img={gallery[activeIndex].img.sprite.regular} />
            <GalleryController activeImageSet={{activeIndex:activeIndex, imageSet:gallery[activeIndex], length:gallery.length}} updater={updateGallery} />
        </>
    )
}
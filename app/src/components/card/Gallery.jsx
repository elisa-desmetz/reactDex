import Minisprite from "./images/Minisprite"
import Sprite from "./images/Sprite"

import { motion } from "framer-motion"

import GalleryController from "./GalleryController"

import { useState } from "react"

export default function Gallery({ imgList, updater, gradient }) {
    const gallery = new Array()
    /* Une seule image pour le moment pour ne pas avoir à implémenter le controller */
    const list = ((Object.values(imgList.gallery)))

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

    const initialState = { index: 0 };

    const [activeIndex, setActiveIndex] = useState(initialState.index);


    function updateGallery(index) {
        if (index == gallery.length) {
            setActiveIndex(0)
        }
        else if (index === -1) {
            setActiveIndex(gallery.length - 1)
        }
        else {
            setActiveIndex(index)
        }
    }

    return (
        <>
            {imgList.isShiny ?
                <>
                    <Minisprite
                        img={gallery[activeIndex].img.minisprite.shiny} />
                    <Sprite
                        img={gallery[activeIndex].img.sprite.shiny} />
                </>
                :
                <>
                    <Minisprite
                        img={gallery[activeIndex].img.minisprite.regular} />
                    <Sprite
                        img={gallery[activeIndex].img.sprite.regular} />
                </>
            }
            <GalleryController
                activeImageSet={{
                    activeIndex: activeIndex,
                    imageSet: gallery[activeIndex],
                    length: gallery.length
                }}
                updater={updateGallery} />
            <div className="bottom">
                {(gallery[activeIndex].img.minisprite.shiny && gallery[activeIndex].img.sprite.shiny) &&
                    <button className="shinyToggle"
                        onClick={(e) => {
                            e.stopPropagation()
                            updater()
                        }} />
                }
                <div className="corner" style={{ background: gradient }} />
            </div>
        </>
    )
}

function shinyToggle(){
    return (
        <label name="toggleShiny">
            <input className="hiddenInput" />
            <div className="shinyToggle"/>
        </label>
    )
}
import Minisprite from "./images/Minisprite"
import Sprite from "./images/Sprite"

import { AnimatePresence, motion } from "framer-motion"

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
                    <ShinyToggle
                        className="shinyToggle"
                        updater={updater}
                        isShiny={imgList.isShiny} />
                }
                <div className="corner" style={{ background: gradient }} />
            </div>
        </>
    )
}

function ShinyToggle({ updater, isShiny }) {
    return (
        <label className="labelShinyToggle" name="toggleShiny">
            <input
                onClick={(e) => {
                    updater()
                }}
                type="checkbox"
                className="hiddenInput" />
            <AnimatePresence>
                <motion.div
                    animate={{ 
                        filter: isShiny ?  "saturate(100%)" : "saturate(10%)",
                        boxShadow : isShiny ? "0 0 0 2px rgba(255, 255, 255, 0.7), inset 0 0 5px rgba(255, 51, 96,0.6)" : "" 
                    }}
                    className="btnShinyToggle"
                    transition={{duration:0.1}} 
                    whileHover={{boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.7), inset 0 0 5px #CDCDCD"}}/>
            </AnimatePresence>
        </label>
    )
}
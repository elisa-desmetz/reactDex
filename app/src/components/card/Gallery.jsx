import Minisprite from "./images/Minisprite"
import Sprite from "./images/Sprite"

import { AnimatePresence, motion } from "framer-motion"

import GalleryController from "./GalleryController"

import { useState } from "react"

export default function Gallery({ imgList, status, updater, gradient, mega }) {

    const galleryRegular = new Array()
    const galleryMega = new Array()
    const regList = (Object.values(imgList.regular))

    regList.forEach(element => {
        const data = element[1]
        const unit = {
            name: data.name,
            img: {
                minisprite: data.minisprite,
                sprite: data.sprite
            }
        }
        galleryRegular.push(unit)
    })

    if (imgList.megaX) {
        const unit = {
            name: "Mega X",
            img: {
                minisprite: (imgList.megaX)[1][1],
                sprite: (imgList.megaX)[0][1]
            }
        }
        galleryMega.push(unit)
    }
    if (imgList.megaY) {
        const unit = {
            name: "Mega Y",
            img: {
                minisprite: (imgList.megaY)[1][1],
                sprite: (imgList.megaY)[0][1]
            }
        }
        galleryMega.push(unit)
    }

    const initialState = { index: 0 };

    const [activeRegularIndex, setActiveRegularIndex] = useState(initialState.index);


    function updateRegularGallery(index) {
        if (index == galleryRegular.length) {
            setActiveRegularIndex(0)
        }
        else if (index === -1) {
            setActiveRegularIndex(galleryRegular.length - 1)
        }
        else {
            setActiveRegularIndex(index)
        }
    }

    return (
        <>
            {!status.mega ?
                <>
                    {status.shiny ?
                        <>
                            <Minisprite
                                img={galleryRegular[activeRegularIndex].img.minisprite.shiny}
                            />
                            <Sprite
                                img={galleryRegular[activeRegularIndex].img.sprite.shiny}
                            />
                        </>
                        :
                        <>
                            <Minisprite
                                img={galleryRegular[activeRegularIndex].img.minisprite.regular}
                            />
                            <Sprite
                                img={galleryRegular[activeRegularIndex].img.sprite.regular}
                            />
                        </>
                    }
                </>
                :
                <>
                    {mega.active == 'x' ?
                        <>
                            {status.shiny ?
                                <>
                                    <Minisprite
                                        img={galleryMega.at(0).img.minisprite.shiny}
                                    />
                                    <Sprite
                                        img={galleryMega.at(0).img.sprite.shiny}
                                    />
                                </>
                                :
                                <>
                                    <Minisprite
                                        img={galleryMega.at(0).img.minisprite.regular}
                                    />
                                    <Sprite
                                        img={galleryMega.at(0).img.sprite.regular}
                                    />
                                </>
                            }
                        </>
                        :
                        <>
                            {status.shiny ?
                                <>
                                    <Minisprite
                                        img={galleryMega.at(1).img.minisprite.shiny}
                                    />
                                    <Sprite
                                        img={galleryMega.at(1).img.sprite.shiny}
                                    />
                                </>
                                :
                                <>
                                    <Minisprite
                                        img={galleryMega.at(1).img.minisprite.regular}
                                    />
                                    <Sprite
                                        img={galleryMega.at(1).img.sprite.regular}
                                    />
                                </>
                            }
                        </>
                    }
                </>
            }
            {!status.mega ?
                <GalleryController
                    status={{ mega: status.mega }}
                    activeImageSet={{
                        activeIndex: activeRegularIndex,
                        imageSet: galleryRegular[activeRegularIndex],
                        length: galleryRegular.length
                    }}
                    updater={updateRegularGallery}
                />
                :
                <>
                    {mega.active == 'x' ?
                        <GalleryController
                            status={{ mega: status.mega }}
                            activeImageSet={{
                                activeIndex: 0,
                                imageSet: galleryMega.at(0),
                                length: galleryMega.length
                            }}
                            updater={updater.updateMega}
                        />
                        :
                        <GalleryController
                            status={{ mega: status.mega }}
                            activeImageSet={{
                                activeIndex: 1,
                                imageSet: galleryMega.at(1),
                                length: galleryMega.length
                            }}
                            updater={updater.updateMega}
                        />
                    }
                </>
            }



            <div className="bottom">
                {(galleryRegular[activeRegularIndex].img.minisprite.shiny && galleryRegular[activeRegularIndex].img.sprite.shiny) &&
                    <ShinyToggle
                        className="shinyToggle"
                        updater={updater.toggleShiny}
                        isShiny={status.shiny} />
                }
                {mega.exists &&
                    <MegaToggle
                        updater={updater.toggleMega}
                        isMega={status.mega}
                    />
                }
                <div className="corner" style={{ background: gradient }} />
            </div>
        </>
    )
}

function ShinyToggle({ updater, isShiny }) {
    return (
        <label className="labelToggle" name="toggleShiny">
            <input
                onClick={(e) => {
                    updater()
                }}
                type="checkbox"
                className="hiddenInput" />
            <AnimatePresence>
                <motion.div
                    className="btnToggle shiny"
                    initial={{ boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.7)" }}
                    animate={{
                        filter: isShiny ? "saturate(100%)" : "saturate(10%)",
                        boxShadow: isShiny ? "0 0 0 2px rgba(255, 255, 255, 0.7), inset 0 0 5px rgba(255, 51, 96,0.6)" : "",
                    }}
                    transition={{ duration: 0.1 }}
                    whileHover={{ boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.7), inset 0 0 5px #CDCDCD" }} />
            </AnimatePresence>
        </label>
    )
}

function MegaToggle({ updater, isMega }) {
    return (
        <label className="labelToggle" name="toggleMega">
            <input
                onClick={(e) => {
                    updater()
                }}
                type="checkbox"
                className="hiddenInput" />
            <AnimatePresence>
                <motion.div
                    className="btnToggle mega"
                    initial={{ boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.7)" }}
                    animate={{
                        filter: isMega ? "saturate(100%)" : "saturate(10%)",
                        boxShadow: isMega ? "0 0 0 2px rgba(255, 255, 255, 0.7), inset 0 0 5px rgba(2,169,167,0.8)" : "",
                    }}
                    transition={{ duration: 0.1 }}
                    whileHover={{ boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.7), inset 0 0 5px #CDCDCD" }} />
            </AnimatePresence>
        </label>
    )
}
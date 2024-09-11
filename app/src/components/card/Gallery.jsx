import Minisprite from "./images/Minisprite"
import Sprite from "./images/Sprite"

import { AnimatePresence, motion } from "framer-motion"

import GalleryController from "./GalleryController"

import { useState } from "react"

export default function Gallery({ imgPath, imgList, status, updater, gradient, mega, giga }) {

    const galleryRegular = new Array()
    const galleryMega = new Array()
    let galleryGiga = new Array()
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

    if (imgList.giga) {
        galleryGiga.push({
            name: "Giga",
            img: {
                minisprite: (imgList.giga)[1][1],
                sprite: (imgList.giga)[0][1],
            }
        })
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
            {!status.mega && !status.giga &&
                <>
                    {status.shiny ?
                        <>
                            <Minisprite
                                img={'/images/pokemon/minisprite/' + imgPath.regular + '-' + activeRegularIndex + '-s.webp'}
                            />
                            <Sprite
                                img={'/images/pokemon/sprite/' + imgPath.regular + '-' + activeRegularIndex + '-s.webp'}
                            />
                        </>
                        :
                        <>
                            <Minisprite
                                img={'/images/pokemon/minisprite/' + imgPath.regular + '-' + activeRegularIndex + '.webp'}
                            />
                            <Sprite
                                img={'/images/pokemon/sprite/' + imgPath.regular + '-' + activeRegularIndex + '.webp'}
                            />
                        </>
                    }
                </>
            }
            {status.mega &&
                <>
                    {mega.active == 'x' ?
                        <>
                            {status.shiny ?
                                <>
                                    <Minisprite
                                        img={'/images/pokemon/minisprite/' + imgPath.regular + '-mx-s.webp'}
                                    />
                                    <Sprite
                                        img={'/images/pokemon/sprite/' + imgPath.regular + '-mx-s.webp'}
                                    />
                                </>
                                :
                                <>
                                    <Minisprite
                                        img={'/images/pokemon/minisprite/' + imgPath.regular + '-mx.webp'}
                                    />
                                    <Sprite
                                        img={'/images/pokemon/sprite/' + imgPath.regular + '-mx.webp'}
                                    />
                                </>
                            }
                        </>
                        :
                        <>
                            {status.shiny ?
                                <>
                                    <Minisprite
                                        img={'/images/pokemon/minisprite/' + imgPath.regular + '-my-s.webp'}
                                    />
                                    <Sprite
                                        img={'/images/pokemon/sprite/' + imgPath.regular + '-my-s.webp'}
                                    />
                                </>
                                :
                                <>
                                    <Minisprite
                                        img={'/images/pokemon/minisprite/' + imgPath.regular + '-my.webp'}
                                    />
                                    <Sprite
                                        img={'/images/pokemon/sprite/' + imgPath.regular + '-my.webp'}
                                    />
                                </>
                            }
                        </>
                    }
                </>
            }
            {status.giga &&
                <>
                    {status.shiny ?
                        <>
                            <Minisprite
                                img={'/images/pokemon/minisprite/' + imgPath.regular  + '-g-s.webp'}
                            />
                            <Sprite
                                img={'/images/pokemon/sprite/' + imgPath.regular + '-g-s.webp'}
                            />
                        </>
                        :
                        <>
                            <Minisprite
                                img={'/images/pokemon/minisprite/' + imgPath.regular + '-g.webp'}
                            />
                            <Sprite
                                img={'/images/pokemon/sprite/' + imgPath.regular + '-g.webp'}
                            />
                        </>
                    }
                </>
            }
            {(!status.mega && !status.giga) &&
                <GalleryController
                    status={{ mega: status.mega }}
                    activeImageSet={{
                        activeIndex: activeRegularIndex,
                        imageSet: galleryRegular[activeRegularIndex],
                        length: galleryRegular.length
                    }}
                    updater={updateRegularGallery}
                />
            }
            {status.mega &&
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
                        updater={{
                            mega: updater.toggleMega,
                            giga: updater.toggleGiga
                        }}
                        status={status}
                    />
                }
                {giga.exists &&
                    <GigaToggle
                        updater={{
                            mega: updater.toggleMega,
                            giga: updater.toggleGiga
                        }}
                        status={status}
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

function MegaToggle({ updater, status }) {
    return (
        <label className="labelToggle" name="toggleMega">
            <input
                onClick={(e) => {
                    updater.mega()
                    if (status.giga) {
                        updater.giga()
                    }
                }}
                type="checkbox"
                className="hiddenInput" />
            <AnimatePresence>
                <motion.div
                    className="btnToggle mega"
                    initial={{ boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.7)" }}
                    animate={{
                        filter: status.mega ? "saturate(100%)" : "saturate(10%)",
                        boxShadow: status.mega ? "0 0 0 2px rgba(255, 255, 255, 0.7), inset 0 0 5px rgba(2,169,167,0.8)" : "",
                    }}
                    transition={{ duration: 0.1 }}
                    whileHover={{ boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.7), inset 0 0 5px #CDCDCD" }} />
            </AnimatePresence>
        </label>
    )
}

function GigaToggle({ updater, status }) {
    return (
        <label className="labelToggle" name="toggleGiga">
            <input
                onClick={(e) => {
                    updater.giga()
                    if (status.mega) {
                        console.debug("click giga")
                        updater.mega()
                    }
                }}
                type="checkbox"
                className="hiddenInput" />
            <AnimatePresence>
                <motion.div
                    className="btnToggle giga"
                    initial={{ boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.7)" }}
                    animate={{
                        filter: status.giga ? "saturate(100%)" : "saturate(10%)",
                        boxShadow: status.giga ? "0 0 0 2px rgba(255, 255, 255, 0.7), inset 0 0 5px rgba(231,0,64,0.8)" : "0 0 0 2px rgba(255, 255, 255, 0.7)",
                    }}
                    transition={{ duration: 0.1 }}
                    whileHover={{ boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.7), inset 0 0 5px #CDCDCD" }} />
            </AnimatePresence>
        </label>
    )
}
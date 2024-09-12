import ImageSet from "./ImageSet"
import ShinyToggle, { GigaToggle, MegaToggle } from "./Toggle"

import GalleryController from "./GalleryController"

import { useState } from "react"

export default function Gallery({ imgPath, regularGallery, mega, giga, status, updater, gradient }) {

    const galleryRegular = new Array()
    const galleryMega = new Array()
    const galleryGiga = new Array()
    const regList = (Object.values(regularGallery))

    // Regular
    regList.forEach(element => {
        const data = element[1]
        const unit = {
            name: data.name,
            shinyExists: data.shiny,
        }
        galleryRegular.push(unit)
    })

    // Mega evolutions
    if (mega.exists.x) {
        galleryMega.push({
            name: "Mega X",
        })
    }
    if (mega.exists.y) {
        galleryMega.push({
            name: "Mega Y",
        })
    }

    // Gmax
    if (giga.exists) {
        galleryGiga.push({
            name: "Giga",
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
                    <ImageSet imgPath={imgPath.regular + '-' + activeRegularIndex} isShiny={status.shiny} />
                    <GalleryController
                        status={{ mega: status.mega }}
                        activeImageSet={{
                            activeIndex: activeRegularIndex,
                            imageSet: galleryRegular[activeRegularIndex],
                            length: galleryRegular.length
                        }}
                        updater={updateRegularGallery}
                    />
                </>
            }

            {status.mega &&
                <>
                    {mega.current == 'x' ?
                        <>
                            <ImageSet imgPath={imgPath.megaX} isShiny={status.shiny} />
                            <GalleryController
                                status={{ mega: status.mega }}
                                activeImageSet={{
                                    activeIndex: 0,
                                    imageSet: galleryMega.at(0),
                                    length: galleryMega.length
                                }}
                                updater={updater.updateMega}
                            />

                        </>
                        :
                        <>
                            
                            <ImageSet imgPath={imgPath.megaY} isShiny={status.shiny} />
                            <GalleryController
                                status={{ mega: status.mega }}
                                activeImageSet={{
                                    activeIndex: 1,
                                    imageSet: galleryMega.at(1),
                                    length: galleryMega.length
                                }}
                                updater={updater.updateMega}
                            />
                        </>
                    }
                </>
            }
            {status.giga &&
                    <ImageSet imgPath={imgPath.giga} isShiny={status.shiny} />
            }



            <div className="bottom"
                onClick={(e) => e.stopPropagation()}>
                {(galleryRegular[activeRegularIndex].shinyExists) &&
                    <ShinyToggle
                        className="shinyToggle"
                        updater={updater.toggleShiny}
                        isShiny={status.shiny} />
                }
                {(mega.exists.x || mega.exists.y) &&
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
import { motion, AnimatePresence } from "framer-motion"

export default function GalleryController({ status, activeImageSet, updater }) {
    

    let nameDescription = ""
    switch (activeImageSet.imageSet.name) {
        case 'u':
            nameDescription = "Unisexe"
            break
        case 'm':
            nameDescription = "Male"
            break
        case 'f':
            nameDescription = "Femelle"
            break
        default:
            nameDescription = activeImageSet.imageSet.name
            break
    }



    return (
        <>
        {activeImageSet.length != 1 &&

                <div className="galleryControl" style={{justifyContent:"space-between"}}>
                    <AnimatePresence>
                        <motion.button
                            key="left"
                            initial={{ opacity: 0.5 }}
                            whileHover={{ x: "-10%", opacity: 1 }}
                            className="navigGallery left" onClick={(e) => {
                                e.stopPropagation()
                                {updater.gallery(activeImageSet.activeIndex - 1)}
                                
                            }} />
                        <div>{nameDescription} - {activeImageSet.activeIndex + 1}/{activeImageSet.length}</div>
                        <motion.button
                            key="right"
                            initial={{ opacity: 0.5 }}
                            whileHover={{ x: "10%", opacity: 1 }}
                            className="navigGallery right" onClick={(e) => {
                                e.stopPropagation()
                                updater.gallery(activeImageSet.activeIndex + 1)
                            }} />
                    </AnimatePresence>
                </div>
        }
        </>
    )
}
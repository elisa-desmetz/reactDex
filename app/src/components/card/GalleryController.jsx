import { motion, AnimatePresence } from "framer-motion"

export default function GalleryController({ activeImageSet, updater }) {

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
        <div className="galleryControl">

            {activeImageSet.length != 1 ?
                <AnimatePresence>
                    <motion.button
                        key="left"
                        initial={{ opacity: 0.5 }}
                        whileHover={{ x: "-20%", opacity: 1 }}
                        className="navigGallery left" onClick={(e) => {
                            e.stopPropagation()
                            updater(activeImageSet.activeIndex - 1)
                        }} />
                    <div>{nameDescription} - {activeImageSet.activeIndex + 1}/{activeImageSet.length}</div>
                    <motion.button
                        key="right"
                        initial={{ opacity: 0.5 }}
                        whileHover={{ x: "20%", opacity: 1 }}
                        className="navigGallery right" onClick={(e) => {
                            e.stopPropagation()
                            updater(activeImageSet.activeIndex + 1)
                        }} />
                </AnimatePresence>
                :
                <div>{nameDescription}</div>
            }
        </div>
    )
}
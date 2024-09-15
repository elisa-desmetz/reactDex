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
        <>
            {activeImageSet.length != 1 &&

                <div className="galleryControl" style={{ justifyContent: "space-between" }}>
                    <button
                        className="navigGallery left" onClick={(e) => {
                            e.stopPropagation()
                            { updater(activeImageSet.activeIndex - 1) }

                        }} />
                    <div>{nameDescription}
                        <span className="navigIndex">   &nbsp;-&nbsp;{activeImageSet.activeIndex + 1}/{activeImageSet.length}</span>
                    </div>
                    <button
                        className="navigGallery right" onClick={(e) => {
                            e.stopPropagation()
                            updater(activeImageSet.activeIndex + 1)
                        }} />
                </div>
            }
        </>
    )
}
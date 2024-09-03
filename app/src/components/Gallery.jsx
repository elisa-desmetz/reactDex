import Minisprite from "./images/Minisprite"
import Sprite from "./images/Sprite"

export default function Gallery(imgList){
    /* Une seule image pour le moment pour ne pas avoir à implémenter le controller */
    const gallery = (Object.values(imgList)).at(0).at(1)

    return (
        <>
        <Minisprite img={gallery.minisprite.regular}/>
        <Sprite img={gallery.sprite.regular}/>
        </>
    )
}
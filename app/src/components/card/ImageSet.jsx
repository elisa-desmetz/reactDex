import { useState } from "react"

export default function ImageSet({ isShiny, imgPath, imgPathFallback, shinyExists }) {

    const minispritePath = '/images/pokemon/minisprite/'
    const spritePath = '/images/pokemon/sprite/'

    let path
    const unknown = "unknown.webp"

    if (isShiny) {
        path = imgPath + '-s.webp'
    }
    else {
        path = imgPath + '.webp'
    }

    let defaultFallback
    if (shinyExists && isShiny) {
        defaultFallback = imgPathFallback + '-s.webp'
    }
    else {
        defaultFallback = imgPathFallback + '.webp'
    }
    const fbMinispriteValues = [minispritePath + defaultFallback, minispritePath + unknown]

    let fallback
    if (shinyExists && isShiny) {
        fallback = imgPath + '-s.webp'
    }
    else {
        fallback = imgPath + '.webp'
    }
    const fbSpriteValues = [spritePath + fallback, spritePath + unknown]

    const initialState = {miniIndex:0, index:0}
    
    const [indexMini, setIndexMini] = useState(initialState.miniIndex)
    
    function nextMiniFallback() {
        setIndexMini((prev) => {
            return prev + 1
        })
    }
    
    const [index, setIndex] = useState(initialState.index)
    function nextFallback() {
        setIndex((prev) => {
            return prev + 1
        })
    }

    return (
        <>
            <div className="minisprite">
                <img
                    onError={(e) => {
                        e.target.src = fbMinispriteValues[indexMini]
                        nextMiniFallback()
                    }}
                    src={minispritePath + path}
                    loading="lazy"
                />
            </div>
            <div className="sprite pokeball_back">
                <img
                    onError={(e) => {
                        e.target.src = fbSpriteValues[index]
                        nextFallback()
                    }}
                    src={spritePath + path}
                    loading="lazy"
                />
            </div>
        </>
    )
}
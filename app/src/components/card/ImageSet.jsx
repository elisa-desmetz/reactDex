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

    let minispriteFallback
    if (shinyExists && isShiny) {
        minispriteFallback = imgPathFallback + '-s.webp'
    }
    else {
        minispriteFallback = imgPathFallback + '.webp'
    }

    const fbMinispriteValues = [minispritePath + minispriteFallback, minispritePath + unknown]

    let spriteFallback
    if (shinyExists && isShiny) {
        spriteFallback = imgPath + '-s.webp'
    }
    else {
        spriteFallback = imgPath + '.webp'
    }
    const fbSpriteValues = [spritePath + spriteFallback, spritePath + unknown]

    const initialState = { miniIndex: 0, index: 0 }

    const [indexMini, setIndexMini] = useState(initialState.miniIndex)

    function nextMiniFallback() {
        setIndexMini((prev) => {
            if (prev < 1) {
                return prev + 1
            }
            return 1
        })
    }

    const [index, setIndex] = useState(initialState.index)
    function nextFallback() {
        setIndex((prev) => {
            if (prev < 1) {
                return prev + 1
            }
            return 1
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
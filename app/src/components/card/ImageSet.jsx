import React from "react";
import ImageWithFallbacks from "./ImgWithFallbackList";

export default function ImageSet({ isShiny, imgPath, imgPathFallback, shinyExists }) {

    const minispritePath = '/images/pokemon/minisprite/'
    const spritePath = '/images/pokemon/sprite/'
    const unknown = "unknown.webp"

    let path
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

    return (
        <>
            <div className="minisprite">
                <ImageWithFallbacks src={minispritePath + path} fallbacks={fbMinispriteValues} />
            </div>

            <div className="sprite pokeball_back">
                <ImageWithFallbacks src={spritePath + path} fallbacks={fbSpriteValues} />
            </div>
        </>
    )
}
export default function ImageSet({ isShiny, imgPath, imgPathFallback, shinyExists }) {
    let path
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

    let fallback
    if (shinyExists && isShiny) {
        fallback = imgPath + '-s.webp'
    }
    else {
        fallback = imgPath + '.webp'
    }

    return (
        <>
            <div className="minisprite">
                <img
                    onError={(e) => {
                        e.target.src = '/images/pokemon/minisprite/' + defaultFallback
                    }}
                    src={'/images/pokemon/minisprite/' + path}
                    loading="lazy"
                />
            </div>
            <div className="sprite pokeball_back">
                <img
                    onError={(e) => {
                        e.target.src = '/images/pokemon/sprite/' + fallback
                    }}
                    src={'/images/pokemon/sprite/' + path}
                    loading="lazy"
                />
            </div>
        </>
    )
}
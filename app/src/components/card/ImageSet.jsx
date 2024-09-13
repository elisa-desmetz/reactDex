export default function ImageSet({ isShiny, imgPath }) {
    let path
    if (isShiny) {
        path = imgPath + '-s.webp'
    }
    else {
        path = imgPath + '.webp'
    }
    const fallback = imgPath + '.webp'

    return (
        <>
            <div className="minisprite">
                <img
                    onError={(e) => {
                        e.target.src = '/images/pokemon/minisprite/' + fallback
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
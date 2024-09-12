export default function ImageSet({ isShiny, imgPath }) {
    let path
    if (isShiny) {
        path = imgPath + '-s.webp'
    }
    else {
        path = imgPath + '.webp'
    }
    return (
        <>
            <div className="minisprite">
                <img src={'/images/pokemon/minisprite/' + path} loading="lazy" />
            </div>
            <div className="sprite pokeball_back">
                <img src={'/images/pokemon/sprite/' + path} loading="lazy" />
            </div>
        </>
    )
}
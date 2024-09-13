import { useState } from "react";
export default function ImageWithFallbacks({ src, fallbacks, counter }) {

    let init
    if (counter) {
        init = counter
    }
    else {
        init = 0
    }

    const initialState = init

    const [isBroken, setIsBroken] = useState(false);
    const [count, setCount] = useState(initialState)

    function handleError() {
        setCount((prev) => { return (prev + 1) })
        setIsBroken(true)
    }

    if (isBroken) {
        if (count <= 1) {
            return (
                <>
                    <ImageWithFallbacks src={fallbacks[0]} fallbacks={fallbacks} counter={count} />
                </>);
        }
        else {
            return (
                <img src={fallbacks[1]}
                // onLoad={(e) => { console.debug("chargée : " + e.target.src) }}
                />
            )
        }
    }

    else return (
        <>
            <img src={src}
                loading="lazy"
                onError={(e) => {
                    e.target.onError = null
                    handleError()
                }}
                // onLoad={(e) => { console.debug("chargée : " + e.target.src) }}
            />
        </>
    )
}
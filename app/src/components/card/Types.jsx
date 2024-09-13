export default function Types({ status, typeList, activeMega }) {
    return (
        <div className="types">
            {(!(status.mega) && !(status.giga)) &&
                <>
                    {typeList.regular.map((type) => (
                        <img key={type} src={"images/type/" + type[1] + ".webp"} />
                    ))}
                </>
            }
            {status.mega &&
                <>
                    {(activeMega == 'x') ?
                        <>
                            {typeList.megaX.map((type) => (
                                <img src={"images/type/" + type[1] + ".webp"} />
                            ))}
                        </>
                        :
                        <>
                            {typeList.megaY.map((type) => (
                                <img src={"images/type/" + type[1] + ".webp"} />
                            ))}
                        </>}
                </>
            }
            {status.giga &&
                <>
                    {typeList.giga.map((type) => (
                        <img src={"images/type/" + type[1] + ".webp"} />
                    ))}
                </>
            }
        </div>
    )
}
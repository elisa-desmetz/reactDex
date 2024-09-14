export default function Types({ status, typeList, activeMega }) {
    return (
        <div className="types">
            {!(status.mega) &&
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
                                <img key={type} src={"images/type/" + type[1] + ".webp"} />
                            ))}
                        </>
                        :
                        <>
                            {typeList.megaY.map((type) => (
                                <img key={type} src={"images/type/" + type[1] + ".webp"} />
                            ))}
                        </>}
                </>
            }
        </div>
    )
}
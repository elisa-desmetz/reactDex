export default function ShinyToggle({ updater, exists, isShiny }) {
    return (
        <label className="labelToggle" name="toggleShiny">
            {exists ?
                <input
                    onClick={() => {
                        updater()
                    }}
                    type="checkbox"
                    className="hiddenInput"
                />
                :
                <input
                    type="checkbox"
                    className="hiddenInput"
                    disabled
                />
            }
            {exists ?
                <>
                    {isShiny ?
                        <div className="btnToggle shiny checked" /> :
                        <div className="btnToggle shiny" />
                    }
                </>
                :
                <div
                    className="btnToggle shiny disabled"
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                />
            }
        </label>
    )
}

export function MegaToggle({ updater, status }) {
    return (
        <label className="labelToggle" name="toggleMega">
            <input
                onClick={() => {
                    updater.mega()
                    if (status.giga) {
                        updater.giga()
                    }
                }}
                type="checkbox"
                className="hiddenInput" />
            {status.mega ?
                <div className="btnToggle mega checked" /> :
                <div className="btnToggle mega" />
            }
        </label>
    )
}

export function GigaToggle({ updater, status }) {
    return (
        <label className="labelToggle" name="toggleGiga">
            <input
                onClick={() => {
                    updater.giga()
                    if (status.mega) {
                        updater.mega()
                    }
                }}
                type="checkbox"
                className="hiddenInput" />
            {status.giga ?
                <div className="btnToggle giga checked" /> :
                <div className="btnToggle giga" />
            }
        </label>
    )
}
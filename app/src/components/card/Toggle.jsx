export default function ShinyToggle({ updater, exists }) {
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
                    onClick={(e) => {
                        updater()
                    }}
                    type="checkbox"
                    className="hiddenInput"
                    disabled
                />
            }
            {exists ?
                <div className="btnToggle shiny" />
                :
                <div className="btnToggle shiny disabled" />
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
            <div className="btnToggle mega" />
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
            <div className="btnToggle giga" />
        </label>
    )
}
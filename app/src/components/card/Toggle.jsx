
import { AnimatePresence, motion } from "framer-motion"

export default function ShinyToggle({ updater, isShiny }) {
    return (
        <label className="labelToggle" name="toggleShiny">
            <input
                onClick={(e) => {
                    updater()
                }}
                type="checkbox"
                className="hiddenInput" />
            <AnimatePresence>
                <motion.div
                    className="btnToggle shiny"
                    initial={{ boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.7)" }}
                    animate={{
                        filter: isShiny ? "saturate(100%)" : "saturate(10%)",
                        boxShadow: isShiny ? "0 0 0 2px rgba(255, 255, 255, 0.7), inset 0 0 5px rgba(255, 51, 96,0.6)" : "",
                    }}
                    transition={{ duration: 0.1 }}
                    whileHover={{ boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.7), inset 0 0 5px #CDCDCD" }} />
            </AnimatePresence>
        </label>
    )
}

export function MegaToggle({ updater, status }) {
    return (
        <label className="labelToggle" name="toggleMega">
            <input
                onClick={(e) => {
                    updater.mega()
                    if (status.giga) {
                        updater.giga()
                    }
                }}
                type="checkbox"
                className="hiddenInput" />
            <AnimatePresence>
                <motion.div
                    className="btnToggle mega"
                    initial={{ boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.7)" }}
                    animate={{
                        filter: status.mega ? "saturate(100%)" : "saturate(10%)",
                        boxShadow: status.mega ? "0 0 0 2px rgba(255, 255, 255, 0.7), inset 0 0 5px rgba(2,169,167,0.8)" : "",
                    }}
                    transition={{ duration: 0.1 }}
                    whileHover={{ boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.7), inset 0 0 5px #CDCDCD" }} />
            </AnimatePresence>
        </label>
    )
}

export function GigaToggle({ updater, status }) {
    return (
        <label className="labelToggle" name="toggleGiga">
            <input
                onClick={(e) => {
                    updater.giga()
                    if (status.mega) {
                        updater.mega()
                    }
                }}
                type="checkbox"
                className="hiddenInput" />
            <AnimatePresence>
                <motion.div
                    className="btnToggle giga"
                    initial={{ boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.7)" }}
                    animate={{
                        filter: status.giga ? "saturate(100%)" : "saturate(10%)",
                        boxShadow: status.giga ? "0 0 0 2px rgba(255, 255, 255, 0.7), inset 0 0 5px rgba(231,0,64,0.8)" : "0 0 0 2px rgba(255, 255, 255, 0.7)",
                    }}
                    transition={{ duration: 0.1 }}
                    whileHover={{ boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.7), inset 0 0 5px #CDCDCD" }} />
            </AnimatePresence>
        </label>
    )
}
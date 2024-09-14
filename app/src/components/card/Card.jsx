import Front from "./Front";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Card({ pokemon, tables }) {

    const initialState = { flip: true, isShiny: false, isMega: false, isGiga: false };

    const [isShiny, setShiny] = useState(initialState.isShiny);
    const [isMega, setMega] = useState(initialState.isMega);
    const [isGiga, setGiga] = useState(initialState.isGiga);

    const [flip, setFlip] = useState(initialState.flip);

    const neverEncountered = {
        discoveredBy: "-",
        areaName: tables.area.at(0).name,
        areaImg: tables.area.at(0).img,
        description: "Cette espèce n'a pas encore été rencontrée."
    }

    function toggleShiny() {
        setShiny((prev) => !prev)
    }

    function toggleMega() {
        setMega((prev) => !prev)
    }

    function toggleGiga() {
        setGiga((prev) => !prev)
    }

    return (
        <AnimatePresence>
            <motion.div
                transition={{ duration: 0.7 }}
                animate={{ rotateY: flip ? 0 : 180 }}
            >
                <motion.div
                    transition={{ duration: 0.7 }}
                    animate={{ rotateY: flip ? 0 : 180 }}
                    className="card"
                    onClick={(e) => {
                        e.stopPropagation
                        setFlip((prevState) => !prevState)
                    }}>

                    <motion.div
                        key="front"
                        className="front"
                        transition={{ duration: 0.7 }}
                        animate={{ rotateY: flip ? 0 : 180 }}
                        exit={{ opacity: 0 }}>

                        <Front
                            pokemon={pokemon}
                            status={{
                                shiny: isShiny,
                                mega: isMega,
                                giga: isGiga,
                            }}
                            types={tables.type}
                            updater={{
                                shiny: toggleShiny,
                                mega: toggleMega,
                                giga: toggleGiga,
                            }}
                        />

                    </motion.div>

                    <motion.div
                        key="back"
                        className="back"
                        style={!pokemon.reg_discovered_by ?
                            {
                                backgroundImage:
                                    `linear-gradient(
                                    rgba(var(--bkg-card), 0.8),
                                    transparent 50%),
                                    url("${neverEncountered.areaImg}")`
                            }
                            :
                            {
                                backgroundImage:
                                    `linear-gradient(
                                    rgba(var(--bkg-card), 0.8) 15%,
                                    transparent 50%),
                                    url("${tables.area.at(pokemon.area_id).img}")`
                            }
                        }
                        initial={{ rotateY: 180 }}
                        transition={{ duration: 0.7 }}
                        animate={{ rotateY: flip ? 180 : 0 }}
                        exit={{ opacity: 1 }}>

                        {!pokemon.reg_discovered_by ?
                            <Back
                                data={{
                                    discoveredBy: neverEncountered.discoveredBy,
                                    areaName: neverEncountered.areaName,
                                    areaImg: neverEncountered.areaImg,
                                    description: neverEncountered.description,
                                }}
                            />
                            :
                            <Back
                                data={{
                                    discoveredBy: pokemon.reg_discovered_by,
                                    areaName: tables.area.at(pokemon.area_id).name,
                                    areaImg: tables.area.at(pokemon.area_id).img,
                                    description: pokemon.desc,
                                }}
                            />
                        }
                    </motion.div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

function Back({ data }) {
    return (
        <>
            <div className="areaName">{data.areaName}</div>
            <div className="discoveredBy">{data.discoveredBy}</div>
            <div className="description">{data.description}</div>
        </>
    )
}


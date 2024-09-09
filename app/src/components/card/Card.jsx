import Identity from "../Identity";
import Gallery from "./Gallery";
import Type from "./images/Type";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import createCornerGradient from "../../../utils/createCornerGradient";

export default function Card({ pokemon, tables }) {

    const initialState = {flip:true, isShiny:false};
    
    const [isShiny, setShiny] = useState(initialState.isShiny);

    const [flip, setFlip] = useState(initialState.flip);

    const neverEncountered = {
        discoveredBy: "-",
        areaName: tables.area.at(0).name,
        areaImg: tables.area.at(0).img,
        description: "Cette espèce n'a pas encore été rencontrée."
    }

    function toggleShiny(){
        setShiny((prev) => !prev)
        console.debug(isShiny)
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
                        whileTap={{ scale: 1.1 }}
                        exit={{ opacity: 0 }}>

                        <Front pokemon={pokemon} isShiny={isShiny} types={tables.type} updater={toggleShiny} />

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
                            } : {
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
                        whileTap={{ scale: 1.2 }}
                        exit={{ opacity: 1 }}>

                        {!pokemon.reg_discovered_by ?
                            <Back data={{
                                discoveredBy: neverEncountered.discoveredBy,
                                areaName: neverEncountered.areaName,
                                areaImg: neverEncountered.areaImg,
                                description: neverEncountered.description,
                            }} /> :
                            <Back data={{
                                discoveredBy: pokemon.reg_discovered_by,
                                areaName: tables.area.at(pokemon.area_id).name,
                                areaImg: tables.area.at(pokemon.area_id).img,
                                description: pokemon.desc,
                            }} />
                        }
                    </motion.div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

function Front({ pokemon, isShiny, types, updater }) {
    const typeList = Object.entries(pokemon.reg_type);
    const gallery = Object.entries(pokemon.reg_galerie);
    const cornerGradient = createCornerGradient(types, Object.values(pokemon.reg_type))

    return (
        <>
            <Identity name={{ fr: pokemon.name_fr, en: pokemon.name_en }} num={pokemon.pokedex_id} />
            <div className="types">
                {typeList.map((type) => (
                    <Type key={type[0]} type={type[1]} tbTypes={types} />
                ))}
            </div>
            {/* .at(0) pour tester sur la premiere image sans avoir à implémenter le controller */}
            <Gallery imgList={{gallery:gallery, isShiny:isShiny}} updater={updater} gradient={cornerGradient}/>
        </>
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


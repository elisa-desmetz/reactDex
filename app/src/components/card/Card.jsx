import Identity from "../Identity";
import Gallery from "./Gallery";
import Type from "./images/Type";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import createCornerGradient from "../../../utils/createCornerGradient";

export default function Card({ pokemon, tables }) {

    const initialState = { flip: true, isShiny: false, isMega: false };

    const [isShiny, setShiny] = useState(initialState.isShiny);
    const [isMega, setMega] = useState(initialState.isMega)

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
                            status={{ shiny: isShiny, mega: isMega }}
                            types={tables.type}
                            updater={{ shiny: toggleShiny, mega: toggleMega }} />

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

function Front({ pokemon, status, types, updater }) {

    const regularTypeList = Object.entries(pokemon.reg_type);
    const regularGallery = Object.entries(pokemon.reg_galerie);

    const megaExists = pokemon.megax_type && pokemon.megax_galerie


    let megaXTypeList
    let megaYTypeList
    if (pokemon.megax_type) {
        megaXTypeList = Object.entries(pokemon.megax_type)
    }
    if (pokemon.megay_type) {
        megaYTypeList = Object.entries(pokemon.megay_type)
    }

    let megaXGallery
    let megaYGallery
    if (pokemon.megax_galerie) {
        megaXGallery = Object.entries(pokemon.megax_galerie)
    }
    if (pokemon.megay_galerie) {
        megaYGallery = Object.entries(pokemon.megay_galerie)
    }

    const initialState = { mega: 'x' }

    const [activeMega, setActiveMega] = useState(initialState.mega)

    function updateMega() {
        setActiveMega((prev) => {
            if (prev == initialState.mega) {
                return 'y'
            }
            else {
                return initialState.mega
            }
        })
    }

    
    let cornerGradient 
    if (!status.mega){
        cornerGradient = createCornerGradient(types, Object.values(pokemon.reg_type))
    }
    else {
        if (activeMega == 'x') {
            cornerGradient = createCornerGradient(types, Object.values(pokemon.megax_type))
        }
        else {
            cornerGradient = createCornerGradient(types, Object.values(pokemon.megay_type))
        }
    }

    return (
        <>
            <Identity name={{ fr: pokemon.name_fr, en: pokemon.name_en }} num={pokemon.pokedex_id} />
            <div className="types">
                {!(status.mega) ?
                    <>
                        {regularTypeList.map((type) => (
                            <Type key={type[0]} type={type[1]} tbTypes={types} />
                        ))}
                    </> :
                    <>
                        {(activeMega == 'x') ?
                            <>
                                {megaXTypeList.map((type) => (
                                    <Type key={type[0]} type={type[1]} tbTypes={types} />
                                ))}
                            </>
                            :
                            <>
                                {megaYTypeList.map((type) => (
                                    <Type key={type[0]} type={type[1]} tbTypes={types} />
                                ))}
                            </>}
                    </>}

            </div>
            <Gallery
                imgList={{ regular: regularGallery, megaX:megaXGallery, megaY:megaYGallery }}
                status={status}
                mega={{exists:megaExists, active:activeMega}}
                updater={{
                    toggleShiny: updater.shiny,
                    toggleMega: updater.mega,
                    updateMega: updateMega
                }}
                gradient={cornerGradient} />
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


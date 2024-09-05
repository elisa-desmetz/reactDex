import Identity from "../Identity";
import Gallery from "./Gallery";
import Type from "./images/Type";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Card({ pokemon, tables }) {
    const [flip, setFlip] = useState(true);
    const neverEncountered = {
        discoveredBy: "-",
        areaName: tables.area.at(0).name,
        areaImg: tables.area.at(0).img,
        description: "Cette espèce n'a pas encore été rencontrée."
    }
    return (
        <motion.div
            transition={{ duration: 0.7 }}
            animate={{ rotateY: flip ? 0 : 180 }}
        >
            <motion.div
                transition={{ duration: 0.7 }}
                animate={{ rotateY: flip ? 0 : 180 }}
                className="card"
                onClick={() => setFlip((prevState) => !prevState)}>

                <motion.div
                    className="front"
                    transition={{ duration: 0.7 }}
                    animate={{ rotateY: flip ? 0 : 180 }}
                    whileTap={{ scale: 1.2 }}
                    exit={{ opacity: 0 }}>

                    <Front pokemon={pokemon} types={tables.type} />

                </motion.div>

                <motion.div
                    className="back"
                    style={!pokemon.reg_discovered_by ?                        
                        {
                        backgroundImage: 
                        `linear-gradient(
                            rgba(var(--bkg-card), 0.8),
                            transparent 50%),
                        url("${neverEncountered.areaImg}")`
                    }:{
                        backgroundImage: 
                        `linear-gradient(
                            rgba(var(--bkg-card), 0.8) 15%,
                            transparent 50%),
                        url("${tables.area.at(pokemon.area_id).img}")`}
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
    )
}

function Front({ pokemon, types }) {
    const typeList = Object.entries(pokemon.reg_type);
    const gallery = Object.entries(pokemon.reg_galerie);

    return (
        <>
            <Identity name={{ fr: pokemon.name_fr, en: pokemon.name_en }} num={pokemon.pokedex_id} />
            <div className="types">
                {typeList.map((type) => (
                    <Type key={type.at(0)} type={type.at(1)} tbTypes={types} />
                ))}
            </div>
            {/* .at(0) pour tester sur la premiere image sans avoir à implémenter le controller */}
            <Gallery imgList={gallery.at(0)} />
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


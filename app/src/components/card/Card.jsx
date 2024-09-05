import Identity from "../Identity";
import Gallery from "./Gallery";
import Type from "./images/Type";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Card({ pokemon, tables }) {
    const [flip, setFlip] = useState(true);
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
                    <Front pokemon={pokemon} tables={tables} />
                </motion.div>
                <motion.div
                    className="back"
                    initial={{ rotateY: 180 }}
                    transition={{ duration: 0.7 }}
                    animate={{ rotateY: flip ? 180 : 0 }}
                    whileTap={{ scale: 1.2 }}
                    exit={{ opacity: 1 }}>
                    Back
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

function Front({ pokemon, tables }) {
    const typeList = Object.entries(pokemon.reg_type);
    const gallery = Object.entries(pokemon.reg_galerie);

    return (
        <>
            <Identity name={{ fr: pokemon.name_fr, en: pokemon.name_en }} num={pokemon.pokedex_id} />
            <div className="types">
                {typeList.map((type) => (
                    <Type key={type.at(0)} type={type.at(1)} tbTypes={tables.type} />
                ))}
            </div>
            {/* .at(0) pour tester sur la premiere image sans avoir à implémenter le controller */}
            <Gallery imgList={gallery.at(0)} />
        </>
    )
}
import slugify from "../../utils/slugify";

import { motion } from "framer-motion"

import Identity from "./Identity";
import Type from "./images/Type";
import Gallery from "./Gallery";

export default function PokedexList({ tbPokedex, tbTypes, tbAreas }) {
    return (
        <>
            {tbPokedex.map((pokemon, index) => (
                <motion.div
                    key={index}
                    layout
                    initial={{ transform: "scale(0)" }}
                    animate={{ transform: "scale(1)" }}
                    exit={{ transform: "scale(0)" }}
                >
                    <Card key={slugify(pokemon.name_fr)} pokemon={pokemon} tbTypes={tbTypes} tbAreas={tbAreas} />
                </motion.div>
            ))}
        </>)
}

function Card({ pokemon, tbTypes, tbAreas }) {
    const typeList = Object.entries(pokemon.reg_type);
    const gallery = Object.entries(pokemon.reg_galerie);

    return (
        <div className="card">
            <Identity name={{ fr: pokemon.name_fr, en: pokemon.name_en }} num={pokemon.pokedex_id} />
            <div className="types">
                {typeList.map((type) => (
                    <Type key={type.at(0)} type={type.at(1)} tbTypes={tbTypes} />
                ))}
            </div>
            {/* .at(0) pour tester sur la premiere image sans avoir à implémenter le controller */}
            <Gallery imgList={gallery.at(0)} />
        </div>
    )
}
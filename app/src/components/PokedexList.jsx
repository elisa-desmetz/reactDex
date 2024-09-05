import slugify from "../../utils/slugify";

import { AnimatePresence, motion } from "framer-motion";

import Card from "./card/Card";

export default function PokedexList({ tables }) {
    return (
        <>
            <AnimatePresence>
                {tables.pokedex.map((pokemon, index) => (
                    <motion.div
                        key={index}
                        layout
                        initial={{ transform: "scale(0)" }}
                        animate={{ transform: "scale(1)" }}
                        exit={{ transform: "scale(0)" }}
                    >
                        <Card
                            key={slugify(pokemon.name_fr)}
                            pokemon={pokemon}
                            tables={{ type: tables.type, area: tables.area }} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </>)
}
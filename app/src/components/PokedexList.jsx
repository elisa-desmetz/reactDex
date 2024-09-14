import slugify from "../../utils/slugify";

import { AnimatePresence, motion } from "framer-motion";

import Card from "./card/Card";

export default function PokedexList({ tables }) {
    return (
        <>
                {tables.pokedex.map((pokemon, index) => (
                    <div
                        key={index}
                        layout
                        initial={{ display: "none" }}
                        animate={{ display: "block" }}
                        exit={{ display: "none" }}
                    >
                        <Card
                            key={slugify(pokemon.name_fr)}
                            pokemon={pokemon}
                            tables={{ type: tables.type, area: tables.area }} />
                    </div>
                ))}
        </>)
}

/*
export default function PokedexList({ tables }) {
    return (
        <>
            <AnimatePresence>
                {tables.pokedex.map((pokemon, index) => (
                    <motion.div
                        key={index}
                        layout
                        initial={{ display: "none" }}
                        animate={{ display: "block" }}
                        exit={{ display: "none" }}
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
        */
import slugify from "../../public/utils/slugify";

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
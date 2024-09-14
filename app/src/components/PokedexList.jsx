import slugify from "../../utils/slugify";

import Card from "./card/Card";

export default function PokedexList({ tables }) {


    
    return (
        <>
            {tables.pokedex.map((pokemon) => (


                <Card
                    key={slugify(pokemon.pokedex_id + "-" + pokemon.variant + "-" + pokemon.forme)}
                    pokemon={pokemon}
                    tables={{ type: tables.type, area: tables.area }} />


            ))}
        </>)
}
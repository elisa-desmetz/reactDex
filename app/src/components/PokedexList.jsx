import slugify from "../../utils/slugify";

import Identity from "./Identity";
import Type from "./images/Type";
import Gallery from "./Gallery";

export default function PokedexList({ tbPokedex, tbTypes, tbAreas }) {
    return (
        <>
            {tbPokedex.map((pokemon) => (
                <Card key={slugify(pokemon.name_fr)} pokemon={pokemon} tbTypes={tbTypes} tbAreas={tbAreas} />
            ))}
        </>)
}

function Card({ pokemon, tbTypes, tbAreas }) {
    const typeList = Object.entries(pokemon.reg_type);
    const gallery = Object.entries(pokemon.reg_galerie);

    let filterData = "card filterItem"
    filterData = filterData.concat(" "+slugify(pokemon.name_fr))
    filterData = filterData.concat(" "+slugify(pokemon.name_en))
    typeList.forEach((type) => {
        filterData = filterData.concat(" "+slugify(tbTypes.at(type.at(1) - 1).name))
    })

    return (
        <div className={filterData}>
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
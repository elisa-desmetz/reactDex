import Identity from "./Identity";
import Gallery from "./Gallery";
import Types from "./Types";

import { useState } from "react";

import createCornerGradient from "../../../utils/createCornerGradient";

export default function Front({ pokemon, status, types, updater }) {

    const imgPath = pokemon.pokedex_id + "-" + pokemon.variant + "-" + pokemon.forme

    const regularTypeList = Object.entries(pokemon.reg_type);
    const regularGallery = Object.entries(pokemon.reg_galerie);

    const megaXExists = pokemon.megax_type;
    const megaYExists = pokemon.megay_type;
    const gigaExists = pokemon.giga_type;

    // Mega types
    let megaXTypeList;
    let megaYTypeList;
    if (pokemon.megax_type) {
        megaXTypeList = Object.entries(pokemon.megax_type);
    }
    if (pokemon.megay_type) {
        megaYTypeList = Object.entries(pokemon.megay_type);
    }

    // Giga types
    let gigaTypeList
    if (pokemon.giga_type) {
        gigaTypeList = Object.entries(pokemon.giga_type)
    }

    // Active mega
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
    if (!status.mega && !status.giga) {
        cornerGradient = createCornerGradient(types, Object.values(pokemon.reg_type))
    }
    else if (status.mega) {
        if (activeMega == 'x') {
            cornerGradient = createCornerGradient(types, Object.values(pokemon.megax_type))
        }
        else {
            cornerGradient = createCornerGradient(types, Object.values(pokemon.megay_type))
        }
    }
    else if (status.giga) {
        cornerGradient = createCornerGradient(types, Object.values(pokemon.giga_type))
    }

    return (
        <>
            <Identity
                name={{ fr: pokemon.name_fr, en: pokemon.name_en }}
                num={pokemon.pokedex_id}
            />
            <Types
                status={status}
                typeList={{
                    regular: regularTypeList,
                    megaX: megaXTypeList,
                    megaY: megaYTypeList,
                    giga: gigaTypeList
                }}
                activeMega={activeMega} />

            <Gallery
                imgPath={{
                    regular: imgPath,
                    megaX: imgPath + '-mx',
                    megaY: imgPath + '-my',
                    giga: imgPath + '-g'
                }}
                regularGallery={regularGallery}
                status={status}
                mega={{
                    exists: { x: megaXExists, y: megaYExists },
                    current: activeMega
                }}
                giga={{ exists: gigaExists }}
                updater={{
                    toggleShiny: updater.shiny,
                    toggleMega: updater.mega,
                    toggleGiga: updater.giga,
                    updateMega: updateMega,
                }}
                gradient={cornerGradient}
            />
        </>
    )
}
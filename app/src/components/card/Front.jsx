import Identity from "../Identity";
import Gallery from "./Gallery";
import Type from "./images/Type";

import { useState } from "react";

import createCornerGradient from "../../../utils/createCornerGradient";

export default function Front({ pokemon, status, types, updater }) {

    const regularTypeList = Object.entries(pokemon.reg_type);
    const regularGallery = Object.entries(pokemon.reg_galerie);

    const megaExists = pokemon.megax_type && pokemon.megax_galerie;
    const gigaExists = pokemon.giga_type && pokemon.giga_galerie;

    // Mega types
    let megaXTypeList;
    let megaYTypeList;
    if (pokemon.megax_type) {
        megaXTypeList = Object.entries(pokemon.megax_type);
    }
    if (pokemon.megay_type) {
        megaYTypeList = Object.entries(pokemon.megay_type);
    }

    // Mega images
    let megaXGallery;
    let megaYGallery;
    if (pokemon.megax_galerie) {
        megaXGallery = Object.entries(pokemon.megax_galerie);
    }
    if (pokemon.megay_galerie) {
        megaYGallery = Object.entries(pokemon.megay_galerie);
    }

    // Giga types
    let gigaTypeList
    if (pokemon.giga_type) {
        gigaTypeList = Object.entries(pokemon.giga_type)
    }

    // Giga images
    let gigaGallery
    if (pokemon.giga_galerie) {
        gigaGallery = Object.entries(pokemon.giga_galerie);
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
            <div className="types">
                {(!(status.mega) && !(status.giga)) &&
                    <>
                        {regularTypeList.map((type) => (
                            <Type key={type[0]} type={type[1]} tbTypes={types} />
                        ))}
                    </>
                }
                {status.mega &&
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
                    </>
                }
                {status.giga &&
                    <>
                        {gigaTypeList.map((type) => (
                            <Type key={type[0]} type={type[1]} tbTypes={types} />
                        ))}
                    </>
                }
            </div>

            <Gallery
                imgList={{
                    regular: regularGallery,
                    megaX: megaXGallery,
                    megaY: megaYGallery,
                    giga: gigaGallery,
                }}
                status={status}
                mega={{
                    exists: megaExists,
                    active: activeMega
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
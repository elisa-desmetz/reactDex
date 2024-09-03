import slugify from "../../utils/slugify";
import Identity from "./Identity";
import Type from "./images/Type";
import Gallery from "./Gallery";

export default function Card({pkmn, tbTypes}) {
    const typeList = Object.entries(pkmn.reg_type);
    const gallery = Object.entries(pkmn.reg_galerie);

    return (
        <div className="card">
            <Identity name={{fr:pkmn.name_fr, en:pkmn.name_en}} num={pkmn.pokedex_id}/>
            <div className="types">
            {typeList.map((elem) => (
                <Type key={elem.at(0)} type={elem.at(1)} tbTypes={tbTypes}/>
            ))}
            </div>
            {/* .at(0) pour tester sur la premiere image sans avoir à implémenter le controller */}
            <Gallery imgList={gallery.at(0)} />
        </div>
    )
}
import slugify from "../../../utils/slugify"

import Collapsible from "./Collapsible"


// Créer la section de la page correspondant aux critères de recherche
export default function FilterForm({ tables, reset, updater }) {
    return (
        <form id="filterForm">
            <div id="miscFilter">
                <MiscFilters
                    updater={{
                        text: updater.text,
                        generation: updater.generation,
                        variant: updater.variant,
                    }} />
                <button
                    id="btnReset"
                    type="reset"
                    onClick={reset}
                >
                    Reset
                </button>
            </div>
            <Collapsible title={"Type"}>
                <TypeFilter
                    tbTypes={tables.type}
                    updater={updater.type} />
            </Collapsible>
            <Collapsible title={"Zones de Capture"}>
                <AreaFilter
                    tbArea={tables.area}
                    updater={updater.area} />
            </Collapsible>
        </form>
    )
}

// Créer la section des critères divers : recherche textuelle, génération, région, bouton reset du formulaire
function MiscFilters({ updater }) {
    return (
        <>
            <TextFilter updater={updater.text} />
            <GenerationFilter updater={updater.generation} />
            <VariantFilter updater={updater.variant} />
        </>
    )
}

function TextFilter({ updater }) {
    return (
        <div id="textSearch">
            <div className="titleFilter">Nom&nbsp;</div>
            <input
                id="textfield"
                type="search"
                placeholder="Rechercher"
                onChange={(e) => {
                    updater(e.target.value)
                }}
            />
        </div>
    )
}

function GenerationFilter({ updater }) {
    return (
        <div id="generationFilter">
            <div className="titleFilter">Génération&nbsp;</div>
            {Array.from(Array(9), (e, i) =>
                <GenerationButton value={i + 1} key={i + 1} updater={updater} />
            )}
        </div>
    )
}

function GenerationButton({ value, updater }) {
    return (
        <label className="lbFilter generation">
            <input
                className="hiddenInput"
                type="checkbox"
                onClick={(e) => updater(e.target.checked, value)}
            />
            <div className="btn gen">
                {value + 'g'}
            </div>
        </label>
    )
}

function VariantFilter({ updater }) {
    const tbRegions = ["Alola", "Galar", "Hisui", "Paldea"];
    return (
        <div id="variantFilter">
            <div className="titleFilter">Variant&nbsp;</div>
            {tbRegions.map((region) =>
                <VariantButton
                    key={slugify(region)}
                    region={{
                        name: region,
                        value: tbRegions.indexOf(region) + 1
                    }}
                    updater={updater} />
            )}
        </div>
    )
}

function VariantButton({ region, updater }) {
    return (
        <label className="lbFilter variant">
            <input
                className="hiddenInput"
                type="checkbox"
                onClick={(e) => updater(e.target.checked, region.value)}
            />
            <div className="btn var">
                {region.name}
            </div>
        </label>
    )
}

function TypeFilter({ tbTypes, updater }) {
    return (
        <div id="typesFilter">
            <div id="typeButtonList">
                {tbTypes.map((type) => (
                    <TypeButton
                        key={slugify(type.name)}
                        updater={updater}
                        type={type}
                    />
                ))}
            </div>
        </div>
    )
}

function TypeButton({ type, updater }) {
    return (
        <label className="lbFilter">
            <input
                className="hiddenInput"
                type="checkbox"
                onClick={e => {
                    e.stopPropagation();
                    updater(e.target.checked, type.id_type)

                }}
            />
            <div
                className="btn filter type"
                style={{ backgroundColor: 'var(--color-' + slugify(type.name) + ')' }}
            >
                <img src={"images/type/"+type.id_type+"-mini.webp"} />
                <div>
                    {type.name}
                </div>
            </div>
        </label>
    )
}

function AreaFilter({ tbArea, updater }) {
    return (
        <div id="areasFilter">
            <div id="areaButtonList">
                {tbArea.filter((area) => area.id > 0).map((area) => (
                    <AreaButton
                        key={area.id}
                        area={area}
                        updater={updater}
                    />
                ))}
            </div>
        </div>
    )
}

function AreaButton({ area, updater }) {
    return (
        <label className="lbFilter">
            <input
                className="hiddenInput"
                type="checkbox"
                onClick={(e) => updater(e.target.checked, area.id)}
            />
            <div className="btn filter area">
                {area.name}
            </div>
        </label>
    )
}

/*
function Collapsible({ title }) {
    return (
        <div className="collapsible active">{title}</div>
    )
}
*/
import slugify from "../../../utils/slugify"
import "../../assets/css/filters.css"
import * as React from 'react';
import { useEffect, useState } from 'react';


// Créer la section de la page correspondant aux critères de recherche
export default function FilterForm({ tables, reset, updater }) {
    return (
        <form id="filterForm">
        <div id="miscFilter">
            <MiscFilters
                updater={{
                    text: updater.text,
                    generation: updater.generation
                }} />
            <button id="btnReset" type="reset" onClick={reset}>Reset</button>
            </div>
            <TypeFilter
                tbTypes={tables.type}
                updater={updater.type} />
            <AreaFilter
                tbArea={tables.area}
                updater={updater.area} />
        </form>
    )
}

// Créer la section des critères divers : recherche textuelle, génération, région, bouton reset du formulaire
function MiscFilters({ updater }) {
    return (
            <div id="quicksearch">
                <div className="desc">Nom&nbsp;</div>
                <SearchField updater={updater.text} />
            </div>
    )
}

function SearchField({ updater }) {
    return (
        <>
            <input id="textfield" type="search" placeholder="Rechercher"
                onChange={(e) => {
                    updater(e.target.value)
                }} />
        </>
    )
}

function TypeFilter({ tbTypes, updater }) {
    return (
        <div id="typesFilter">
            <Collapsible title={'Types'} />
            <div id="typeButtonList">
                {tbTypes.map((type) => (
                    <TypeButton key={slugify(type.name)} updater={updater} type={type} />
                ))}
            </div>
        </div>
    )
}

function TypeButton({ type, updater }) {
    return (
        <label className="lbType">
            <input type="checkbox" onClick={(e) => updater(e.target.checked, type.id_type)} />
            <div className="btnType" style={{ backgroundColor: 'var(--color-' + slugify(type.name) + ')' }}>
                <img src={type.icon_mini} />
                <div>{type.name}</div>
            </div>
        </label>
    )
}

function AreaFilter({ tbArea, updater }) {
    return (
        <div id="areasFilter">
            <Collapsible title={'Zone de Capture'} />
            <div id="areaButtonList">
                {tbArea.filter((area) => area.id > 0).map((area) => (
                    <AreaButton key={area.id} area={area} updater={updater} />
                ))}
            </div>
        </div>
    )
}

function AreaButton({ area, updater }) {
    return (
        <label className="lbArea">
            <input type="checkbox" onClick={(e) => updater(e.target.checked, area.id)} />
            <div className="btnArea">{area.name}</div>
        </label>
    )
}

function Collapsible({ title }) {
    return (
        <div className="collapsible active">{title}</div>
    )
}
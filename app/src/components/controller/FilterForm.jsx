import slugify from "../../../utils/slugify"
import "../../assets/css/filters.css"
import * as React from 'react';
import { useEffect, useState } from 'react';

export default function FilterForm({tbTypes, tbArea, onTypeChange, onAreaChange}){
    return(
        <form id="filterForm">
            <MiscFilters />
            <TypeFilter tbTypes={tbTypes} onChange={onTypeChange}/>
            <AreaFilter tbArea={tbArea} onChange={onAreaChange}/>
        </form>
    )
}

function MiscFilters(){
    return(
        <div id="miscFilter">

        </div>
    )
}

function TypeFilter({tbTypes, onChange}){
    return(
        <div id="typesFilter">
            <Collapsible title={'Types'}/>
            <div id="typeButtonList">
                {tbTypes.map((type) => (
                    <TypeButton key={slugify(type.name)} onChange={onChange} type={type}/>
                ))}
            </div>
        </div>
    )
}

function TypeButton({type, onChange}){


    return (
        <label className="lbType">
            <input type="checkbox" onChange={(e) => onChange(e.target.checked, type.id_type)}/>
            <div className="btnType" style={{backgroundColor: 'var(--color-'+slugify(type.name)+')'}}>
                <img src={type.icon_mini}/>
                <div>{type.name}</div>
            </div>
        </label>
    )
}

function AreaFilter({tbArea, onChange}){
    return(
        <div id="areasFilter">
            <Collapsible title={'Zone de Capture'}/>
            <div id="areaButtonList">
                {tbArea.filter((area) => area.id > 0).map((area) =>(
                    <AreaButton key={area.id} area={area} onChange={onChange}/>
                ))}
            </div>
        </div>
    )
}

function AreaButton({area, onChange}){
    return (
        <label className="lbArea">
            <input type="checkbox" onChange={(e) => onChange(e.target.checked, area.id)}/>
            <div className="btnArea">{area.name}</div>
        </label>
    )
}

function Collapsible({title}){
    return (
        <div className="collapsible active">{title}</div>
    )
}
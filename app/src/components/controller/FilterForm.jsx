import slugify from "../../../utils/slugify"
import "../../assets/css/filters.css"

export default function FilterForm({tbTypes, tbArea}){
    return(
        <form id="filterForm">
            <MiscFilters />
            <TypeFilter tbTypes={tbTypes}/>
            <AreaFilter tbArea={tbArea}/>
        </form>
    )
}

function MiscFilters(){
    return(
        <div id="miscFilter">

        </div>
    )
}

function TypeFilter({tbTypes}){
    return(
        <div id="typesFilter">
            <Collapsible title={'Types'}/>
            <div id="typeButtonList">
                {tbTypes.map((type) => (
                    <TypeButton key={slugify(type.name)} type={type}/>
                ))}
            </div>
        </div>
    )
}

function TypeButton({type}){
    return (
        <label className="lbType">
            <input type="checkbox" value = {"." + slugify(type.name)}/>
            <div className="btnType" style={{backgroundColor: 'var(--color-'+slugify(type.name)+')'}}>
                <img src={type.icon_mini}/>
                <div>{type.name}</div>
            </div>
        </label>
    )
}

function AreaFilter({tbArea}){
    return(
        <div id="areasFilter">
            <Collapsible title={'Zone de Capture'}/>
            <div id="areaButtonList">
                {tbArea.filter((area) => area.id > 0).map((area) =>(
                    <AreaButton key={area.id} area={area}/>
                ))}
            </div>
        </div>
    )
}

function AreaButton({area}){
    return (
        <label className="lbArea">
            <input type="checkbox" value = {"." + slugify(area.name)}/>
            <div className="btnArea">{area.name}</div>
        </label>
    )
}

function Collapsible({title}){
    return (
        <div className="collapsible active">{title}</div>
    )
}
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
                    <TypeButton type={type}/>
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
        </div>
    )
}

function Collapsible({title}){
    return (
        <div className="collapsible active">{title}</div>
    )
}
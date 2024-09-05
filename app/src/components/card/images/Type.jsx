export default function Type({type, tbTypes}){
    return (
        <>
            <img src={tbTypes.at(type-1).icon}/>
        </>
    )
}
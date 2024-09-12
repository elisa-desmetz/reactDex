export default function Identity({name, num}){
    return (
        <>
        <div className="nameFr">{name.fr}</div>
        <div className="nameEn">{name.en}</div>
        <div className="num">{"#"+String(num).padStart(3, "0")}</div>
        </>
    )
}
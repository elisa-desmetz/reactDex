import '../../assets/css/pokeball.css'

export default function Sprite({img}){
    return (
        <div className="sprite pokeball_back">
            <img src={img}/>
        </div>
    )
}
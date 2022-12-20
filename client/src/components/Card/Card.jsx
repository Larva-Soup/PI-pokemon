

export default function Card({name,image,types}){
    return(
        <div>
            <h2>{name}</h2>
            <img src={image} alt="image" />
            <h4>{types}</h4>
        </div>
    )
}
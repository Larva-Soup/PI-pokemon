import { Link } from "react-router-dom";

export default function Card({ name, image, types }) {
  return (
    <div>
        
      <Link to={`/home/${name}`}>
        <h2>{name}</h2>
      </Link>

      <img src={image} alt={name} width="200px" height="250px" />
      <div>{types.map(el => (<h4>{el}</h4>))}</div>
      
      {/* <h4>{types.map}</h4> */}
    </div>
  );
}

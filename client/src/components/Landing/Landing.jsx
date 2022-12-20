import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <>
      <h1>Henry Pokemon</h1>
      <img src="" alt="esto es una imagen representativa, tal vez" /> {/* esto lo puedo quitar luego */}
      <Link to="/home">
        <button>Home</button>
      </Link>
    </>
  );
}

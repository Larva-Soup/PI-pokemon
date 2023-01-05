import { Link } from "react-router-dom";
// importar el css module pero revisar primero como va

export default function Landing() {
  return (
    <>
      <h1>Henry Pokemon</h1>
      {/* <img src="" alt="esto es una imagen representativa, tal vez" /> esto en realidad iría como background en el css */}
      <Link to="/home">
        <button>Home</button>
      </Link>
    </>
  );
}

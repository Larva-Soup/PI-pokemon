import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll, filterPokesByType, filterCustoms } from "../../Redux/actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemon = useSelector((state) => state.pokemonList);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage, setPokemonPerPage] = useState(12);
  const lastPokeIndex = currentPage * pokemonPerPage;
  const firstPokeIndex = lastPokeIndex - pokemonPerPage;
  const currentPokemons = allPokemon.slice(firstPokeIndex, lastPokeIndex);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //types necesita ser inicializado también o no se guardan los tipos de los pokemon custom
  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getAll());
  };

  const handleTypeFilter = (e) => {
    e.preventDefault();
    dispatch(filterPokesByType(e.target.value))
  }

  const handleCustomFilter = (e) => {
    e.preventDefault();
    dispatch(filterCustoms(e.target.value))
  }

  return (
    <div>
      <Link to="/pokemons">Crear Pokemon</Link>
      <h1>Henry Pokemon</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cargar los pokemones
      </button>
      <div>
        <select onChange={e => handleTypeFilter(e)}>
          <option value="all">Todos</option>
          {/* {state.types.map(type => 
            (<option value = {type}>{type}</option>)
          )}  alternativa a todas estas líneas de código */}

          <option value="normal">Normal</option>
          <option value="fighting">Fighting</option>
          <option value="flying">Flying</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="rock">Rock</option>
          <option value="bug">Bug</option>
          <option value="ghost">Ghost</option>
          <option value="steel">Steel</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="psychic">Psychic</option>
          <option value="ice">Ice</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
          <option value="fairy">Fairy</option>
        </select>
        <select onChange={e => handleCustomFilter(e)}>
          <option value="all">Todos</option>
          <option value="original">Existente</option>
          <option value="custom">Creado</option>
        </select>
        <select>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
          
        <Paginado
          pokemonPage={pokemonPerPage}
          allPokemon={allPokemon.length}
          paginado={paginado}
        />

        {currentPokemons && currentPokemons.map((pokemon) => (
            <Card
              name={pokemon.Nombre}
              image={pokemon.Imagen}
              types={pokemon.Tipos}
              id={pokemon.Id}
            />
          ))}
      </div>
    </div>
  );
  
}

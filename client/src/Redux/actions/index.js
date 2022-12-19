import {
  GET_POKEMON_LIST,
  GET_POKEMON_DETAIL,
  ADD_POKEMON,
  REMOVE_POKEMON,
  GET_TYPES,
  urlServer,
} from "../../utils";

const getAll = () => {
  return (dispatch) => {
    fetch(`${urlServer}/pokemons`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: GET_POKEMON_LIST, payload: data }));
  };
};

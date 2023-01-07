import {
  GET_POKEMON_LIST,
  GET_POKEMON_DETAIL,
  ADD_POKEMON,
  REMOVE_POKEMON,
  GET_TYPES,
  urlServer,
  FILTER_BY_TYPE,
  FILTER_CUSTOM,
  ORDER_BY_NAME,
} from "../../utils";


export const getAll = () => {
  return async function (dispatch) {
    const call = await fetch(`${urlServer}/pokemons`);
    const list = await call.json();
    return dispatch({ type: GET_POKEMON_LIST, payload: list });
  };
};

export const filterPokesByType = (payload) => {
  return {
    type: FILTER_BY_TYPE,
    payload
  }
}

export const filterCustoms = (payload) => {
  return {
    type: FILTER_CUSTOM,
    payload
  }
}

export const nameOrderer = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload
  }
}

// export const getDetail = (param) => {
//   return function (dispatch) {
//     fetch(`${urlServer}/pokemons${param}`) //falta organizar esto talvez
//       .then((res = res.json()))
//       .then((data) => dispatch({ type: GET_POKEMON_DETAIL, payload: data }));
//   };
// };

// export const getTypes = () => {
//   return function (dispatch) {
//     fetch(`${urlServer}/types`)
//       .then((res) => res.json())
//       .then((data) => dispatch({ type: GET_TYPES, payload: data }));
//   };
// };

// export const addPokemon = () => {
//   return function (dispatch) {
//     fetch(`${urlServer}/pokemons`)
//       .then((res) => res.json())
//       .then((data) => dispatch({ type: ADD_POKEMON, payload: data }));
//   };
// };

// export const removePokemon = () =>{
//   return function(dispatch){

//   }
// }

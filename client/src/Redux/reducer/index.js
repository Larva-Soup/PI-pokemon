import { ADD_POKEMON, FILTER_BY_TYPE, FILTER_CUSTOM, GET_POKEMON_DETAIL, GET_POKEMON_LIST, GET_TYPES, ORDER_BY_NAME, REMOVE_POKEMON } from "../../utils";

const initialState = {
  pokemonList: [],
  allPokemonList: [],
  pokemonDetail: {},
  types:[]
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMON_LIST:
      return { ...state, pokemonList: action.payload, allPokemonList: action.payload };
    // case GET_POKEMON_DETAIL:
    //   return { ...state, pokemonDetial: action.payload };
    // case GET_TYPES:
    //     return {...state, types: action.payload};
    // case ADD_POKEMON:
    //     return {...state, }
    // case REMOVE_POKEMON:
    //     return {...state, }
    case FILTER_BY_TYPE:
      const allPokes = state.allPokemonList;
      const typeFilter = action.payload === "all" ? allPokes : allPokes.filter(poke => poke.Tipos.includes(action.payload))
      return {
        ...state,
        pokemonList: typeFilter
      }
    case FILTER_CUSTOM:
      const allPokesToo = state.allPokemonList;
      const customFiltered = action.payload === "custom" ? allPokesToo.filter(poke => poke.CustomCreation) : allPokesToo.filter(poke => !poke.CustomCreation)
      return {
        ...state,
        pokemonList: action.payload === "all" ? allPokesToo : customFiltered,
      }
    case ORDER_BY_NAME:
      const allPokesTree = state.allPokemonList;
      let sortedArr = action.payload === "asc" ? allPokesTree.sort((a,b) =>{
        if(a.name > b.name){
          return 1
        }
        if(a.name < b.name){
          return -1
        }
        return 0;
      }):
      allPokesTree.sort((a,b)=>{
        if(a.name > b.name){
          return -1
        }
        if(a.name < b.name){
          return 1
        }
        return 0;
      });
      return {
        ...state,
        pokemonList: sortedArr,
      }
    default:
      return state;
  }
}

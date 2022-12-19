import { ADD_POKEMON, GET_POKEMON_DETAIL, GET_POKEMON_LIST, GET_TYPES, REMOVE_POKEMON } from "../../utils";

const initialState = {
  pokemonList: [],
  pokemonDetail: {},
  types:[]
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMON_LIST:
      return { ...state, pokemonList: action.payload };
    case GET_POKEMON_DETAIL:
      return { ...state, pokemonDetial: action.payload };
    case GET_TYPES:
        return {...state, types: action.payload};
    // case ADD_POKEMON:
    //     return {...state, }
    // case REMOVE_POKEMON:
    //     return {...state, }
    default:
      return state;
  }
}

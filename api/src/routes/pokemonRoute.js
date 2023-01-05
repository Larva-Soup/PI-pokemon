const { Router } = require("express");
const { Op } = require("sequelize");
const fetch = require("node-fetch");
const { Pokemon, Tipo } = require("../db.js");
const router = Router();

//getPokeList tendría que ser el que maneja el pokeList.next de la respuesta
//recordar descomentar en la request
const getPokeList = async () => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
  const pokeList = await res.json();
  let lista = [...pokeList.results];
  let aux = pokeList.next;

  //loop 2 veces para 60 pokemon
  for (let i = 0; i < 2; i++) {
    const temp = await fetch(aux);
    const results = await temp.json();
    lista = [...lista, ...results.results];
    aux = results.next;
  }

  return lista;
};

const getApi = async (param) => {
  try {
    let aux = param.toLowerCase();
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${aux}`);
    const pokeList = await res.json();
    const pokeSingle = {
      ID: pokeList.id,
      Nombre: pokeList.name,
      Altura: pokeList.height,
      Peso: pokeList.weight,
      Vida: pokeList.stats[0].base_stat,
      Ataque: pokeList.stats[1].base_stat,
      Defensa: pokeList.stats[2].base_stat,
      Velocidad: pokeList.stats[5].base_stat,
      Tipos: pokeList.types.map((ele) => ele.type.name),
      Imagen: pokeList.sprites.other.official_artwork.front_default,
      //falta ataque (stats[3]) y defensa especial (stats[4])
      //pero no los pide y los puedo poner luego
    };
    return pokeSingle;
  } catch (error) {
    throw new Error("Parametro incorrecto o no encontrado");
  }
};

const getDbByQuery = async (param) => {
  const queryPoke = await Pokemon.findAll({
    where: {
      Nombre: param,
    },
    include: {
      model: Tipo,
      attributes: ["Nombre"],
      through: {
        attributes: [],
      },
    },
  });
  if (queryPoke.length < 1) return Promise.reject();
  return queryPoke;
};

const getDb = async () => {
  return await Pokemon.findAll();
};

const catchEmAll = async () => {
  const [pokeOne, pokeTwo] = await Promise.all([getPokeList(), getDb()]);
  return [...pokeOne, ...pokeTwo];
};

const catchEmSome = async (param) => {
  try {
    const catched = await Promise.any([getDbByQuery(param), getApi(param)]);
    return catched;
  } catch (error) {
    throw new Error("El pokémon no existe o no se ha catalogado");
  }
};

const getId = async (param) => {
  return await Pokemon.findByPk(param);
};

const getByParams = async (param) => {
  try {
    return await Promise.any([getApi(param), getId(param)]);
  } catch (error) {
    throw new Error("El pokémon no existe o no se ha catalogado");
  }
};

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const pokemonByName = await catchEmSome(name);
      return res.status(200).send(pokemonByName);
    } else {
      const list = await catchEmAll();

      return res.status(200).send(list);
    }
    //probar sin el else luego
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.get("/:idPokemon", async (req, res) => {
  const { idPokemon } = req.params;
  try {
    const pokemonById = await getByParams(idPokemon);
    return res.status(200).send(pokemonById);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.post("/", async (req, res) => {
  const {
    Nombre,
    Vida,
    Ataque,
    Defensa,
    Velocidad,
    Altura,
    Peso,
    CustomCreation,
    Tipos,
  } = req.body;
  const pokeNew = await Pokemon.create({
    Nombre,
    Vida,
    Ataque,
    Defensa,
    Velocidad,
    Altura,
    Peso,
    CustomCreation,
  });

  const typeDb = await Tipo.findAll({ where: { Nombre: Tipos } });

  pokeNew.addTipo(typeDb);
  res.send("Pokémon creado con éxito");
});

module.exports = router;

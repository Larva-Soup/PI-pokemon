const { Router } = require("express");
const { Op } = require("sequelize");
const { Pokemon, Tipo } = require("../db.js");
// const Tipo = require("../models/Tipo");
const router = Router();

const getPokeList = async () => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
  const pokeList = await res.json();
  return pokeList.results;
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
      //falta ataque (stats[3]) y defensa especial (stats[4])
      //pero no los pide y los puedo poner luego
    };
    return pokeSingle;
  } catch (error) {
    throw new Error("Parametro incorrecto o no encontrado");
  }
};

const getDbEntry = async (param) => {
  return await Pokemon.findOne({
    where: {
      [Op.or]: [{ Nombre: param }, { ID: param }],
    },
    include:{
      model: Tipo,
      attributes: ['name'],      //puede que sea necesario cambiar el nombre si cambio Tipo
      through: {
        attributes: [],
      }
    }
  });
};

const getDb = async () => {
  return await Pokemon.findAll();
};

const catchEmAll = async () => {
  const pokeApiList = await getPokeList();
  const pokeDataBase = await getDb();
  const pokeAll = [...pokeApiList, ...pokeDataBase];
  return pokeAll;
};

const catchEmSome = async (param) => {
  const pokeApi = await getApi(param);
  const dataBase = await getDbEntry(param);
  return pokeApi || dataBase;
};

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const pokemonByName = await catchEmSome(name);
      return res.status(200).send(pokemonByName);
    }
    const list = await catchEmAll();
    return res.status(200).send(list);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.get("/:idPokemon", async (req, res) => {
  const { idPokemon } = req.params;
  try {
    const pokemonById = await getApi(idPokemon);
    return res.status(200).send(pokemonById);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.post("/", (req, res) => {});

module.exports = router;

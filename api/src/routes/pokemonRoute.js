const { Router } = require("express");
//modelo sacado de la database acá
const router = Router();

router.get("/", (req, res) => {
  if (Object.keys(req.query) < 1) {
    return fetch("https://pokeapi.co/api/v2/pokemon")
      .then((response) => response.json())
      .then((pokemonList) => res.status(200).send(pokemonList))
      .catch((error) => console.log(error));
  }

  // let {name} = req.query;
  fetch(`https://pokeapi.co/api/v2/pokemon/${req.query.name.toLowerCase()}`)
    .then((response) => response.json())
    .then((pokemon) => res.status(200).send(pokemon))
    .catch((error) => console.log(error));
});

router.get("/:idPokemon", (req, res) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${req.params.idPokemon}`)
    .then((response) => response.json())
    .then((pokemon) => res.status(200).send(pokemon))
    .catch((error) => console.log(error));
});

router.post("/", (req, res) => {
  
});

module.exports = router;

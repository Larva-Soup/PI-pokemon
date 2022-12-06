const { Router } = require("express");
//modelo sacado de la database acá
const router = Router();

router.get("/", (req, res) => {
  fetch("https://pokeapi.co/api/v2/type")
    .then((response) => response.json())
    .then((typeList) => res.status(200).send(typeList))
    .catch((error) => console.log(error));
});

module.exports = router;

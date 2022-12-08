const { Router } = require("express");
const { Tipo } = require("../db.js");
const router = Router();

const getType = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/type");
  const arr = await response.json();
  const typeList = arr.results.map((type) => {
    return {
      Nombre: type.name,
    };
  });
  return typeList;
};

router.get("/", async (req, res) => {
  const giveType = await getType();

  giveType.forEach((type) => {
    Tipo.findOrCreate({
      where: {
        Nombre: type.Nombre,
      },
    });
  });

  const allTypes = await Tipo.findAll();
  return res.status(200).send(allTypes);
});

module.exports = router;

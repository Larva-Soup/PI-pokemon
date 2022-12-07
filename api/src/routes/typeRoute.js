const { Router } = require("express");
const { Tipo } = require("../db.js");
const router = Router();

router.get("/", (req, res) => {
    // fetch("https://pokeapi.co/api/v2/type")
    //   .then((response) => response.json())
    //   .then((typeList) => res.status(200).send(typeList.results))
    //   .catch((error) => console.log(error));

    // Tipo.sync({force:true});

  //este de abajo sirve pero le falta

  fetch("https://pokeapi.co/api/v2/type")
    .then((response) => response.json())
    .then((arr) => arr.results)
    .then(data => Tipo.bulkCreate(data))
    .then((data) => {Tipo.sync({alter:true})
      return res.send(data);
    })
    .catch((error) => console.log(error));


});

module.exports = router;

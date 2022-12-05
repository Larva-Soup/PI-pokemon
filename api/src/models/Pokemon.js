const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    ID: {
      type: DataTypes.ID,       //cambiar esto luego
      allowNull: false,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Vida: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    Ataque: {
      type: DataTypes.INTEGER(3),
    },
    Defensa: {
      type: DataTypes.INTEGER(3),
    },
    Velocidad: {
      type: DataTypes.INTEGER(3),
    },
    Altura: {
      type: DataTypes.FLOAT(3),
    },
    Peso:{
      type: DataTypes.FLOAT(3),
    }
  });
};

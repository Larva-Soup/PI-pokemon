const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemon', {
    ID: {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4, 
      allowNull: false,
      primaryKey: true,
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
      type: DataTypes.INTEGER,
    },
    Defensa: {
      type: DataTypes.INTEGER,
    },
    Velocidad: {
      type: DataTypes.INTEGER,
    },
    Altura: {
      type: DataTypes.FLOAT,
    },
    Peso:{
      type: DataTypes.FLOAT,
    },
    CustomCreation:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  });
};

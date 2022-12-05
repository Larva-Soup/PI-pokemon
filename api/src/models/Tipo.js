const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
    sequelize.define('tipo',{
        ID :{
            type: DataTypes.ID,     //cambiar esto luego
        },
        Nombre: {
            type: DataTypes.STRING(20),
        }
    })
}
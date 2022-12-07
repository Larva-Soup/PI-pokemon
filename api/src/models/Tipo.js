const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
    sequelize.define('Tipo',{
        // ID :{
        //     type: DataTypes.INTEGER,
        //     // defaultValue: DataTypes.UUIDV4,
        //     // primaryKey: true,

        // },
        name: {
            type: DataTypes.STRING(20),
        }
    })
}
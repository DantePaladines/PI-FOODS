const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('dieta', {
        //id : {
        //    type : DataTypes.INTEGER,
        //    primaryKey : true,
        //    allownull : false
        //},
        name : {
            type : DataTypes.STRING(DataTypes.ARRAY()),
            allownull : false
        }
    },
    {
        timestamps : false
    })
}
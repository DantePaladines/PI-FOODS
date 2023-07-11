const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id : {
      type : DataTypes.UUID,
      primaryKey : true,
      defaultValue: DataTypes.UUIDV4,
    },

    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    resumen : {
      type : DataTypes.STRING,
      allowNull : false
    },

    nivel : {
      type : DataTypes.INTEGER
    },
    
    paso : {
      type : DataTypes.STRING,
      allowNull : false
    }
  },
  {
    timestamps : false
  }
  );
};

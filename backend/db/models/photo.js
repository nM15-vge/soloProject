'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    imageUrl:{
      type: DataTypes.STRING,
      allowNull: false
    },
    title:{
      type: DataTypes.STRING,
      allowNull: false
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false
    },
    userId:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    albumId:{
      type: DataTypes.INTEGER,
    },
    public:{
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {});
  Photo.associate = function(models) {
    // associations can be defined here
  };
  return Photo;
};

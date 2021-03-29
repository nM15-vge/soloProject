'use strict';
module.exports = (sequelize, DataTypes) => {
  const StarAlbum = sequelize.define('StarAlbum', {
    star: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER
  }, {});
  StarAlbum.associate = function(models) {
    // associations can be defined here
  };
  return StarAlbum;
};
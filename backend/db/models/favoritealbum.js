'use strict';
module.exports = (sequelize, DataTypes) => {
  const FavoriteAlbum = sequelize.define('FavoriteAlbum', {
    userId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER
  }, {});
  FavoriteAlbum.associate = function(models) {
    // associations can be defined here
  };
  return FavoriteAlbum;
};
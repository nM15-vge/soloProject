'use strict';
module.exports = (sequelize, DataTypes) => {
  const FavoritePhoto = sequelize.define('FavoritePhoto', {
    userId: DataTypes.INTEGER,
    photoId: DataTypes.INTEGER
  }, {});
  FavoritePhoto.associate = function(models) {
    // associations can be defined here
  };
  return FavoritePhoto;
};

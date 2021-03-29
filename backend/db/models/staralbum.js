'use strict';
module.exports = (sequelize, DataTypes) => {
  const StarAlbum = sequelize.define('StarAlbum', {
    star: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER
  }, {});
  StarAlbum.associate = function(models) {
    StarAlbum.belongsTo(models.User, {foreignKey: 'userId'});
    StarAlbum.belongsTo(models.Album, {foreignKey: 'albumId'});
  };
  return StarAlbum;
};

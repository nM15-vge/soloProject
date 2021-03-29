'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    title: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    public: {
      type: DataTypes.BOOLEAN
    }
  }, {});
  Album.associate = function(models) {
    Album.belongsTo(models.User, { foreignKey: 'userId'});
    Album.belongsToMany(models.User, {foreignKey: 'albumId', through: 'FavoriteAlbum', otherKey: 'userId'});
    Album.hasMany(models.Photo, {foreignKey: 'albumId'});
    Album.hasMany(models.CommentAlbum, {foreignKey: 'albumId'});
    Album.hasMany(models.StarPhoto, {foreignKey: 'albumId'});
  };
  return Album;
};

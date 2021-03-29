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
    Photo.belongsTo(models.Album, {foreignKey: 'albumId'});
    Photo.belongsTo(models.User, {foreignKey: 'userId'});
    Photo.hasMany(models.CommentPhoto, {foreignKey: 'photoId'});
    Photo.hasMany(models.StarPhoto, {foreignKey: 'photoId'});
    Photo.belongsToMany(models.User, {foreignKey: 'photoId', through: 'FavoritePhoto', otherKey: 'userId'});
  };
  return Photo;
};

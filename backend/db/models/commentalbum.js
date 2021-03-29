'use strict';
module.exports = (sequelize, DataTypes) => {
  const CommentAlbum = sequelize.define('CommentAlbum', {
    comment: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER
  }, {});
  CommentAlbum.associate = function(models) {
    // associations can be defined here
  };
  return CommentAlbum;
};
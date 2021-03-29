'use strict';
module.exports = (sequelize, DataTypes) => {
  const CommentPhoto = sequelize.define('CommentPhoto', {
    comment: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    photoId: DataTypes.INTEGER
  }, {});
  CommentPhoto.associate = function(models) {
    // associations can be defined here
  };
  return CommentPhoto;
};
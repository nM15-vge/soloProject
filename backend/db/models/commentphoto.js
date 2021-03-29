'use strict';
module.exports = (sequelize, DataTypes) => {
  const CommentPhoto = sequelize.define('CommentPhoto', {
    comment: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    photoId: DataTypes.INTEGER
  }, {});
  CommentPhoto.associate = function(models) {
    CommentPhoto.belongsTo(models.User, {foreignKey: 'userId'});
    CommentPhoto.belongsTo(models.Photo, {foreignKey: 'photoId'});
  };
  return CommentPhoto;
};

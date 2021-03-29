'use strict';
module.exports = (sequelize, DataTypes) => {
  const StarPhoto = sequelize.define('StarPhoto', {
    star: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    photoId: DataTypes.INTEGER
  }, {});
  StarPhoto.associate = function(models) {
    StarPhoto.belongsTo(models.User, {foreignKey: 'userId'});
    StarPhoto.belongsTo(models.Photo, {foreignKey: 'photoId'});
  };
  return StarPhoto;
};

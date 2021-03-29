'use strict';
module.exports = (sequelize, DataTypes) => {
  const StarPhoto = sequelize.define('StarPhoto', {
    star: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    photoId: DataTypes.INTEGER
  }, {});
  StarPhoto.associate = function(models) {
    // associations can be defined here
  };
  return StarPhoto;
};

'use strict';

const { Validator } = require("sequelize");
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    lastName: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    avatarUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if(Validator.isEmail(value)){
            throw new Error('Cannot be an email.');
          };
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail(value) {
          if(!Validator.isEmail(value)){
            throw new Error('Needs to be an email.');
          };
        },
      },

    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {attributes: {},
      },
    }
  });
  User.prototype.toSafeObject = function()  {
    const { id, firstName, avatarUrl, username, email, createdAt } = this;
    return { id, firstName, avatarUrl, username, email, createdAt };
  };
  User.prototype.validatePassword = function(password)  {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };
  User.getCurrentUserById = async function(id)  {
    return await User.scope('currentUser').findByPk(id);
  };
  User.login = async function ({ credential, password })  {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]:{
          username: credential,
          email: credential,
        },
      },
    });
    if( user && user.validatePassword(password) ) {
      return await User.scope('currentUser').findByPk(user.id);
    };
  };
  User.signup = async function ({ username, email, password, firstName, lastName, avatarUrl })  {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      firstName,
      lastName,
      avatarUrl,
      hashedPassword,
    });
    return await User.scope('currentUser').findByPk(user.id);
  }
  User.associate = function(models) {
    User.hasMany(models.Album, {foreignKey: 'userId'});
    User.belongsToMany(models.Album, {foreignKey: 'userId', through: 'FavoriteAlbum', otherKey:'albumId'});
    User.hasMany(models.Photo, {foreignKey: 'userId'});
    User.belongsToMany(models.Photo, {foreignKey: 'userId', through: 'FavoritePhoto', otherKey:'photoId'});
    User.hasMany(models.CommentAlbum, {foreignKey: 'userId'});
    User.hasMany(models.StarAlbum, {foreignKey: 'userId'});
    User.hasMany(models.CommentPhoto, {foreignKey: 'userId'});
    User.hasMany(models.StarPhoto, {foreignKey: 'userId'});
  };
  return User;
};

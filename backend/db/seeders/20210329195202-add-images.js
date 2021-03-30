'use strict';
const imageData = require('../../imageData.json')
console.log(typeof imageData)
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Photos', [
      ...imageData
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Photos', null, {});
  }
};

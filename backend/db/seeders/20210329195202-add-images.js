'use strict';
const animals = require('../../data/animal.json')
const festivals = require('../../data/festival.json')
const flowers = require('../../data/flower.json')
const nature = require('../../data/nature.json')
const night = require('../../data/night.json')
const people = require('../../data/people.json')
const spring = require('../../data/spring.json')
const sunset = require('../../data/sunset.json')
const water = require('../../data/water.json')
const winter = require('../../data/winter.json')
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Photos', [
      ...animals.photos.map( photo => ({
        imageUrl: photo.url,
        title: photo.url.slice(29, -7).split('-')[0],
        description: photo.url.slice(29, -7).split('-').join(' '),
        userId: Math.ceil(Math.random()*21),
        public: Math.ceil(Math.random()*2) === 1 ? true: false

      })),
      ...festivals.photos.map( photo => ({
        imageUrl: photo.url,
        title: photo.url.slice(29, -7).split('-')[0],
        description: photo.url.slice(29, -7).split('-').join(' '),
        userId: Math.ceil(Math.random()*21),
        public: Math.ceil(Math.random()*2) === 1 ? true: false

      })),
      ...flowers.photos.map( photo => ({
        imageUrl: photo.url,
        title: photo.url.slice(29, -7).split('-')[0],
        description: photo.url.slice(29, -7).split('-').join(' '),
        userId: Math.ceil(Math.random()*21),
        public: Math.ceil(Math.random()*2) === 1 ? true: false

      })),
      ...festivals.photos.map( photo => ({
        imageUrl: photo.url,
        title: photo.url.slice(29, -7).split('-')[0],
        description: photo.url.slice(29, -7).split('-').join(' '),
        userId: Math.ceil(Math.random()*21),
        public: Math.ceil(Math.random()*2) === 1 ? true: false

      })),
      ...nature.photos.map( photo => ({
        imageUrl: photo.url,
        title: photo.url.slice(29, -7).split('-')[0],
        description: photo.url.slice(29, -7).split('-').join(' '),
        userId: Math.ceil(Math.random()*21),
        public: Math.ceil(Math.random()*2) === 1 ? true: false

      })),
      ...night.photos.map( photo => ({
        imageUrl: photo.url,
        title: photo.url.slice(29, -7).split('-')[0],
        description: photo.url.slice(29, -7).split('-').join(' '),
        userId: Math.ceil(Math.random()*21),
        public: Math.ceil(Math.random()*2) === 1 ? true: false

      })),
      ...people.photos.map( photo => ({
        imageUrl: photo.url,
        title: photo.url.slice(29, -7).split('-')[0],
        description: photo.url.slice(29, -7).split('-').join(' '),
        userId: Math.ceil(Math.random()*21),
        public: Math.ceil(Math.random()*2) === 1 ? true: false

      })),
      ...spring.photos.map( photo => ({
        imageUrl: photo.url,
        title: photo.url.slice(29, -7).split('-')[0],
        description: photo.url.slice(29, -7).split('-').join(' '),
        userId: Math.ceil(Math.random()*21),
        public: Math.ceil(Math.random()*2) === 1 ? true: false

      })),
      ...sunset.photos.map( photo => ({
        imageUrl: photo.url,
        title: photo.url.slice(29, -7).split('-')[0],
        description: photo.url.slice(29, -7).split('-').join(' '),
        userId: Math.ceil(Math.random()*21),
        public: Math.ceil(Math.random()*2) === 1 ? true: false

      })),
      ...water.photos.map( photo => ({
        imageUrl: photo.url,
        title: photo.url.slice(29, -7).split('-')[0],
        description: photo.url.slice(29, -7).split('-').join(' '),
        userId: Math.ceil(Math.random()*21),
        public: Math.ceil(Math.random()*2) === 1 ? true: false

      })),
      ...winter.photos.map( photo => ({
        imageUrl: photo.url,
        title: photo.url.slice(29, -7).split('-')[0],
        description: photo.url.slice(29, -7).split('-').join(' '),
        userId: Math.ceil(Math.random()*21),
        public: Math.ceil(Math.random()*2) === 1 ? true: false

      }))
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Photos', null, {});
  }
};

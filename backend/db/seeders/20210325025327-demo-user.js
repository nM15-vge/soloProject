'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [
        {
          firstName: 'Demo',
          lastName: 'User',
          avatarUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.routard.com%2Fimage%2F67%2F1%2Ffb-canada-parcs.1473671.jpg&f=1&nofb=1",
          email: 'demo@user.io',
          username: 'Demo1',
          hashedPassword: bcrypt.hashSync('password')
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          avatarUrl: faker.image.imageUrl(),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          avatarUrl: faker.image.imageUrl(),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          avatarUrl: faker.image.imageUrl(),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          avatarUrl: faker.image.imageUrl(),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          avatarUrl: faker.image.imageUrl(),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          avatarUrl: faker.image.imageUrl(),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          avatarUrl: faker.image.imageUrl(),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          avatarUrl: faker.image.imageUrl(),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          avatarUrl: faker.image.imageUrl(),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          avatarUrl: faker.image.imageUrl(),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          avatarUrl: faker.image.imageUrl(),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          avatarUrl: faker.image.imageUrl(),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          avatarUrl: faker.image.imageUrl(),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          avatarUrl: faker.image.imageUrl(),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          avatarUrl: faker.image.imageUrl(),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          avatarUrl: faker.image.imageUrl(),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          avatarUrl: faker.image.imageUrl(),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          avatarUrl: faker.image.imageUrl(),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          avatarUrl: faker.image.imageUrl(),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          avatarUrl: faker.image.imageUrl(),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2']}
    }, {});
  }
};

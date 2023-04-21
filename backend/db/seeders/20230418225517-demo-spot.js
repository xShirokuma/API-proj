'use strict';

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '1234 Street St',
        city: 'Fakeplace',
        state: 'New York',
        country: 'USA',
        lat: 12.41232,
        lng: -53.13244,
        name: 'Da Crib1',
        description: 'It ya boi',
        price: 420.69
      },
      {
        ownerId: 1,
        address: '1235 Street St',
        city: 'Fakeplace',
        state: 'New York',
        country: 'USA',
        lat: 12.41233,
        lng: -53.13244,
        name: 'Da Crib2',
        description: 'It ya boi',
        price: 420.69
      },
      {
        ownerId: 2,
        address: '1236 Street St',
        city: 'Fakeplace',
        state: 'New York',
        country: 'USA',
        lat: 12.41234,
        lng: -53.13244,
        name: 'Da Crib3',
        description: 'Yeet',
        price: 420.69
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      // city: { [Op.in]: ['Fakeplace'] }
    }, {});
  }
};

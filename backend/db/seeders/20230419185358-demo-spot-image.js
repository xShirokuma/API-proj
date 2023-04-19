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
    options.tableName = 'SpotImages'
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "www.google.com",
        preview: true
      },
      {
        spotId: 1,
        url: "www.google.com",
        preview: false
      },
      {
        spotId: 2,
        url: "www.google.com",
        preview: true
      },
      {
        spotId: 2,
        url: "www.google.com",
        preview: false
      },
      {
        spotId: 3,
        url: "www.google.com",
        preview: true
      },
      {
        spotId: 3,
        url: "www.google.com",
        preview: false
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages'
    const Op = Sequelize.Op
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['www.google.com'] }
    }, {})
  }
};

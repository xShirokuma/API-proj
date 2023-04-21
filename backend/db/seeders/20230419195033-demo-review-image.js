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
   options.tableName = 'ReviewImages'
   return queryInterface.bulkInsert(options, [
    {
      reviewId: 1,
      url: 'www.google.com'
    },
    {
      reviewId: 2,
      url: 'www.google.com'
    },
    {
      reviewId: 3,
      url: 'www.google.com'
    },
    {
      reviewId: 4,
      url: 'www.google.com'
    },
    {
      reviewId: 5,
      url: 'www.google.com'
    },
    {
      reviewId: 6,
      url: 'www.google.com'
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
    options.tableName = 'ReviewImages'
    const Op = Sequelize.Op
    return queryInterface.bulkDelete(options, {
      // url: { [Op.in]: ['www.google.com'] }
    }, {})
  }
};

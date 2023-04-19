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
   options.tableName = 'Reviews'
   return queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 3,
      review: 'wuz good',
      stars: 5
    },
    {
      spotId: 1,
      userId: 2,
      review: 'wuz ok',
      stars: 3
    },
    {
      spotId: 2,
      userId: 3,
      review: 'wuz good',
      stars: 5
    },
    {
      spotId: 2,
      userId: 2,
      review: 'wuz bad',
      stars: 1
    },
    
    {
      spotId: 3,
      userId: 3,
      review: 'wuz good',
      stars: 5
    },
    {
      spotId: 3,
      userId: 1,
      review: 'wuz ok',
      stars: 4
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
    options.tableName = 'Reviews'
    const Op = Sequelize.Op
    return queryInterface.bulkDelete(options, {
      review: { [Op.in]: ['wuz good', 'wuz bad', 'wuz ok']}
    }, {})
  }
};

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
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: '3',
        userId: '1',
        startDate: new Date('1/1/2020'),
        endDate: new Date('2/1/2020')
      },
      {
        spotId: '3',
        userId: '2',
        startDate: new Date('2/1/2020'),
        endDate: new Date('3/1/2020')
      },
      {
        spotId: '2',
        userId: '3',
        startDate: new Date('3/1/2020'),
        endDate: new Date ('4/1/2020')
      },
      {
        spotId: '1',
        userId: '3',
        startDate: new Date ('4/1/2020'),
        endDate: new Date ('5/1/2020')
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bookings'
    const Op = Sequelize.Op
    
    // const date = new Date('1/1/2023')
    // console.log(date);

    return queryInterface.bulkDelete(options, {
      //TODO: delete by date
      //startDate: { [Op.lte]: date }
    })
  }
};

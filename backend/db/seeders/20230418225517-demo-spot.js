"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    options.tableName = "Spots";

    const loremIpsumStr =
      "I'm baby chillwave typewriter truffaut kitsch bicycle rights cornhole ramps chartreuse. Franzen fingerstache cray bushwick pug irony. Post-ironic blue bottle deep v man braid. Chia four loko normcore letterpress art party woke seitan.";

    return queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1,
          address: "2525 Industrial Blvd",
          city: "Orlando",
          state: "Florida",
          country: "USA",
          lat: null,
          lng: null,
          name: "JW Machine",
          description: loremIpsumStr,
          price: 420.69,
        },
        {
          ownerId: 1,
          address: "6270 Edgewater Dr Suite 4700",
          city: "Orlando",
          state: "Florida",
          country: "USA",
          lat: null,
          lng: null,
          name: "Defiant CNC",
          description: loremIpsumStr,
          price: 420.69,
        },
        {
          ownerId: 2,
          address: "5032 Forsyth Commerce Rd Unit 2",
          city: "Orlando",
          state: "Florida",
          country: "USA",
          lat: null,
          lng: null,
          name: "CNC Routing Orlando",
          description: loremIpsumStr,
          price: 420.69,
        },
        {
          ownerId: 3,
          address: "1027 Pine St",
          city: "Orlando",
          state: "Florida",
          country: "USA",
          lat: null,
          lng: null,
          name: "Central Florida CNC",
          description: loremIpsumStr,
          price: 420.69,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        // city: { [Op.in]: ['Fakeplace'] }
      },
      {}
    );
  },
};

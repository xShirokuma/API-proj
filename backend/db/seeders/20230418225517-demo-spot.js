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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras accumsan vitae neque posuere consectetur. Duis congue gravida pellentesque. Etiam venenatis diam a risus ultricies, vel gravida elit aliquet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam nibh lorem, elementum ac erat nec, vulputate suscipit velit. Integer commodo sollicitudin leo. Nulla sodales magna vel cursus maximus. In laoreet dolor efficitur egestas tristique. Quisque maximus ipsum nec elit fringilla, lobortis ultrices neque tincidunt. Nulla facilisis molestie viverra. Proin viverra justo vehicula turpis iaculis tempus. Integer suscipit odio libero, at gravida leo consequat et. Donec eu ligula in magna luctus mollis. Sed interdum lectus ipsum, fringilla gravida sem interdum ut. Nunc vitae eros sapien. Cras aliquam tellus ac risus ullamcorper, et pharetra turpis blandit. Vivamus venenatis mollis ultricies. Suspendisse egestas faucibus est ac pharetra. Nam luctus diam id lectus convallis euismod. Quisque ultrices porta nulla, eu eleifend urna vestibulum quis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec scelerisque tellus dui, non facilisis diam vehicula eget. Nulla bibendum facilisis aliquet. Integer ultricies, ligula quis elementum lobortis, nisl purus efficitur velit, vitae facilisis metus justo et lectus. Proin at vehicula lectus. Praesent dapibus massa in massa interdum hendrerit. In hac habitasse platea dictumst. Cras ut quam in erat consectetur pulvinar at congue sem. Integer euismod massa eu dolor condimentum molestie. Suspendisse potenti. Nunc id nulla eu metus semper pulvinar.";

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

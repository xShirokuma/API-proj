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
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://lh3.googleusercontent.com/p/AF1QipOfG-McR_A1dkFlloqKi2KzqMafsYXcSmqF0IW0=s1360-w1360-h1020",
        preview: true,
      },
      {
        spotId: 1,
        url: "https://lh3.googleusercontent.com/p/AF1QipMcZ6RBVyEmdQT8oRZveDVV4KXltwj7-wGVCCLH=s1360-w1360-h1020",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://lh3.googleusercontent.com/p/AF1QipOLZZdwjeh6kFXBoA-i9NT1ndt0RKBEqdR_CPE4=s1360-w1360-h1020",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://lh3.googleusercontent.com/p/AF1QipOPToyOwOg3xHamUHQMRV45SnHarfcynsksHAg0=s1360-w1360-h1020",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://lh3.googleusercontent.com/p/AF1QipOT1mQDlMW0GpeR3urWxoOmAXjBZc1SuaM3ObEG=s1360-w1360-h1020",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://lh3.googleusercontent.com/p/AF1QipMjgfmGLDf6A8fNjigxfw4-GpriAfo9iCO5Tfv2=s1360-w1360-h1020",
        preview: true,
      },
      {
        spotId: 2,
        url: "https://lh3.googleusercontent.com/p/AF1QipOrqY8WdyQgLCvwrNNspwhMaGUfaZXf8NPaBEH8=s1360-w1360-h1020",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://lh3.googleusercontent.com/p/AF1QipM_ksmoASGRioMVGzJsNbqdReczi2F_tddmAdrF=s1360-w1360-h1020",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://lh3.googleusercontent.com/p/AF1QipOyrBEVNp4lnCcFJgBi1M6K5lm6XLAkTJ53guwe=s1360-w1360-h1020",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://lh3.googleusercontent.com/p/AF1QipNv5oUOX1ZSZynk4onCBXMstl8Oa2g1CaWehehc=s1360-w1360-h1020",
        preview: false,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        // url: { [Op.in]: ['www.google.com'] }
      },
      {}
    );
  },
};

"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const seedData = [
  {
    email: "demo@user.io",
    username: "Demo-lition",
    firstName: "Demo",
    lastName: "Lition",
    hashedPassword: bcrypt.hashSync("password"),
  },
  {
    email: "user1@user.io",
    username: "FakeUser1",
    firstName: "Mary",
    lastName: "Staller",
    hashedPassword: bcrypt.hashSync("password2"),
  },
  {
    email: "user2@user.io",
    username: "FakeUser2",
    firstName: "Harry",
    lastName: "James",
    hashedPassword: bcrypt.hashSync("password3"),
  },
  {
    email: "TFink@springfield.com",
    username: "TFink123",
    firstName: "Theodore",
    lastName: "Finkle",
    hashedPassword: bcrypt.hashSync("donutLover123"),
  },
  {
    email: "hugo00@gmail.com",
    username: "Hugo00",
    firstName: "Hugo",
    lastName: "Jackson",
    hashedPassword: bcrypt.hashSync("danger00"),
  },
  {
    email: "pgriffin@printing.com",
    username: "familyGuyFan",
    firstName: "Peter",
    lastName: "South",
    hashedPassword: bcrypt.hashSync("house5"),
  },
  {
    email: "joewill@outlook.com",
    username: "joeWilliams3",
    firstName: "Joe",
    lastName: "Williams",
    hashedPassword: bcrypt.hashSync("legshurt22"),
  },
  {
    email: "anakins88@yahoo.com",
    username: "anakinsky1",
    firstName: "Anakin",
    lastName: "Davis",
    hashedPassword: bcrypt.hashSync("darthvader"),
  },
  {
    email: "obilight@aol.com",
    username: "jamesK4",
    firstName: "James",
    lastName: "Kelber",
    hashedPassword: bcrypt.hashSync("destroysith"),
  },
  {
    email: "jFields@facebook.com",
    username: "jFields299",
    firstName: "Joshua",
    lastName: "Fields",
    hashedPassword: bcrypt.hashSync("darkside"),
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(seedData, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: seedData.map((user) => {
            return user.username;
          }),
        },
      },
      {}
    );
  },
};

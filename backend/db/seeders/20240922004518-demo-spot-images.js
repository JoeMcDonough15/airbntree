"use strict";

const { SpotImage } = require("../models");

const spotImageData = [
  {
    spotId: 1,
    url: "/assets/images/yard.png",
    preview: true,
  },

  {
    spotId: 1,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 1,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 1,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 1,
    url: "/assets/images/bridge.jpg",
  },

  {
    spotId: 2,
    url: "/assets/images/yard.png",
    preview: true,
  },

  {
    spotId: 2,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 2,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 2,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 2,
    url: "/assets/images/bridge.jpg",
  },

  {
    spotId: 3,
    url: "/assets/images/yard.png",
    preview: true,
  },

  {
    spotId: 3,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 3,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 3,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 3,
    url: "/assets/images/bridge.jpg",
  },

  {
    spotId: 4,
    url: "/assets/images/yard.png",
    preview: true,
  },

  {
    spotId: 4,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 4,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 4,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 4,
    url: "/assets/images/bridge.jpg",
  },

  {
    spotId: 5,
    url: "/assets/images/yard.png",
    preview: true,
  },

  {
    spotId: 5,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 5,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 5,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 5,
    url: "/assets/images/bridge.jpg",
  },

  {
    spotId: 6,
    url: "/assets/images/yard.png",
    preview: true,
  },

  {
    spotId: 6,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 6,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 6,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 6,
    url: "/assets/images/bridge.jpg",
  },

  {
    spotId: 7,
    url: "/assets/images/yard.png",
    preview: true,
  },

  {
    spotId: 7,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 7,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 7,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 7,
    url: "/assets/images/bridge.jpg",
  },

  {
    spotId: 8,
    url: "/assets/images/yard.png",
    preview: true,
  },

  {
    spotId: 8,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 8,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 8,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 8,
    url: "/assets/images/bridge.jpg",
  },

  {
    spotId: 9,
    url: "/assets/images/yard.png",
    preview: true,
  },

  {
    spotId: 9,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 9,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 9,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 9,
    url: "/assets/images/bridge.jpg",
  },

  {
    spotId: 10,
    url: "/assets/images/yard.png",
    preview: true,
  },

  {
    spotId: 10,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 10,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 10,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 10,
    url: "/assets/images/bridge.jpg",
  },

  {
    spotId: 11,
    url: "/assets/images/yard.png",
    preview: true,
  },

  {
    spotId: 11,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 11,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 11,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 11,
    url: "/assets/images/bridge.jpg",
  },

  {
    spotId: 12,
    url: "/assets/images/yard.png",
    preview: true,
  },

  {
    spotId: 12,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 12,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 12,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 12,
    url: "/assets/images/bridge.jpg",
  },

  {
    spotId: 13,
    url: "/assets/images/yard.png",
    preview: true,
  },

  {
    spotId: 13,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 13,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 13,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 13,
    url: "/assets/images/bridge.jpg",
  },

  {
    spotId: 14,
    url: "/assets/images/yard.png",
    preview: true,
  },

  {
    spotId: 14,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 14,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 14,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 14,
    url: "/assets/images/bridge.jpg",
  },

  {
    spotId: 15,
    url: "/assets/images/yard.png",
    preview: true,
  },

  {
    spotId: 15,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 15,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 15,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 15,
    url: "/assets/images/bridge.jpg",
  },

  {
    spotId: 16,
    url: "/assets/images/yard.png",
    preview: true,
  },

  {
    spotId: 16,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 16,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 16,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 16,
    url: "/assets/images/bridge.jpg",
  },

  {
    spotId: 17,
    url: "/assets/images/yard.png",
    preview: true,
  },

  {
    spotId: 17,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 17,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 17,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 17,
    url: "/assets/images/bridge.jpg",
  },

  {
    spotId: 18,
    url: "/assets/images/yard.png",
    preview: true,
  },

  {
    spotId: 18,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 18,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 18,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 18,
    url: "/assets/images/bridge.jpg",
  },

  {
    spotId: 19,
    url: "/assets/images/yard.png",
    preview: true,
  },

  {
    spotId: 19,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 19,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 19,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 19,
    url: "/assets/images/bridge.jpg",
  },

  {
    spotId: 20,
    url: "/assets/images/yard.png",
    preview: true,
  },

  {
    spotId: 20,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 20,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 20,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 20,
    url: "/assets/images/bridge.jpg",
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(spotImageData, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    for (let spotImage of spotImageData) {
      await SpotImage.destroy({
        where: spotImage,
      });
    }
  },
};

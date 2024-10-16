"use strict";

const { SpotImage } = require("../models");

const spotImageData = [
  {
    spotId: 1,
    url: "https://images.unsplash.com/photo-1519378045141-f05b62faa055?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    preview: true,
  },

  {
    spotId: 2,
    url: "https://plus.unsplash.com/premium_photo-1664047696194-ced8c905eafb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    preview: true,
  },

  {
    spotId: 3,
    url: "https://plus.unsplash.com/premium_photo-1683129807206-8a648874655e?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    preview: true,
  },

  {
    spotId: 4,
    url: "https://images.unsplash.com/photo-1498360531515-dbfb0146fb33?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    preview: true,
  },

  {
    spotId: 5,
    url: "https://images.unsplash.com/photo-1515126610754-a10f0df8fd3f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    preview: true,
  },

  {
    spotId: 6,
    url: "https://plus.unsplash.com/premium_photo-1685133856065-a32643cc56d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    preview: true,
  },

  {
    spotId: 7,
    url: "https://images.unsplash.com/photo-1618767689159-1bfda407947b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    preview: true,
  },

  {
    spotId: 8,
    url: "https://images.unsplash.com/photo-1638951576620-d52d7b0070c4?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    preview: true,
  },

  {
    spotId: 9,
    url: "https://images.unsplash.com/photo-1659433910993-ed83361e314b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    preview: true,
  },

  {
    spotId: 10,
    url: "https://images.unsplash.com/photo-1614132721606-56c857daa521?q=80&w=2167&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    preview: true,
  },

  {
    spotId: 11,
    url: "https://images.unsplash.com/photo-1634796502713-6d26d24b26bc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    preview: true,
  },

  {
    spotId: 12,
    url: "https://images.unsplash.com/photo-1696482280456-00654f9bc25a?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    preview: true,
  },

  {
    spotId: 13,
    url: "https://images.unsplash.com/photo-1612730260565-7eaefc669dc7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    preview: true,
  },

  {
    spotId: 14,
    url: "https://images.unsplash.com/photo-1550355191-aa8a80b41353?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    preview: true,
  },

  {
    spotId: 15,
    url: "https://images.unsplash.com/photo-1560706499-e97fab36aec9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTB8fHRyZWUlMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D",
    preview: true,
  },

  {
    spotId: 16,
    url: "https://images.unsplash.com/photo-1704586349935-631d30f8e0de?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    preview: true,
  },

  {
    spotId: 17,
    url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    preview: true,
  },

  {
    spotId: 18,
    url: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    preview: true,
  },

  {
    spotId: 19,
    url: "https://plus.unsplash.com/premium_photo-1684058279515-1b46b0961c65?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    preview: true,
  },

  {
    spotId: 20,
    url: "https://images.unsplash.com/photo-1663514184322-2fb5cf570e35?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    preview: true,
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

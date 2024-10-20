"use strict";

const { Spot } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const spotsData = [
  {
    ownerId: 1,
    address: "723 Maplewood Avenue",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 37.2798729,
    lng: -122.234897234,
    name: "Rustic Treehouse Escape",
    description:
      "Discover the charm of our rustic treehouse, a perfect blend of nature and modern comforts. With handcrafted wooden furnishings and a cozy fireplace, this retreat invites you to unwind. Enjoy stargazing from the deck or explore nearby trails, creating memories that will last a lifetime.",
    price: 123,
  },
  {
    ownerId: 1,
    address: "1235 Garver Street",
    city: "Denver",
    state: "Colorado",
    country: "United States of America",
    lat: 40.238479,
    lng: -58.38648276,
    name: "Woodland Serenity",
    description:
      "Welcome to your peaceful sanctuary in the trees! This serene treehouse is designed for relaxation and connection with nature. Spend your mornings sipping coffee on the balcony, and your evenings enjoying the sunset over the treetops. Adventure awaits just outside your door!",
    price: 354,
  },
  {
    ownerId: 2,
    address: "123 Fake Lane",
    city: "Philadelphia",
    state: "Pennsylvania",
    country: "United States of America",
    lat: 74,
    lng: -24.34787384,
    name: "Family Adventure Treehouse",
    description:
      "Create unforgettable family memories in our spacious treehouse! With multiple sleeping areas and fun outdoor activities, there’s something for everyone. Explore nature trails, build a campfire, and share stories under the stars—all from your treetop hideaway.",
    price: 245,
  },
  {
    ownerId: 2,
    address: "123 Imaginary Lane",
    city: "Pasadena",
    state: "California",
    country: "United States of America",
    lat: 54.38497987324,
    lng: -123,
    name: "Cozy Couples’ Retreat",
    description:
      "Reconnect with your loved one in our intimate treehouse designed for romance. Enjoy candlelit dinners on the deck, followed by cozy nights by the fire. Surrounded by the beauty of nature, this is the perfect setting for a romantic escape.",
    price: 248,
  },
  {
    ownerId: 3,
    address: "123 Broad Street",
    city: "Larkspur",
    state: "California",
    country: "United States of America",
    lat: 45.48329749,
    lng: -134.3247987,
    name: "Nature Lover’s Paradise",
    description:
      "Immerse yourself in the beauty of the outdoors in our treehouse haven. With hiking, birdwatching, and nearby lakes, this spot is ideal for nature enthusiasts. After a day of exploration, retreat to your cozy nook high in the trees and unwind.",
    price: 347,
  },
  {
    ownerId: 1,
    address: "123 Oak Street",
    city: "Rochester",
    state: "New York",
    country: "United States of America",
    lat: 45.82739487234,
    lng: -134.2837928734,
    name: "Artistic Treehouse Getaway",
    description:
      "Art and nature come together in our creatively designed treehouse. With unique decor and artistic touches throughout, you’ll be inspired by your surroundings. Enjoy creative activities like painting or writing, all while surrounded by the beauty of the forest.",
    price: 347,
  },
  {
    ownerId: 7,
    address: "33 Lammer St",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 23.238497293,
    lng: -101.283947982374,
    name: "Adventure Seeker’s Treehouse",
    description:
      "For those who crave adventure, our treehouse is the perfect base camp! Located near thrilling outdoor activities like zip-lining and rock climbing, your days will be filled with excitement. Return to your cozy haven to recharge for another day of adventure.",
    price: 450,
  },
  {
    ownerId: 9,
    address: "23 West 54th St",
    city: "Seattle",
    state: "Washington",
    country: "United States of America",
    lat: 77.2348978,
    lng: -162.2384798,
    name: "Escape to Your Dream Treehouse Retreat!",
    description:
      "Nestled high among the whispering branches of ancient trees, our charming treehouse offers a unique getaway that blends adventure with tranquility. Step inside and be greeted by warm wood accents and large windows that invite natural light and breathtaking views of the surrounding forest.\n\nRelax on the spacious deck with a cup of coffee as you listen to the symphony of birdsong, or unwind in the cozy nook with a good book. The treehouse is equipped with all the comforts of home, including a fully stocked kitchenette, plush bedding, and a private bathroom.\n\nVenture out for hiking trails, nearby lakes, and hidden picnic spots, or simply enjoy the serene atmosphere of your elevated sanctuary. Perfect for couples, families, or anyone seeking a peaceful escape, this treehouse is your ideal retreat in nature. Book your stay today and experience the magic of living among the trees!",
    price: 85.5,
  },
  {
    ownerId: 10,
    address: "22 Lake Drive",
    city: "Yorkshire",
    state: "Washington",
    country: "United States of America",
    lat: 57.2347,
    lng: -123.47987234,
    name: "Enchanted Canopy Haven",
    description:
      "Step into a whimsical retreat where nature meets comfort. Our enchanting treehouse, perched high in the canopy, offers breathtaking views and cozy interiors. Perfect for romantic getaways or family adventures, you’ll find everything you need for a relaxing stay surrounded by lush greenery.",
    price: 278,
  },
  {
    ownerId: 6,
    address: "10 Fatal Fields",
    city: "New Orleans",
    state: "Louisiana",
    country: "United States of America",
    lat: 45,
    lng: -134,
    name: "Peaceful Writer’s Retreat",
    description:
      "Find your muse in our tranquil treehouse, designed for writers and creatives. With stunning views and a quiet atmosphere, you’ll be inspired to write, reflect, and create. Enjoy the solitude of nature while still having all the comforts of home.",
    price: 400,
  },
  {
    ownerId: 4,
    address: "39 Independence St",
    city: "Greenville",
    state: "Virginia",
    country: "United States of America",
    lat: 83,
    lng: -131,
    name: "Eco-Friendly Treehouse",
    description:
      "Experience sustainability in style in our eco-friendly treehouse! Built with reclaimed materials and powered by solar energy, this unique retreat lets you enjoy nature while minimizing your footprint. Relax in comfort while respecting the beauty around you.",
    price: 167,
  },
  {
    ownerId: 6,
    address: "63rd St",
    city: "Denton",
    state: "Illinois",
    country: "United States of America",
    lat: 72,
    lng: -173,
    name: "Dreamy Family Treehouse",
    description:
      "Our family-friendly treehouse offers a magical experience for kids and adults alike! With playful design elements and plenty of space to explore, your family will love bonding in this treetop haven. Nature trails and fun activities are just outside your door.",
    price: 117,
  },
  {
    ownerId: 7,
    address: "101 Fire St",
    city: "Houston",
    state: "Texas",
    country: "United States of America",
    lat: 29,
    lng: -127,
    name: "Rustic Luxury Treehouse",
    description:
      "Indulge in a touch of luxury in our rustic treehouse. With plush furnishings, a hot tub on the deck, and breathtaking views, this retreat combines comfort with the great outdoors. Enjoy fine dining under the stars and let nature rejuvenate your spirit.",
    price: 347,
  },
  {
    ownerId: 8,
    address: "West Santa Blvd",
    city: "Trevose",
    state: "Pennsylvania",
    country: "United States of America",
    lat: 28,
    lng: -169,
    name: "Treetop Adventure Lodge",
    description:
      "Embrace the thrill of the outdoors in our adventurous treehouse lodge! With easy access to hiking, biking, and more, your days will be filled with exploration. After a day of adventure, unwind in your treetop retreat with friends or family.",
    price: 477,
  },
  {
    ownerId: 9,
    address: "9 Cold Springs St",
    city: "Fargo",
    state: "North Dakota",
    country: "United States of America",
    lat: 30,
    lng: -114,
    name: "Serene Yoga Retreat",
    description:
      "Find your zen in our peaceful treehouse, designed for relaxation and mindfulness. With yoga mats, meditation corners, and a calming atmosphere, this retreat is perfect for those seeking a rejuvenating escape. Embrace the tranquility of nature as you unwind.",
    price: 157,
  },
  {
    ownerId: 10,
    address: "East Corner Drive",
    city: "Monroe",
    state: "Montana",
    country: "United States of America",
    lat: 29,
    lng: -154,
    name: "Fairytale Treehouse",
    description:
      "Step into a fairytale in our whimsical treehouse, designed for dreamers of all ages. With charming decor and a magical atmosphere, you’ll feel like you’re in your own storybook. Create lasting memories as you explore the enchanting surroundings.",
    price: 248,
  },
  {
    ownerId: 3,
    address: "20 Printing Press St",
    city: "Boyleston",
    state: "Massachusetts",
    country: "United States of America",
    lat: 87,
    lng: -129,
    name: "Artist’s Creative Retreat",
    description:
      "Ignite your creativity in our artist-inspired treehouse! With ample natural light and a peaceful setting, you’ll find the perfect space to paint, draw, or write. Let the beauty of nature fuel your inspiration and creativity during your stay.",
    price: 311,
  },
  {
    ownerId: 5,
    address: "101 Oak Drive",
    city: "Franklin",
    state: "Tennessee",
    country: "United States of America",
    lat: 34,
    lng: -155,
    name: "Outdoor Explorer’s Treehouse",
    description:
      "Adventure awaits in our treehouse, located near stunning hiking trails and beautiful lakes. Spend your days exploring the great outdoors and your evenings enjoying cozy campfire stories. Perfect for explorers and nature lovers, your treetop retreat is waiting!",
    price: 100,
  },
  {
    ownerId: 6,
    address: "392 Madison St",
    city: "Madison",
    state: "Wisconsin",
    country: "United States of America",
    lat: 23,
    lng: -128,
    name: "Luxurious Treehouse Hideaway",
    description:
      "Treat yourself to a luxurious escape in our elegant treehouse. With upscale amenities, a gourmet kitchen, and stunning views, you’ll experience nature like never before. Indulge in relaxation as you soak in the beauty of the treetops.",
    price: 487,
  },
  {
    ownerId: 4,
    address: "29 Coldsprings Drive",
    city: "Denver",
    state: "Colorado",
    country: "United States of America",
    lat: 76,
    lng: -139,
    name: "Cabin in the Trees",
    description:
      "Reconnect with your loved ones in our spacious treehouse, designed for family bonding. Enjoy board games, storytelling by the fire, and nature walks together. This cozy retreat is the perfect place to create lasting memories with those who matter most.",
    price: 240,
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate(spotsData, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        address: {
          [Op.in]: spotsData.map((spot) => {
            return spot.address;
          }),
        },
      },
      {}
    );
  },
};

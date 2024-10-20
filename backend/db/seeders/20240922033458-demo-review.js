"use strict";

const { Review } = require("../models");

const reviewsData = [
  {
    userId: 2,
    spotId: 1,
    review:
      "What a magical experience! The treehouse was cozy, and the views were breathtaking. Perfect for a weekend getaway!",
    stars: 5,
  },
  {
    userId: 3,
    spotId: 1,
    review:
      "Beautiful surroundings, but the treehouse could use some maintenance. A few things were broken, which detracted from our experience.",
    stars: 3,
  },
  {
    userId: 4,
    spotId: 2,
    review:
      "An absolutely enchanting stay! The treehouse was like something out of a storybook. We enjoyed stargazing from the deck and felt so connected to nature.",
    stars: 5,
  },
  {
    userId: 5,
    spotId: 2,
    review:
      "While the location was beautiful, the treehouse felt a bit cramped for our family of four. We enjoyed the outdoor activities, though!",
    stars: 2,
  },
  {
    userId: 1,
    spotId: 3,
    review:
      "Absolutely loved the rustic charm! The decor was so unique, and we felt completely immersed in nature. Will definitely return!",
    stars: 5,
  },
  {
    userId: 3,
    spotId: 3,
    review:
      "Great idea but poorly executed. The treehouse was too far from the bathroom, and the stairs were a challenge in the dark.",
    stars: 1,
  },
  {
    userId: 6,
    spotId: 4,
    review:
      "What a serene retreat! I spent hours reading on the deck. Perfect for anyone looking to disconnect and recharge.",
    stars: 5,
  },
  {
    userId: 4,
    spotId: 4,
    review:
      "The treehouse was beautiful, but we had issues with bugs. Bring insect repellent if you're planning to enjoy the outdoors!",
    stars: 3,
  },
  {
    userId: 5,
    spotId: 5,
    review:
      "Not worth the price. The treehouse was nice, but it lacked basic amenities like Wi-Fi. Wouldn't recommend for remote work.",
    stars: 1,
  },
  {
    userId: 6,
    spotId: 5,
    review:
      "Perfect for families! The kids loved the swings and exploring the surrounding woods. A great place for bonding!",
    stars: 5,
  },
  {
    userId: 7,
    spotId: 6,
    review:
      "A bit too rustic for my taste. I appreciated the effort to be eco-friendly, but some amenities felt lacking.",
    stars: 2,
  },
  {
    userId: 8,
    spotId: 6,
    review:
      "Comfortable, but the treehouse is close to a busy road, which disrupted our peaceful retreat. Not what we expected.",
    stars: 3,
  },
  {
    userId: 9,
    spotId: 7,
    review:
      "Our stay was nothing short of magical! Waking up to birdsong and the sunrise was unforgettable. Highly recommend!",
    stars: 5,
  },
  {
    userId: 10,
    spotId: 7,
    review: "Quiet and peaceful, great for unwinding.",
    stars: 4,
  },
  {
    userId: 1,
    spotId: 8,
    review:
      "A truly unique experience! The treehouse design is fantastic, and the nature trails nearby were an added bonus.",
    stars: 5,
  },
  {
    userId: 4,
    spotId: 8,
    review: "The service was poor, but the spot itself was beautiful.",
    stars: 3,
  },
  {
    userId: 1,
    spotId: 9,
    review:
      "Nice place, but the Wi-Fi was spotty, making it hard to plan our activities. Still, we enjoyed our time together as a family",
    stars: 4,
  },
  {
    userId: 6,
    spotId: 9,
    review:
      "What a great getaway! The kids had a blast, and the staff was super friendly. We can't wait to come back!",
    stars: 5,
  },
  {
    userId: 7,
    spotId: 10,
    review:
      "Charming and cozy, but the mattress could use an upgrade. Overall, it was a relaxing place to unwind for a weekend.",
    stars: 2,
  },
  {
    userId: 8,
    spotId: 10,
    review:
      "The treehouse was even better than the photos! We loved cooking in the kitchenette and dining with a view.",
    stars: 5,
  },
  {
    userId: 9,
    spotId: 11,
    review:
      "It was a nice idea, but we were disappointed with the lack of privacy. The walls felt thin, and we could hear our neighbors.",
    stars: 2,
  },
  {
    userId: 10,
    spotId: 11,
    review:
      "Perfect romantic getaway! We loved the secluded location and the candlelit dinner we enjoyed on the deck.",
    stars: 5,
  },
  {
    userId: 1,
    spotId: 12,
    review:
      "A truly enchanting experience! The treehouse was beautifully decorated, and the views were simply stunning. We’ll be back!",
    stars: 5,
  },
  {
    userId: 10,
    spotId: 12,
    review:
      "The treehouse was charming, but the noise from the nearby road was distracting. Not as peaceful as I had hoped.",
    stars: 3,
  },
  {
    userId: 5,
    spotId: 13,
    review:
      "Perfect for our girls' getaway! We loved the cozy vibe and spent our evenings playing games on the deck. Highly recommend!",
    stars: 5,
  },
  {
    userId: 8,
    spotId: 13,
    review:
      "Great spot for a family trip, but the shower was a bit cramped. Overall, we had a lovely time exploring the area.",
    stars: 4,
  },
  {
    userId: 9,
    spotId: 14,
    review:
      "What a delightful stay! The treehouse felt like a dream, and we loved the rustic furniture. A fantastic escape from city life.",
    stars: 3,
  },
  {
    userId: 6,
    spotId: 14,
    review:
      "The location was great, but we had some issues with cleanliness upon arrival. Could use a thorough cleaning before guests arrive.",
    stars: 1,
  },
  {
    userId: 10,
    spotId: 15,
    review:
      "A hidden gem! We enjoyed every moment, especially the morning coffee on the balcony. Truly a slice of paradise",
    stars: 5,
  },
  {
    userId: 3,
    spotId: 15,
    review:
      "Nice treehouse, but the Wi-Fi was almost non-existent, which made it tough to stay connected. Good for a tech-free retreat!",
    stars: 4,
  },
  {
    userId: 1,
    spotId: 16,
    review:
      "Magical place! The kids loved the rope swings and tree climbing. Perfect for family bonding in nature.",
    stars: 5,
  },
  {
    userId: 2,
    spotId: 16,
    review:
      "Very cozy, but I found the bed uncomfortable. If you prefer firm mattresses, you might want to bring your own bedding.",
    stars: 2,
  },
  {
    userId: 6,
    spotId: 17,
    review:
      "The views were breathtaking, and the treehouse felt like a fairytale! Perfect for a romantic escape. We loved it!",
    stars: 5,
  },
  {
    userId: 4,
    spotId: 17,
    review:
      "The treehouse was adorable, but we struggled with the heating. It got a bit chilly at night. Just a heads up!",
    stars: 2,
  },
  {
    userId: 1,
    spotId: 18,
    review:
      "What an adventure! The treehouse was a fun place to stay, and we loved exploring the hiking trails nearby.",
    stars: 4,
  },
  {
    userId: 2,
    spotId: 18,
    review:
      "Beautiful design, but it felt a bit crowded for two couples. A little more space would have made it perfect.",
    stars: 3,
  },
  {
    userId: 8,
    spotId: 19,
    review:
      "Such a unique experience! We loved cooking meals together and enjoying the sunset views. Highly recommend for friends!",
    stars: 5,
  },
  {
    userId: 9,
    spotId: 19,
    review:
      "Great location, but the stairs were quite steep. It was a challenge for my grandparents. Just something to consider!",
    stars: 3,
  },
  {
    userId: 6,
    spotId: 20,
    review:
      "What a serene escape! The treehouse was cozy and beautifully situated. We loved the tranquility and the sound of nature all around.",
    stars: 5,
  },
  {
    userId: 7,
    spotId: 20,
    review:
      "The treehouse was charming, but we faced some maintenance issues during our stay. The management was responsive, though, which helped.",
    stars: 3,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate(reviewsData, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    for (let review of reviewsData) {
      await Review.destroy({
        where: review,
      });
    }
  },
};

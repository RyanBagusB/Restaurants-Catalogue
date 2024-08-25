Feature('Liking and Unliking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/like');
});
  
const assert = require('assert');
  
Scenario('Like and Unlike a Restaurant', async ({ I }) => {
  // Like Restaurant
  I.see('Belum Ada Restaurant Yang Anda Sukai', '#empty__liked__message');

  I.amOnPage('/');

  I.seeElement('.card__content h3 a');
  const firstRestaurant = locate('.card__content h3 a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.seeElement('.card');
  const likedMovieTitle = await I.grabTextFrom('.card__content h3');

  assert.strictEqual(firstRestaurantTitle, likedMovieTitle);

  // Unlike Restaurant
  I.seeElement('.card__content h3 a');
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.see('Belum Ada Restaurant Yang Anda Sukai', '#empty__liked__message');
});
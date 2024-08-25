import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantDbSource {
  static async restaurantList() {
    const response = await fetch(API_ENDPOINT.LIST);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async restaurantDetail(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await response.json();
    return responseJson.restaurant;
  }

  static _compareRating = (a, b) => {
    if (a.rating < b.rating) {
      return 1;
    } if (a.rating > b.rating) {
      return -1;
    }
    return 0;
  };

  static async topThree() {
    const response = await fetch(API_ENDPOINT.LIST);
    const responseJson = await response.json();
    const { restaurants } = responseJson;

    restaurants.sort(this._compareRating);
    const top3Restaurants = restaurants.slice(0, 3);

    return top3Restaurants;
  }
}

export default RestaurantDbSource;

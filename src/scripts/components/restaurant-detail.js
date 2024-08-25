import RestaurantDbSource from '../data/dicoding-restaurant-api';
import FavoriteRestaurantIdb from '../data/favorite-restaurant-idb';
import CONFIG from '../globals/config';
import UrlParser from '../routes/url-parser';
import LikeButtonPresenter from '../utils/like-button-presenter';
import { createDetailSkeletonTemplate, createMenuTemplate } from '../views/templates/template-creator';

class RestaurantDetail extends HTMLElement {
  constructor() {
    super();
    this._style = document.createElement('style');
    this._responsive = null;
    this._restaurant = null;

    this.createRestaurantDetailTemplate = (value) => {
      const RestaurantDetailElement = `
        <h2 class="restaurant__title">${value.name}</h2>
        <img class="restaurant__poster"
          src="${CONFIG.BASE_IMAGE_URL + value.pictureId}" alt="${value.name}" />
        <div class="restaurant__info">
          <h3>Informasi</h3>
          <h4>Kota</h4>
          <p>${value.city}</p>
          <h4>Rating</h4>
          <p>${value.rating}</p>
         </div>
        <div class="restaurant__overview">
          <h3>Deskripsi</h3>
          <p>${value.description}</p>
        </div>
      `;
      return RestaurantDetailElement;
    };
  }

  updateResponsive() {
    this._responsive = `
      @media screen and (min-width: 650px) {
        #restaurants {
          grid-template-columns: auto 1fr;
        }

        #menus {
          grid-template-columns: 1fr 1fr;
        }
      
        .restaurant__title {
          grid-column-start: 1;
          grid-column-end: 3;
        }
      
        .restaurant__overview {
          grid-column-start: 1;
          grid-column-end: 3;
          width: 90%;
        }
      }

      @media screen and (min-width: 800px) {
        .restaurant__overview {
          width: 100%;
        }
      }
    `;
  }

  updateStyle() {
    this.updateResponsive();
    this._style.textContent = `
      #skeleton-detail {
        margin: 7rem auto 3rem;
        padding: 0 2rem;
        width: 100%;
        max-width: 800px;
        display: flex;
        flex-direction: column;
        gap: 18px 40px;
      }

      #restaurants,
      #menus {
        margin: 7rem auto 3rem;
        width: 100%;
        max-width: 800px;
        display: grid;
        grid-template-columns: 1fr;
        gap: 18px 40px;
        padding: 0 2rem;
      }

      .restaurant__title {
        font-size: 2rem;
      }

      .restaurant__poster {
        width: 100%;
        max-width: 400px;
      }

      .restaurant__info h4 {
        margin: 8px 0;
      }

      .restaurant__overview p {
        margin-top: .8rem;
      }

      #menus {
        margin-top: 0;
      }

      #menus ul li {
        margin-top: .6rem;
      }

      #menus ul {
        list-style-type: none;
      }
      ${this._responsive}
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.updateStyle();

    this.innerHTML = `
      ${this._style.outerHTML}
      <div id="skeleton-detail"></div>
      <div id="restaurants"></div>
      <div id="menus">
        <div id="foods"></div>
        <div id="drinks"></div>
      </div>
      <review-list></review-list>
      <div id="likeButtonContainer"></div>
    `;
  }

  async afterRender() {
    const restaurantElement = document.querySelector('#restaurants');
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const skeletonDetail = document.querySelector('#skeleton-detail');
    const reviewList = document.querySelector('review-list');
    const foodsElement = document.querySelector('#foods');
    const drinksElement = document.querySelector('#drinks');

    skeletonDetail.innerHTML = createDetailSkeletonTemplate();
    restaurantElement.innerHTML = '';
    foodsElement.innerHTML = '';
    drinksElement.innerHTML = '';
    reviewList.skeletonRender();

    try {
      const restaurant = await RestaurantDbSource.restaurantDetail(url.id);
      const reviews = restaurant.customerReviews;
      const { foods, drinks } = restaurant.menus;

      skeletonDetail.innerHTML = '';
      reviewList.afterRender(reviews, url.id);

      restaurantElement.innerHTML = this.createRestaurantDetailTemplate(restaurant);

      LikeButtonPresenter.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        favoriteRestaurants: FavoriteRestaurantIdb,
        restaurant,
      });

      foodsElement.innerHTML = createMenuTemplate('Menu Makanan', foods);
      drinksElement.innerHTML = createMenuTemplate('Menu Minuman', drinks);
    } catch (_) {
      alert('Nampaknya terjadi error, silahkan refresh halaman');
    }
  }
}

customElements.define('restaurant-detail', RestaurantDetail);

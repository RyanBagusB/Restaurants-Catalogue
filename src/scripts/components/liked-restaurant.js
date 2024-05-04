import FavoriteRestaurantIdb from '../data/favorite-restaurant-idb';
import { createCardSkeletonTemplate } from '../views/templates/template-creator';

class LikedRestaurant extends HTMLElement {
  constructor() {
    super();
    this._style = document.createElement('style');
    this._responsive = null;

    this.afterRender = async () => {
      const restaurantsContainer = document.querySelector('#restaurants');

      for (let i = 0; i < 3; i += 1) {
        restaurantsContainer.innerHTML += createCardSkeletonTemplate();
      }

      try {
        const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();

        const restaurantItemElements = restaurants.map((item) => {
          const restaurant = document.createElement('restaurant-item');
          restaurant.setRestaurant(item);

          return restaurant;
        });

        restaurantsContainer.innerHTML = '';

        if (!restaurants.length) {
          restaurantsContainer.classList.add('empty');
          restaurantsContainer.innerHTML = '<p id="empty__liked__message">Belum Ada Restaurant Yang Anda Sukai</p>';
        }

        restaurantsContainer.append(...restaurantItemElements);
      } catch (_) {
        alert('Nampaknya terjadi error, silahkan refresh halaman');
      }
    };
  }

  connectedCallback() {
    this.render();
  }

  updateResponsive() {
    this._responsive = `
      @media screen and (min-width: 650px) {
        #restaurants {
          grid-template-columns: 1fr 1fr;
        }
 
      @media screen and (min-width: 1130px) {
        #restaurants {
          grid-template-columns: repeat(3, 1fr);
        }
      }
 
      @media screen and (min-width: 1400px) {
        #restaurants {
          grid-template-columns: repeat(4, 1fr);
        }
      }
 
      @media screen and (min-width: 1700px) {
        #restaurants {
          grid-template-columns: repeat(5, 1fr);
        }
      }
    `;
  }

  updateStyle() {
    this.updateResponsive();
    this._style.textContent = `
      #liked-restaurant-container {
        margin-top: 7rem;
      }

      #restaurants {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        gap: 25px 20px;
        padding: 2rem 12% 4rem;
      }

      #restaurants.empty {
        grid-template-columns: 1fr;
        text-align: center;
      }

      #restaurants #empty__liked__message {
        font-weight: 600;
        font-size: 1.5rem;
      }
      ${this._responsive}
    `;
  }

  render() {
    this.updateStyle();

    this.innerHTML = `
      ${this._style.outerHTML}
      <div id="liked-restaurant-container">
        <sub-heading sub-heading="Restaurant" heading="Favorite Anda"></sub-heading>
        <div id="restaurants"></div>
      </div>
    `;
  }
}

customElements.define('liked-restaurant', LikedRestaurant);

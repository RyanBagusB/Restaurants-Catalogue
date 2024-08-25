import RestaurantDbSource from '../data/dicoding-restaurant-api';
import { createCardSkeletonTemplate } from '../views/templates/template-creator';

class RestaurantList extends HTMLElement {
  constructor() {
    super();
    this._style = document.createElement('style');
    this._responsive = null;

    this.afterRender = async () => {
      const restaurantsContainer = document.querySelector('#restaurants');

      for (let i = 0; i < 6; i += 1) {
        restaurantsContainer.innerHTML += createCardSkeletonTemplate();
      }

      try {
        const restaurants = await RestaurantDbSource.restaurantList();

        const restaurantItemElements = restaurants.map((item) => {
          const restaurant = document.createElement('restaurant-item');
          restaurant.setRestaurant(item);

          return restaurant;
        });

        restaurantsContainer.innerHTML = '';

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
      #restaurants {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        gap: 25px 20px;
        padding: 2rem 12% 4rem;
      }
      ${this._responsive}
    `;
  }

  render() {
    this.updateStyle();

    this.innerHTML = `
      ${this._style.outerHTML}
      <hero-app></hero-app>
      <sub-heading sub-heading="Daftar" heading="Restoran Kami"></sub-heading>

      <div id="restaurants"></div>
    `;
  }
}

customElements.define('restaurant-list', RestaurantList);

import RestaurantDbSource from '../data/dicoding-restaurant-api';
import { createCardSkeletonTemplate } from '../views/templates/template-creator';

class TopThree extends HTMLElement {
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
        const restaurants = await RestaurantDbSource.topThree();

        const restaurantItemElements = restaurants.map((item, index) => {
          const restaurant = document.createElement('top-item');
          restaurant.setRestaurant(item, index + 1);

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
      @media (min-width: 600px) {
        #restaurants {
          padding: 2rem 30% 4rem;
        }
      }

      @media (min-width: 800px) {
        #restaurants {
          grid-template-columns: repeat(3, 1fr);
          padding: 2rem 12% 4rem;
        }
      }
    `;
  }

  updateStyle() {
    this.updateResponsive();
    this._style.textContent = `
      #top-three-container {
        margin-top: 7rem;
      }

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
        <div id="top-three-container">
          <sub-heading sub-heading="Top 3" heading="Rating Tertinggi"></sub-heading>

          <div id="restaurants"></div>
        </div>
    `;
  }
}

customElements.define('top-three', TopThree);

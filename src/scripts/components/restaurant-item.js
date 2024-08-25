import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantItem extends HTMLElement {
  constructor() {
    super();

    this._style = document.createElement('style');
    this._restaurant = {};
    this._responsive = null;
  }

  setRestaurant(value) {
    this._restaurant.id = value.id;
    this._restaurant.name = value.name;
    this._restaurant.description = value.description;
    this._restaurant.pictureId = value.pictureId;
    this._restaurant.city = value.city;
    this._restaurant.rating = value.rating;

    this.render();
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
      .card {
        width: 100%;
        box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        overflow: hidden;
      }

      .card__header {
        position: relative;
      }

      .card__header .card__header__picture {
        width: 100%;
        height: 10rem;
        object-fit: cover;
      }

      .card__header .card__header__rating {
        position: absolute;
        padding: 8px;
        bottom: 20px;
        left: 0;
        display: inline-block;
        background-color: black;
        color: white;
      }

      .card__header .card__header__rating .card__header__rating__score {
        margin-left: 10px;
      }

      .card__content {
        padding: 16px;
      }

      .card__content h3 {
        margin: 0 0 10px 0;
      }

      .card__content h3 a {
        color: #021420;
        text-decoration: none;
        font-size: 1.2rem;
        padding: 1rem 0;
      }
      
      .card__content .card__content__description {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }

      .card__content .card__content__city {
        font-style: italic;
        color: #16252f;
        margin-top: 1rem;
      }
      ${this._responsive}
    `;
  }

  render() {
    this.updateStyle();

    this.setAttribute('data-id', this._restaurant.id);

    this.innerHTML = `
      ${this._style.outerHTML}
        <div class="card">
        <div class="card__header">
          <img class="lazyload card__header__picture" alt="${this._restaurant.name}"
            data-src="${API_ENDPOINT.PICTUREID(this._restaurant.pictureId)}">
          <div class="card__header__rating">
            <p>⭐️<span class="card__header__rating__score">${this._restaurant.rating}</span></p>
          </div>
        </div>
        <div class="card__content">
          <h3><a href="/#/detail/${this._restaurant.id}">${this._restaurant.name}</a></h3>
          <p class="card__content__description">${this._restaurant.description}</p>
          <P class="card__content__city">Kota: ${this._restaurant.city}</P>
        </div>
      </div>
    `;
  }
}

customElements.define('restaurant-item', RestaurantItem);

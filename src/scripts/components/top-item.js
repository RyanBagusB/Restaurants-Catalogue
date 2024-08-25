class TopItem extends HTMLElement {
  constructor() {
    super();

    this._style = document.createElement('style');
    this._restaurant = {};
    this._responsive = null;
  }

  setRestaurant(value, rank) {
    this._restaurant.id = value.id;
    this._restaurant.rank = rank;
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

  updateResponsive() {
    this._responsive = `
      @media (min-width: 600px) {
        .top-three-card h3 {
          width: 40%;
        }
      }
      @media (min-width: 800px) {
        .top-three-card h3 {
          width: calc(((100% - 24%) - 40px) / 3);
        }
      }
    `;
  }

  updateStyle() {
    this.updateResponsive();
    this._style.textContent = `
      .top-three-card h3 {
        position: absolute;
        z-index: 10;
        color: white;
        text-align: center;
        width: 76%;
        background-color: #FFB72B;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
      }
      ${this._responsive}
    `;
  }

  render() {
    this.updateStyle();

    this.setAttribute('data-id', this._restaurant.id);

    const restaurant = document.createElement('restaurant-item');
    restaurant.setRestaurant(this._restaurant);

    this.innerHTML = `
      ${this._style.outerHTML}
      <div class="top-three-card">
        <h3>Top ${this._restaurant.rank}</h3>
      </div>
    `;

    this.appendChild(restaurant);
  }
}

customElements.define('top-item', TopItem);

class HeroApp extends HTMLElement {
  _shadowRoot = null;

  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
    this._responsive = null;
  }

  _updateResponsive() {
    this._responsive = `
      @media screen and (min-width: 650px) {
        h1 {
          font-size: 2.3rem;
        }
      }
    `;
  }

  _updateStyle() {
    this._updateResponsive();
    this._style.textContent = `
      .hero-container {
        position: relative;
      }
      
      .hero-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: white;
        width: 70%;
      }

      .hero-container picture img {
        width: 100%;
        height: 100vh;
        filter: brightness(30%) sepia(30%);
        object-fit: cover;
      }

      h1 {
        font-size: 1.8rem;
      }
      ${this._responsive};
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="hero-container">
        <picture>
          <source type="image/webp" media="(min-width: 600px)" srcset="/images/heros/hero-image_2-large.webp">
          <img src='/images/heros/hero-image_2-small.webp' alt="Hero Image">
        </picture>
        <div class="hero-text">
          <h1>Selamat Datang di Portal Restoran Kami</h1>
        </div>
      </div>
    `;
  }
}

customElements.define('hero-app', HeroApp);

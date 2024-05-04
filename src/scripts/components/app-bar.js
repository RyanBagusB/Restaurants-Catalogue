class AppBar extends HTMLElement {
  constructor() {
    super();
    this._style = document.createElement('style');
    this._responsive = null;
  }

  connectedCallback() {
    this.render();
  }

  updateResponsive() {
    this._responsive = `
      @media screen and (min-width: 670px) {
        ${this.localName} {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 10px;
          padding: 8px 32px;
        }

        .app-bar__brand h1 {
          font-size: 1.5em;
        }

        .app-bar__menu {
          display: none;
        }

        .app-bar__navigation {
          position: static;
          border: none;
        }

        .app-bar__navigation ul li {
          display: inline-block;
          border: none;
        }

        .app-bar__navigation ul li a {
          display: inline-block;
          width: 100px;
          text-align: center;
          margin: 0;
        }
      }

      @media screen and (min-width: 800px) {
        .app-bar__brand h1 {
          font-size: 2em;
        }

        .app-bar__navigation ul li a {
          font-size: 1.1rem;
          width: 120px;
        }
      }
    `;
  }

  updateStyle() {
    this.updateResponsive();
    this._style.textContent = `
      ${this.localName} {
        padding: 8px 16px;
        background-color: #021420;
        display: flex;
        position: fixed;
        justify-content: space-between;
        top: 0;
        width: 100%;
        z-index: 99;
        box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.2);
      }

      .app-bar__menu {
        display: flex;
        align-items: center;
      }

      .app-bar__menu button {
        background-color: transparent;
        border: none;
        font-size: 23px;
        padding: 8px 14px;
        cursor: pointer;
        color: #fff;
        transition: all 0.3s;
      }

      .app-bar__brand {
        display: flex;
        align-items: center;
      }

      .app-bar__brand h1 {
        color: #FFB72B;
        font-size: 22px;
        user-select: none;
      }

      .app-bar__navigation {
        position: absolute;
        top: 60px;
        left: -110%;
        width: 100%;
        transition: all 0.3s;
        padding: 8px;
        background-color: #021420;
        overflow: hidden;
        border-top: 0.3rem solid rgba(88, 78, 114, 0.4);
      }

      .app-bar__navigation.open {
        left: 0;
      }

      .app-bar__navigation ul li a {
        display: inline-block;
        text-decoration: none;
        color: #fff;
        padding: 14px;
        margin-bottom: 5px;
        width: 100%;
        transition: all 0.3s;
      }

      .app-bar__navigation ul li a:hover,
      .app-bar__menu button:hover {
        color: #FFB72B;
      }

      .app-bar__navigation ul li {
        border-bottom: 0.2rem solid rgba(88, 78, 114, 0.4);
      }

      .app-bar__navigation ul li:last-child {
        border-bottom: none;
      }

      ${this._responsive}
    `;
  }

  render() {
    this.updateStyle();

    this.innerHTML = `
      ${this._style.outerHTML}
      <div class="app-bar__brand">
        <h1>Ryanresto.</h1>
      </div>
      <div class="app-bar__menu">
        <button id="hamburgerButton">☰</button>
      </div>
      <nav id="navigationDrawer" class="app-bar__navigation">
        <ul>
          <li><a href="#/restaurant-list">Restaurant</a></li>
          <li><a href="#/top-three">Terbaik</a></li>
          <li><a href="#/like">Favorite</a></li>
          <li><a href="https://www.instagram.com/amib_03/">About Us</a></li>
        </ul>
      </nav>
    `;
  }
}

customElements.define('app-bar', AppBar);

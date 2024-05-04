class FooterBar extends HTMLElement {
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
        div {
          font-size: 1.3rem;
        }
      }
    `;
  }

  _updateStyle() {
    this._updateResponsive();
    this._style.textContent = `
      div {
        background: #021420;
        text-align: center;
        padding: 1.3rem .3rem;
        color: #fff;
        font-size: 0.9rem;
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
      <div>
        Copyright &copy; 2023 - Ryan Resto
      </div>
    `;
  }
}

customElements.define('footer-bar', FooterBar);

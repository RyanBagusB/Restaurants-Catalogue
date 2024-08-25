class SubHeading extends HTMLElement {
  static observedAttributes = ['color', 'size'];

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });

    this._heading = this.getAttribute('heading');
    this._subHeading = this.getAttribute('sub-heading');
    this._style = document.createElement('style');
    this._responsive = null;
  }

  connectedCallback() {
    this.render();
  }

  _updateResponsive() {
    this._responsive = `
      @media screen and (min-width: 650px) {
        .sub-heading {
          font-size: 1.5rem;
        }

        .heading {
          font-size: 2rem;
          margin: 0 0 2.5rem;
        }
      }

      @media screen and (min-width: 800px) {
        .sub-heading {
          font-size: 1.8rem;
        }

        .heading {
          font-size: 2.8rem;
        }
      }
    `;
  }

  _updateStyle() {
    this._updateResponsive();
    this._style.textContent = `
      .sub-heading {
        text-align: center;
        color: #021420;
        margin: 3rem 0 0;
        font-size: 1rem;
      }
    
      .heading {
        font-size: 1.5rem;
        margin: 0;
        text-align: center;
        color: #021420;
        margin: 0 0 1.5rem;
      }
      ${this._responsive}
    `;
  }

  render() {
    this._updateStyle();

    this._shadowRoot.innerHTML = `
    ${this._style.outerHTML}
      <h2 class="sub-heading">${this._subHeading}</h2>
      <h2 class="heading">${this._heading}</h2>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[`_${name}`] = newValue;
    this.render();
  }
}

customElements.define('sub-heading', SubHeading);

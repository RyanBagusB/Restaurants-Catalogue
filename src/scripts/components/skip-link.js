class SkipLink extends HTMLElement {
  constructor() {
    super();
    this._style = document.createElement('style');
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
      ${this.localName} button{
        position: absolute;
        top: -100px;
        left: 0;
        font-size: 1.5rem;
        background-color: #FFB72B;
        color: #fff;
        padding: 10px;
        z-index: 100;
        border: .2rem solid var(--secondary-color);
        border-radius: .5rem;
      }

      ${this.localName} button:focus {
        top: 0;
      }
    `;
  }

  render() {
    this.updateStyle();

    this.innerHTML = `
      ${this._style.outerHTML}
      <button id="skip-to-content">Ke konten</button>
    `;
    const skipToContent = document.querySelector('#skip-to-content');

    skipToContent.addEventListener('click', () => {
      const mainContent = document.querySelector('#restaurants');
      skipToContent.blur();
      mainContent.focus();
      mainContent.scrollIntoView();
    });
  }
}

customElements.define('skip-link', SkipLink);

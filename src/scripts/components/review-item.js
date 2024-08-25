class ReviewItem extends HTMLElement {
  constructor() {
    super();
    this._style = document.createElement('style');
    this._responsive = null;
    this._review = {};
  }

  setReview(value) {
    this._review.name = value.name;
    this._review.review = value.review;
    this._review.date = value.date;

    this.render();
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
        .card {
          padding: 20px;
          padding-bottom: 0;
          margin-bottom: 20px;
          background-color: #fff;
          border: 1px solid #aaa;
          border-radius: 5px;
          align-items: center;
        }

        ${this.localName} h3 {
          padding: 10px;
          font-size: 16px;
          color: #021420;
          border-bottom: 1px solid #aaa;
        }

        ${this.localName} p {
          margin: 20px 10px;
          word-wrap: break-word;
        }

        ${this.localName} p.date {
          color: #999;
          font-size: 0.8rem;
          margin: 30px 10px;
          text-align: right;
        }
      `;
  }

  render() {
    this.updateStyle();

    this.innerHTML = `
        ${this._style.outerHTML}
          <div class="card">
            <h3>${this._review.name}</h3>
            <p class="review">${this._review.review}</p>
            <P class="date">Tanggal: ${this._review.date}</P>
          </div>
      `;
  }
}

customElements.define('review-item', ReviewItem);

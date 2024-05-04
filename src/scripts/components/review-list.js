import CONFIG from '../globals/config';

class ReviewList extends HTMLElement {
  constructor() {
    super();
    this._style = document.createElement('style');
    this._responsive = null;

    this._renderReview = (item) => {
      const reviewList = document.querySelector('#reviewList');
      const review = document.createElement('review-item');
      review.setReview(item);

      reviewList.appendChild(review);
    };

    this._addReview = () => {
      const name = document.querySelector('#nameInput').value;
      const review = document.querySelector('#reviewInput').value;

      if (name.trim() === '' || review.trim() === '') return false;

      document.querySelector('#nameInput').value = '';
      document.querySelector('#reviewInput').value = '';

      return { name, review };
    };

    this.skeletonRender = () => {
      const reviewList = document.querySelector('#reviewList');

      for (let i = 0; i < 6; i += 1) {
        reviewList.innerHTML += '<div class="skeleton"></div>';
      }
    };
  }

  connectedCallback() {
    this.render();
  }

  updateResponsive() {
    this._responsive = `
      @media screen and (min-width: 670px) {
        .new-review {
          width: 50%;
        }
      }
    `;
  }

  updateStyle() {
    this.updateResponsive();
    this._style.textContent = `
      ${this.localName} {
        width: 100%;
        max-width: 800px;
        display: grid;
        grid-template-columns: 1fr;
        margin: auto;
        padding: 40px;
        gap: 20px;
      }

      #reviewList {
        height: 300px;
        overflow-y: auto;
        border: 1px solid #aaa;
        border-radius: 5px;
        padding: 10px;
      }

      .new-review {
        width: 100%;
      }

      .new-review textarea {
        margin: 5px 0;
        width: 100%;
        padding: 20px 10px;
        margin-bottom: 10px;
        border: 1px solid #aaa;
        border-radius: 5px;
        box-sizing: border-box;
      }

      .new-review input {
        margin: 5px 0;
        width: 100%;
        padding: 20px 10px;
        margin-bottom: 10px;
        border: 1px solid #aaa;
        border-radius: 5px;
        box-sizing: border-box;
      }

      .new-review button {
        background-color: #021420;
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        cursor: pointer;
        transition: .3s;
        font-size: 1.4rem;
      }


      .new-review button:hover {
        letter-spacing: .1rem;
      }

      #review-list .skeleton {
        border-radius: 5px;
        height: 5rem;
      }
      ${this._responsive}
    `;
  }

  async _postReview(id, name, review) {
    const response = await fetch(`${CONFIG.BASE_URL}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name, review }),
    });
    const result = await response.json();

    if (result.error) {
      alert('Review Gagal Terkirim');
    } else {
      const reviewList = document.querySelector('#reviewList');
      const reviews = result.customerReviews;

      reviewList.innerHTML = '';

      reviews.forEach((item) => {
        this._renderReview(item);
      });

      alert('Review Berhasil Dikirim');
    }
  }

  render() {
    this.updateStyle();

    this.innerHTML = `
      ${this._style.outerHTML}
      <h2>Tulis Review</h2>

      <div class="new-review">
        <label for="nameInput">Nama: </label>
        <input id="nameInput" type="text" placeholder="tuliskan nama anda..." autocomplete="off" required>
        <label for="reviewInput">Review: </label>
        <textarea id="reviewInput" placeholder="tuliskan review anda..." required"></textarea>
        <button id="postReviewButton">Kirim</button>
      </div>

      <h2>Review Mereka</h2>

      <div id="reviewList"></div>
    `;
  }

  afterRender(reviews, id) {
    const reviewList = document.querySelector('#reviewList');
    const postReviewButton = document.querySelector('#postReviewButton');

    reviewList.innerHTML = '';

    reviews.forEach((item) => {
      this._renderReview(item);
    });

    postReviewButton.addEventListener('click', () => {
      const item = this._addReview();

      if (item) {
        const { name, review } = item;
        this._postReview(id, name, review);
      }
    });
  }
}

customElements.define('review-list', ReviewList);

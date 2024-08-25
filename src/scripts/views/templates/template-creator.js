const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart liked" aria-hidden="true"></i>
  </button>
`;

const createMenuTemplate = (category, menus) => {
  let menuItemElements = '';

  menus.forEach((item) => {
    menuItemElements += `<li>${item.name}</li>`;
  });

  const menusContainer = `
    <h2>${category}</h2>
    <ul>${menuItemElements}</ul>
  `;

  return menusContainer;
};

const createCardSkeletonTemplate = () => `
  <div class="skeleton__card">
    <div class="skeleton"></div>
    <div class="skeleton skeleton-text"></div>
    <div class="skeleton skeleton-text"></div>
    <div class="skeleton skeleton-text"></div>
    <div class="skeleton skeleton-text"></div>
    <div class="skeleton skeleton-text"></div>
  </div>
`;

const createDetailSkeletonTemplate = () => `
<div class="skeleton skeleton-text"></div>
  <div class="restaurant__info">
    <div class="skeleton"></div>
    <div class="restaurant__info__content">
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text"></div>
    </div>
  </div>
  <div class="restaurant__overview">
    <div class="skeleton skeleton-text"></div>
    <div class="skeleton skeleton-text"></div>
    <div class="skeleton skeleton-text"></div>
    <div class="skeleton skeleton-text"></div>
  </div>
`;

export {
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createMenuTemplate,
  createCardSkeletonTemplate,
  createDetailSkeletonTemplate,
};

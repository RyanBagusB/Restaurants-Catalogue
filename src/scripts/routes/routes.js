const routes = {
  '/': document.createElement('restaurant-list'),
  '/restaurant-list': document.createElement('restaurant-list'),
  '/top-three': document.createElement('top-three'),
  '/detail/:id': document.createElement('restaurant-detail'),
  '/like': document.createElement('liked-restaurant'),
};

export default routes;

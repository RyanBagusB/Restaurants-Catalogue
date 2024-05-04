import CONFIG from './config';

const API_ENDPOINT = {
  LIST: `${CONFIG.BASE_URL}/list`,
  DETAIL: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
  PICTUREID: (id) => `${CONFIG.BASE_IMAGE_URL}${id}`,
};

export default API_ENDPOINT;

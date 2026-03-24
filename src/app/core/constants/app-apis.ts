import { environment } from '../../../environments/environment.development';

export const App_Apis = {
  products: {
    get: `api/v1/products`,
  },
  categories: {
    get: `api/v1/categories`,
  },
  auth: {
    login: `api/v1/auth/signin`,
    register: `api/v1/auth/signup`,
  },
  cart: {
    add: `api/v2/cart`,
    get: `api/v2/cart`,
  },
};

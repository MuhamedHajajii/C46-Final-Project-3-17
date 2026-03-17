import { environment } from '../../../environments/environment.development';

export const App_Apis = {
  products: {
    get: `${environment.baseUrl}api/v1/products`,
  },
  categories: {
    get: `${environment.baseUrl}api/v1/categories`,
  },
  auth: {
    login: `${environment.baseUrl}api/v1/auth/signin`,
    register: `${environment.baseUrl}api/v1/auth/signup`,
  },
};

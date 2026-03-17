import { environment } from '../../../environments/environment.development';

export const App_Apis = {
  products: {
    get: `${environment.baseUrl}api/v1/products`,
  },
};

import { post } from '@util/srequest';
import { apiUrl } from '../../../utils/constant';

export const fetchData = () => {
  const query = `query{
    afterSaleList {
      id
      type
      state
      review {
        name
      }
      channel {
        id
        name
        icon
      }
      productInfo {
        product {
          id
          img
        }
        spec
        amount
      }
    }
  }`;
  return post(apiUrl, { query });
};
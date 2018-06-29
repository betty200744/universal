import { post } from '@util/srequest';
import { apiUrl } from '../../../utils/constant';

export const getDetail = (afterSaleId: string) => {
  const query = `query($afterSaleId: ID!){
    afterSaleDetail(afterSaleId: $afterSaleId) {
      id
      serialNo
      type
      state
      expireDate
      create
      revokedTimes
      applyInfo {
        resaon
        phone
      }
      productInfo {
        product {
          id
          img
        }
        spec
        amount
        productCost
      }
      review {
        name
      }
    }
  }`;
  const variables = { afterSaleId };
  return post(apiUrl, { query, variables });
};

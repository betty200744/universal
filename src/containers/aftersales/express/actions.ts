import { post } from '@util/srequest';
import { apiUrl } from '../../../utils/constant';

export const fetchData = (afterSaleId: string) => {
  const query = `query($afterSaleId: ID!){
    afterSaleDetail(afterSaleId: $afterSaleId) {
      review {
        name
      }
      productInfo {
        product {
          id
          img
        }
        spec
      }
    }
    afterSaleUserLogisticsCompany
  }`;
  const variables = { afterSaleId };
  return post(apiUrl, { query, variables });
};

export const userDeliveryAfterSale = (afterSaleId: string, company: string, serial_no: string, images: Array<string>) => {
  const query = `mutation($afterSaleId: ID!, $logistics: AfterSaleLogistics){
    userDeliveryAfterSale(afterSaleId: $afterSaleId, logistics: $logistics)
  }`;
  const variables = { afterSaleId, logistics: { company, serial_no, images }};
  return post(apiUrl, { query, variables });
};
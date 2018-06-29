import { post } from '@util/srequest';
import { apiUrl } from '../../../utils/constant';

export const fetchData = (orderId: string, productId: string) => {
  const query = `query($orderId: String, $productId: String){
      getApplySkuInfo(orderId: $orderId, productId: $productId) {
        id
        name
        img
        spec
      }
      afterSaleUserLogisticsCompany
    }`;
  const variables = { orderId, productId };
  return post(apiUrl, { query, variables });
};

export const userDeliveryAfterSale = (afterSaleId: string, company: string, serial_no: string, images: Array<string>) => {
  const query = `query($afterSaleId: ID!, $logistics: AfterSaleLogistics){
    userDeliveryAfterSale(afterSaleId: $afterSaleId, logistics: $logistics) {
        id
        name
        img
        spec
      }
      afterSaleUserLogisticsCompany
    }`;
  const variables = { afterSaleId, logistics: { company, serial_no, images }};
  return post(apiUrl, { query, variables });
};
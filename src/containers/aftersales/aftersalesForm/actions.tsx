import { post } from '@util/srequest';
import { apiUrl } from '../../../utils/constant';

export const getRefundPrice = (orderId: string, productId: string, amount: number, reasonCode: string) => {
  const query = `query($orderId: ID!, $product: ID!, $amount: Int, $reasonCode: Int){
    afterSaleMakeRefundSubject(orderId: $orderId, product: $product, amount: $amount, reasonCode: $reasonCode) {
      expectRefundTransferFee
      totalPrice
    }
  }`;
  const variables = { orderId, product: productId, amount, reasonCode };
  return post(apiUrl, { query, variables });
};

export const fetchData = (orderId: string, productId: string, type: string) => {
  const query = `query($orderId: String, $productId: String){
      getApplySkuInfo(orderId: $orderId, productId: $productId) {
        name
        img
        spec
        amount
      }
      afterSaleReasonList {
        reason
        reasonCode
        used
      }
    }`;
  const variables = { orderId, productId };
  return post(apiUrl, { query, variables });
};

export const createAfterSale = (
  orderId: string,
  type: string,
  totalPrice: string,
  product: string,
  mount: number,
  reasonCode: string,
  description: string,
  images: Array<string>,
) => {
  const query = `mutation($orderId: ID!, $apply: Apply) {
    createAfterSale(orderId: $orderId, apply: $apply)
  }`;
  const variables = {
    orderId, apply: {
      type,
      totalPrice,
      product,
      mount,
      reasonCode,
      images,
      description,
    },
  };
  return post(apiUrl, { query, variables });

};

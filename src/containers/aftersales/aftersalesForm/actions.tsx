import { post } from '@util/srequest';
import { apiUrl } from '../../../utils/constant';

export const getRefundPrice = (orderId: string, productId: string, amount: number, reasonCode: string, aftersaleId: string) => {
  const query = `query($orderId: ID!, $product: ID!, $amount: Int, $reasonCode: Int, $filterId: ID){
    afterSaleMakeRefundSubject(orderId: $orderId, product: $product, amount: $amount, reasonCode: $reasonCode, filterId: $filterId) {
      expectRefundTransferFee
      totalPrice
    }
  }`;
  const variables = {
    orderId,
    product: productId,
    amount,
    reasonCode,
    filterId: '',
  };
  if (aftersaleId) {
    variables.filterId = aftersaleId;
  }
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

export const fetchAftersale = (afterSaleId: string) => {
  const query = `query($afterSaleId: ID!){
    afterSaleDetail(afterSaleId: $afterSaleId) {
      type
      applyInfo {
        resaon
        phone
        reasonCode
        images
        description
      }
      productInfo {
        amount
      }
      totalPrice
    }
  }`;
  const variables = { afterSaleId };
  return post(apiUrl, { query, variables });
};

export const createAfterSale = (
  orderId: string,
  type: string,
  totalPrice: string,
  product: string,
  amount: number,
  reasonCode: string,
  phone: string,
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
      amount,
      reasonCode,
      images,
      description,
    },
  };
  return post(apiUrl, { query, variables });

};

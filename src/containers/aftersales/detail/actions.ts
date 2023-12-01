import { post } from '@util/srequest';
import { apiUrl } from '../../../utils/constant';

export const getDetail = (afterSaleId: string) => {
  const query = `query($afterSaleId: ID!){
    afterSaleDetail(afterSaleId: $afterSaleId) {
      id
      order
      serialNo
      type
      state
      expireDate
      create
      revokedTimes
      totalPrice
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
      }
      review {
        name
      }
      sellerInfo {
        contact
        address
        comment
      }
      logistics {
        company
        serial_no
        sendBackFee
        images
      }
      sellerLogistics {
        company
        serial_no
      }
      cancelDate
      checkDate
      rejectInfo {
        reason
        description
      }
    }
  }`;
  const variables = { afterSaleId };
  return post(apiUrl, { query, variables });
};


export const cancel = (afterSaleId: string) => {
  const query = `mutation($afterSaleId: !ID) {
    cancelAfterSale(afterSaleId: $afterSaleId)
  }`;
  const variables = { afterSaleId };
  return post(apiUrl, { query, variables });
};
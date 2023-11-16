import { listIcon2, listIcon3, listIcon1 } from '../../utils/imgUrl';

export const typeMap: SimpleMap = {
  refund: '退货退款',
  replacement: '换货',
  reimburse: '仅退款',
};

export const stateMap: SimpleMap = {
  apply: '等待审核',
  waitDelivered: '等待买家发货',
  waitConfirm: '等待商家收货',
  complete: '售后成功',
  fail: '售后关闭',
};


export const listTypeIconMap: SimpleMap = {
  refund: listIcon2,
  replacement: listIcon3,
  reimburse: listIcon1,
};

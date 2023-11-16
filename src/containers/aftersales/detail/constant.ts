import { stateApply, stateWait, stateComplete, stateFail } from '../../../utils/imgUrl';

export const stateOptions: Array<Option> = [
  { value: 'apply', label: '等待审核' },
  { value: 'waitDelivered', label: '等待买家发货' },
  { value: 'waitConfirm', label: '等待商家收货' },
  { value: 'complete', label: '售后成功' },
  { value: 'fail', label: '售后关闭' },
];

export const imgMap: SimpleMap = {
  apply: stateApply,
  waitDelivered: stateWait,
  waitConfirm: stateApply,
  complete: stateComplete,
  fail: stateFail,
};
import { createAction } from 'redux-actions';
import { SHOP_INFO, CHANGE_SHOP_INFO, CHANGE_PHONE_LOGIN, CHANHE_COUPON_MODAL } from '../types';

export const changeShopInfo = createAction(CHANGE_SHOP_INFO, (target: string, value: string) => ({ target, value }));

export const changePhoneLogin = createAction(CHANGE_PHONE_LOGIN, (value: boolean) => ({ show: value }));

export const changeCouponModal = createAction(CHANHE_COUPON_MODAL, (value: boolean) => ({ show: value }));

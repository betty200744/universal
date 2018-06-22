import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { SHOP_INFO, CHANGE_SHOP_INFO, CHANGE_PHONE_LOGIN, CHANHE_COUPON_MODAL } from '../types';

const initState = {
  id: '',
  name: '',
  avatar: '',
  description: '',
  productCount: 0,
  launched: true,
  uv: 0,
  user: {
    avatar: '',
    nickname: '',
    inviteCode: '',
  },
};

const shopInfo = handleActions({
  [SHOP_INFO](state, action) {
    console.log(222, state, action);
    if (action.payload) {
      return { ...state, ...action.payload.shopInfo };
    } else {
      return { ...state, id: 15 };
    }
  },
  [CHANGE_SHOP_INFO](state, action) {
    console.log(222, state, action);
    return { ...state, [action.payload.target]: action.payload.value };
  },
}, initState as any);

const phoneLogin = handleActions({
  [CHANGE_PHONE_LOGIN](state, action) {
    return { show: action.payload.show };
  },
}, { show: false });

const couponModal = handleActions({
  [CHANHE_COUPON_MODAL](state, action) {
    return { show: action.payload.show };
  },
}, { show: false });

export default combineReducers({
  phoneLogin,
  shopInfo,
  couponModal,
});

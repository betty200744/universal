import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { SHOP_INFO } from '../types';

const shopInfo = handleActions({
  [SHOP_INFO](state, action) {
    return state;
  },
}, {});

export default combineReducers({
  shopInfo,
});

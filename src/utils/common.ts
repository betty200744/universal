import { isFireball } from '@util/useragent';
import { Message } from '../components';
import {
  goBack as nativeGoBack,
  gotoPage as nativeGoToPage,
  getSupport as nativeGetSupport,
} from './jsbridge';
import history from './history';


export const validateAndTips = (condition: boolean, message: string) => {
  if (!condition) {
    Message.error(message);
  }
  return condition;
};

export const isValidated = (conditions: Array<ConditionFace>) =>
  conditions.every(item => validateAndTips(item.condition, item.message));

/**
 * 数字转换成两位小数的金额浮点数,
 * @param number num 需要转换的数字,
 * @returns string 两位小数的浮点数金额,
*/

export const numberToMoney = (num: any): string => {
  if (!num) return '0';
  if (typeof num === 'string') {
    if (isNaN(Number(num))) {
      return '0';
    }
    return (num.split('.')[1] && num.split('.')[1].length > 2) ? Number(num).toFixed(2) : num;
  }
  if (typeof num === 'number') {
    return (num.toString().split('.')[1] && num.toString().split('.')[1].length > 2) ? num.toFixed(2) : num.toString();
  }
};

/**
 * 将服务端返回的日期转换成需要显示的日期；
 * @param string str 需要转换的时间字符串,
 * @param string type {long|short} 需要转换成的格式,
 * @returns string long返回 '2016-6-8 09:36:28' short返回'2016-6-8',
*/

const addZero = (number: number) => {
  if (number < 10) {
    return `0${number}`;
  }
  return `${number}`;
};

export const convertTimeString = (str: any, type = 'long', slicer = '-'): string => {
  let result = '';
  const date = new Date(str);
  const year = date.getFullYear();
  const month = addZero(date.getMonth() + 1);
  const day = addZero(date.getDate());
  const hour = addZero(date.getHours());
  const minute = addZero(date.getMinutes());
  const second = addZero(date.getSeconds());
  if (date && type === 'long') {
    result = `${year}${slicer}${month}${slicer}${day} ${hour}:${minute}:${second}`;
  }
  if (date && type === 'short') {
    result = `${year}${slicer}${month}${slicer}${day}`;
  }
  return result;
};

export const getRemainTime = (time: string): string => {
  const date = (Number(new Date(time)) - Number(new Date())) / 1000; //get s
  const minute = 60;
  const hour = 60 * minute;
  const day = 24 * hour;

  const d = Math.floor(date / day);
  const h = Math.floor(date / hour) - 24 * d;
  const m = Math.floor(date / minute) - h * 60 - d * 24 * 60;

  return `还剩 ${d} 天 ${h} 小时 ${m} 分`;
};

export const goToPage = (url: string) => {
  if (isFireball()) {
    nativeGoToPage(url);
  } else {
    console.log(history);
    history.push(url);
  }
};

export const goBack = () => {
  if (isFireball()) {
    nativeGoBack();
  } else {
    history.goBack();
  }
};

export const getSupport = () => {
  if (isFireball()) {
    nativeGetSupport();
  } else {
    window.location.href = 'https://huoqiukeji.qiyukf.com/client?k=74da12b1e7e9f730260909665350cb90&wp=1';
  }
};

export const goToAftersalesPage = (url: string) => {
  goToPage(`/universal/aftersales${url}`);
};

export const processNumberToK = (num: number) => {
  if (!num) return 0;
  const n = Number(num);
  if (isNaN(n)) return 0;
  if (n < 1000) {
    return n;
  }
  if (n > 10000) {
    return `${(n / 10000).toFixed(1)} w`;
  }
  if (n > 1000) {
    return `${(n / 1000).toFixed(1)} k`;
  }
  return 0;
};

export const getShopId = () => {
  return getQuery('shopId');
};

export const getQuery = (name: string) => {
  const search = window.location && window.location.search;
  if (!search) return '';
  const tempStr = search.slice(1);
  const items = tempStr.split('&');
  const queryList = {};
  items.forEach((k) => {
    const keyValue = k.split('=');
    const key = keyValue[0];
    const value = keyValue[1];
    (queryList as any)[key] = value;
  });
  let result = (queryList as any)[name];
  if (result && result !== 'undefined') {
    return result;
  }
  return '';
};

export const sendMessage = (message: any) => {
  localStorage.setItem('goBack', JSON.stringify(message));
  localStorage.removeItem('goBack');
};

export const scrollToTop = () => {
  try {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  } catch (e) {
    console.log(e);
  }
};

// 滚动条在Y轴上的滚动距离
export const getScrollTop = () => {
  let scrollTop = 0;
  let bodyScrollTop = 0;
  let documentScrollTop = 0;
  if (document.body) {
    bodyScrollTop = document.body.scrollTop;
  }
  if (document.documentElement) {
    documentScrollTop = document.documentElement.scrollTop;
  }
  scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
  return scrollTop;
};

// 文档总高度
const getScrollHeight = () => {
  let scrollHeight = 0;
  let bodyScrollHeight = 0;
  let documentScrollHeight = 0;
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight;
  }
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight;
  }
  scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
  return scrollHeight;
};

// 浏览器视窗
const getWindowHeight = () => {
  let windowHeight = 0;
  if (document.compatMode === 'CSS1Compat') {
    windowHeight = document.documentElement.clientHeight;
  } else {
    windowHeight = document.body.clientHeight;
  }
  return windowHeight;
};

// 距离底部距离
export const getBottomHeight = () => {
  return getScrollHeight() - getScrollTop() - getWindowHeight();
};
import cookies from 'js-cookie';
import { jsBridgeCallNative, jsBridgeRegisterNative } from '@util/jsbridge';

interface ShareData {
  title: string;
  cover: string;
  content: string;
  shareLink: string;
  type: string;
  extra: any;
  coupon?: string;
}

const isLocal = () => !!window.location.port;

export const gotoPage = (url: string, allPage: boolean = false) => {
  const link = isLocal() ? 'http://192.168.20.6:4052' : window.location.origin;
  console.log(link + url);
  return jsBridgeCallNative('gotoPage', {
    url: link + url + (allPage ? `${url.indexOf('?') !== -1 ? '&' : '?'}allPage=true` : ''),
    allPage,
  });
};

export const goBack = (event: string = 'goBack') => {
  return jsBridgeCallNative('goBack', event);
};

export const userLogout = () => {
  return jsBridgeCallNative('userLogout');
};

export const getSupport = () => {
  return jsBridgeCallNative('getSupport');
};

export const getUserInfo = () => {
  return jsBridgeCallNative('getUserInfo');
};

export const uploadPhotos = () => {
  return jsBridgeCallNative('uploadPhotos');
};

export const showTip = (text: string, type: string = 'success') => {
  return jsBridgeCallNative('showTip', { type, text });
};

export const showLoading = () => {
  return jsBridgeCallNative('showLoading');
};

export const hideLoading = () => {
  return jsBridgeCallNative('hideLoading');
};

export const downloadPhotos = (imgs: Array<string>, qrcode: string, text: string) => {
  return jsBridgeCallNative('downloadPhotos', { imgs, qrcode, text });
};

export const downloadPhotosStrict = (imgs: Array<string>) => {
  return jsBridgeCallNative('downloadPhotosStrict', { imgs });
};

export const onClickShareButton = (shareData: ShareData) => {
  cookies.get('isShopOwner');
  return jsBridgeCallNative('onClickShareButton', {
    ...shareData,
    shareLink: !cookies.get('isShopOwner') ? `${shareData.shareLink.split('?')[0]}?shopId=15` : shareData.shareLink,
    extra: JSON.stringify(shareData.extra),
    coupon: '10元',
  });
};

export const becomeShopOwner = () => {
  return jsBridgeCallNative('becomeShopOwner');
};

export const closeAllWebs = () => {
  return jsBridgeCallNative('closeAllWebs');
};

export const getStatusBarHeight = () => {
  return jsBridgeCallNative('getStatusBarHeight');
};

export const copyText = (text: string) => {
  return jsBridgeCallNative('copyText', text);
};



export const listenGoBack = (callback: any) => {
  return jsBridgeRegisterNative('goBack', callback);
};

export const completeUploadPhotos = (callback: any) => {
  return jsBridgeRegisterNative('completeUploadPhotos', callback);
};

export const listenRefresh = (callback: any) => {
  return jsBridgeRegisterNative('refresh', callback);
};
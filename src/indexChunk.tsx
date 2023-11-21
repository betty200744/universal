import * as React from 'react';
const Loadable = require('react-loadable');
const loading = () => <div></div>;

export const afterSalesHome = Loadable({ loader: () => import('./containers/aftersales/applyAftersales/index'), loading });
export const afterSalesForm = Loadable({ loader: () => import('./containers/aftersales/aftersalesForm/index'), loading });
export const afterSalesDetail = Loadable({ loader: () => import('./containers/aftersales/detail'), loading });
export const afterSalesList = Loadable({ loader: () => import('./containers/aftersales/list'), loading });
export const afterSalesNegotiate = Loadable({ loader: () => import('./containers/aftersales/negotiate'), loading });
export const afterSalesExpress = Loadable({ loader: () => import('./containers/aftersales/express'), loading });
export const afterSalesTimeout = Loadable({ loader: () => import('./containers/aftersales/timeout'), loading });


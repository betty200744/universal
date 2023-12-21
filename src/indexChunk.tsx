import * as React from 'react';
const Loadable = require('react-loadable');
const loading = () => <div></div>;

export const AfterSalesHome = Loadable({ loader: () => import('./containers/aftersales/applyAftersales/index'), loading });
export const AfterSalesForm = Loadable({ loader: () => import('./containers/aftersales/aftersalesForm/index'), loading });
export const AfterSalesDetail = Loadable({ loader: () => import('./containers/aftersales/detail'), loading });
export const AfterSalesList = Loadable({ loader: () => import('./containers/aftersales/list'), loading });
export const AfterSalesNegotiate = Loadable({ loader: () => import('./containers/aftersales/negotiate'), loading });
export const AfterSalesExpress = Loadable({ loader: () => import('./containers/aftersales/express'), loading });
export const AfterSalesTimeout = Loadable({ loader: () => import('./containers/aftersales/timeout'), loading });
export const Logistics = Loadable({ loader: () => import('./containers/aftersales/logistics'), loading });


import * as React from 'react';
const Loadable = require('react-loadable');
const loading = () => <div></div>;

export const afterSalesHome = Loadable({ loader: () => import('./containers/aftersales/applyAftersales/index'), loading });
export const afterSalesForm = Loadable({ loader: () => import('./containers/aftersales/aftersalesForm/index'), loading });


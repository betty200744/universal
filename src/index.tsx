import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Switch, Route, Router } from 'react-router-dom';
import { isFireball } from '@util/useragent';
import { jsBridgeReady } from '@util/jsbridge';
import {
  AfterSalesHome, AfterSalesForm, AfterSalesDetail,
  AfterSalesNegotiate, AfterSalesExpress, AfterSalesList,
  AfterSalesTimeout, Logistics,
} from './indexChunk';
import history from './utils/history';
import configStore from './store';
import './styles/reset.less';
import './styles/font.less';
const store = configStore();

const afterSalesRoutes = [
  { path: '/home', exact: true, component: AfterSalesHome },
  { path: '/form', exact: true, component: AfterSalesForm },
  { path: '/detail/:id', exact: true, component: AfterSalesDetail },
  { path: '/list', exact: true, component: AfterSalesList },
  { path: '/negotiate/:id', exact: true, component: AfterSalesNegotiate },
  { path: '/express/:id', exact: true, component: AfterSalesExpress },
  { path: '/timeout', exact: true, component: AfterSalesTimeout },
  { path: '/logistics', exact: true, component: Logistics },
];

const otherRoutes = [
  { path: '/home', exact: true, component: AfterSalesHome },
];

const routes = [
  ...afterSalesRoutes.map(e => ({ ...e, path: `/porygon/aftersales${e.path}` })),
  ...otherRoutes.map(e => ({ ...e, path: `/porygon/other${e.path}` })),
];

console.log(routes);

// 按需渲染路由
const RenderRouter = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <div>
          <Switch>
            {
              routes.map(route => <Route
                key={route.path}
                {...route}
              />)
            }
          </Switch>
        </div>
      </Router>
    </Provider>,
    document.getElementById('example'),
  );
};

if (isFireball()) {
  jsBridgeReady().then(() => {
    RenderRouter();
  });
} else {
  RenderRouter();
}
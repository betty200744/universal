import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Switch, Route, Router } from 'react-router-dom';
import {
  afterSalesHome, afterSalesForm, afterSalesDetail, afterSalesNegotiate, afterSalesExpress,
} from './indexChunk';
import history from './utils/history';
import configStore from './store';
import './styles/reset.less';
import './styles/font.less';
const store = configStore();

const afterSalesRoutes = [
  { path: '/home', exact: true, component: afterSalesHome },
  { path: '/form', exact: true, component: afterSalesForm },
  { path: '/detail/:id', exact: true, component: afterSalesDetail },
  { path: '/negotiate/:id', exact: true, component: afterSalesNegotiate },
  { path: '/express/:id', exact: true, component: afterSalesExpress },

];

const otherRoutes = [
  { path: '/home', exact: true, component: afterSalesHome },
];

const routes = [
  ...afterSalesRoutes.map(e => ({ ...e, path: `/aftersales${e.path}` })),
  ...otherRoutes.map(e => ({ ...e, path: `/other${e.path}` })),
];

console.log(routes);

// 按需渲染路由
const RenderRouter = (types: any) => {
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


RenderRouter(['buyer']);
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  afterSalesHome,
} from './indexChunk';
import configStore from './store';
import './styles/reset.less';
import './styles/font.less';
const store = configStore();

const afterSalesRoutes = [
  { path: '/home', exact: true, component: afterSalesHome },
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
      <BrowserRouter>
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
      </BrowserRouter>
    </Provider>,
    document.getElementById('example'),
  );
};


RenderRouter(['buyer']);
import * as React from 'react';
import { Image } from '../../../components';
import ReviewTop from '../components/reviewTop';
import Panel from '../components/panel';
const Styles = require('./index.less');

interface IProps { }

interface IState { }

class App extends React.Component<IProps, IState> {
  render() {
    return (
      <Panel className={Styles.info}>
        <div className={Styles.infoTitle}>售后信息</div>
        <ReviewTop />

        <div className={Styles.infoDetail}>
          <div>售后类型：退货退款</div>
          <div>售后类型：退货退款</div>
          <div>售后类型：退货退款</div>
          <div>售后类型：退货退款</div>
          <div>售后类型：退货退款</div>
          <div>售后类型：退货退款</div>
          <div>售后类型：退货退款</div>
          <div>售后类型：退货退款</div>
        </div>
      </Panel>
    );
  }
}

export default App;
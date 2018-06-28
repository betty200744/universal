import * as React from 'react';
import { Image } from '../../../components';
const Styles = require('./index.less');


const Item = () => (<div className={Styles.item}>
  <div className={Styles.itemTop}>
    <div><Image src={'1'} />系统</div>
    <div>2018.01.23 20:34</div>
  </div>
  <div className={Styles.itemBtm}>
    <div>由于商家超时未处理，自动确认收货并同意退款</div>
    <div>退款金额：¥139.00</div>
  </div>
</div>);

interface IProps { }

interface IState { }

class App extends React.Component<IProps, IState> {
  render() {
    return (
      <div>

      </div>
    );
  }
}

export default App;
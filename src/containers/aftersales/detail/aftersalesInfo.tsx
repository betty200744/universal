import * as React from 'react';
import ReviewTop from '../components/reviewTop';
import Panel from '../components/panel';
import { typeMap } from '../constant';
import { numberToMoney, convertTimeString } from '../../../utils/common';
const Styles = require('./index.less');

interface IProps {
  review: SimpleReview;
  type: string;
  reason: string;
  phone: string;
  create: string;
  serialNo: string;
  totalPrice: number;
  noSpec: boolean;
}

interface IState { }

class App extends React.Component<IProps, IState> {
  render() {
    const { review, type, reason, phone, create, serialNo, totalPrice, noSpec } = this.props;
    return (
      <Panel className={Styles.info}>
        <div className={Styles.infoTitle}>售后信息</div>
        <ReviewTop review={review} noSpec={noSpec} />

        <div className={Styles.infoDetail}>
          <div>售后类型：{typeMap[type]}</div>
          <div>申请原因：{reason}</div>
          <div>申请数量：{review.amount}</div>
          <div>退款金额：¥{numberToMoney(totalPrice)}</div>
          <div>联系电话：{phone}</div>
          <div>申请时间：{convertTimeString(create)}</div>
          <div>售后编号：{serialNo}</div>
        </div>
      </Panel>
    );
  }
}

export default App;
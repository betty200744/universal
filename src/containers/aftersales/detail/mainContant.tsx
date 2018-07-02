import * as React from 'react';
import Panel from '../components/panel';
import { Image } from '../../../components';
import { grayArrow } from '../../../utils/imgUrl';
import { numberToMoney, goToAftersalesPage } from '../../../utils/common';
const Styles = require('./index.less');



interface IProps {
  state: string;
  type: string;
  sellerInfo: UserInfo;
  logistics: LogisticInfo;
  // 是否用户自己撤销
  revoke: boolean;
  id: string;
  totalPrice: number;
}

interface IState { }

const Apply = ({ type }: {type: string}) => {
  return (
    <Panel className={Styles.mainApply}>
      <div className={Styles.mainApplyTop}>您已成功提交售后申请，请耐心等待商家处理</div>
      <div className={Styles.mainApplyBtm}>
        <div>{type === 'reimburse' ?
          '若商家超时未处理申请，系统将自动退款给您' :
          '若商家超时未处理申请，系统会自动同意并将默认退货地址发送给您'}
        </div>
        <div>若商家拒绝，您可以再次申请</div>
      </div>
    </Panel>
  );
};

const WaitDelivered = ({ sellerInfo, id }: {sellerInfo: UserInfo, id: string}) => {
  return (
    <div className={Styles.mainWaitDelivered}>
      <Panel className={Styles.panel} onClick={() => goToAftersalesPage(`/express/${id}`)}>
        <div className={Styles.panelLabel}>请寄回物品并填写物流信息</div>
      </Panel>

      <Panel className={Styles.panel}>
        <div className={Styles.panelLabel}>商品寄送地址</div>
        <div className={Styles.panelLabel1}>
          <div>{sellerInfo.comment} {sellerInfo.contact}</div>
          <div>{sellerInfo.address}</div>
        </div>
      </Panel>

      <Panel className={Styles.panel}>
        <div>
          <div className={Styles.panelLabel}>退货说明</div>
          <div className={Styles.panelSubLabel}>
            请您备好买手名称，退换货要求，并且保证商品的包装，吊牌完好，商品不影响二次销售，
            否则商家有权拒签。拒收顺丰，到付，平邮，国通，邮政。非质量问题的退换货运费需要您自理
            ，请知悉。感谢您的配合！
          </div>
        </div>
        <div className={Styles.mainApplyBtm}>
          <div>若您超时未填写物流信息，申请将自动撤销。</div>
          <div>未与商家协商一致，请勿用到付或平邮，以免商家拒签货物。</div>
        </div>
      </Panel>
    </div>
  );
};

const WaitConfirm = ({ type, logistics }: {type: string, logistics: LogisticInfo}) => {
  return (
    <Panel className={Styles.panel}>
      <div className={Styles.flex}>
        <div className={Styles.panelLabel}>若商家收到货验货无误，将
          {type === 'refund' ? '退款给您' : '发出换货商品'}
        </div>
        <div>
          <Image src={grayArrow} />
        </div>
      </div>
      <div className={Styles.panelLabel1} style={{ borderBottom: 'solid 1px #e6e6e6' }}>
        <div>退货物流公司：{logistics.company}</div>
        <div>退货物流单号：{logistics.serial_no}</div>
        <div>退货寄回邮费：¥{numberToMoney(logistics.sendBackFee)}</div>
      </div>

      <div className={Styles.mainApplyBtm}>
        <div>若商家超时未处理，
          {type === 'refund' ? '系统将自动退款给您' : '平台客服将介入处理'}
        </div>
        <div>若商家拒绝，您可以在此申请</div>
      </div>
    </Panel>
  );
};

const Complete = ({ type, logistics, totalPrice }: {type: string, logistics: LogisticInfo, totalPrice: number}) => {
  return (
    type !== 'replacement' ?
      <Panel className={Styles.panel}>
        <div className={Styles.flex}>
          <div className={Styles.panelLabel}>退款金额</div>
          <div className={Styles.paneMoney}>￥{numberToMoney(totalPrice)}</div>
        </div>
        <div className={Styles.panelLabel1} style={{ color: '#ababab' }}>
          <div>退款将在 1-7 个工作日内退回您的愿支付账户</div>
        </div>
      </Panel> :
      <Panel className={Styles.panel}>
        <div className={Styles.flex}>
          <div className={Styles.panelLabel}>商家已将换货商品发出</div>
          <div>
            <Image src={grayArrow} />
          </div>
        </div>

        <div className={Styles.panelLabel1}>
          <div>物流公司：{logistics.company}</div>
          <div>物流单号：{logistics.serial_no}</div>
        </div>
      </Panel>
  );
};

const Fail = ({ revoke }: {revoke: boolean}) => {
  return (
    revoke ? <Panel className={Styles.panel}>
      <div>
        <div className={Styles.panelLabel}>由于商家拒绝了您的售后申请，售后已关闭</div>
      </div>
      <div className={Styles.panelLabel1}>
        <div>拒绝原因：商品已影响二次销售</div>
        <div>拒绝说明：亲，鞋底已经脏了不能退货了哦</div>
      </div>
    </Panel>
      : <Panel className={Styles.panel}>
        <div className={Styles.panelLabel}>由于您主动撤销售后申请，售后已关闭</div>
      </Panel>
  );
};


class MainContent extends React.Component<IProps, IState> {
  render() {
    const { state, type, sellerInfo, logistics, revoke, id, totalPrice } = this.props;
    switch (state) {
    case 'apply': return (<div><Apply type={type} /></div>);
    case 'waitDelivered': return (<div><WaitDelivered sellerInfo={sellerInfo} id={id} /></div>);
    case 'waitConfirm': return (<div><WaitConfirm type={type} logistics={logistics} /></div>);
    case 'complete': return (<div><Complete type={type} logistics={logistics} totalPrice={totalPrice} /></div>);
    case 'fail': return (<div><Fail revoke={revoke} /></div>);
    default: return <div></div>;
    }
  }
}

export default MainContent;
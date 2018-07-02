import * as React from 'react';
import Prograss from './progress';
import Info from './aftersalesInfo';
import TopState from './topState';
import Panel from '../components/panel';
import { Message, Image, Title } from '../../../components';
import { grayArrow } from '../../../utils/imgUrl';
import { getDetail } from './actions';
import { goToAftersalesPage } from '../../../utils/common';
import MainContent from './mainContant';
const Styles = require('./index.less');
const pick = require('lodash/pick');

interface IProps {
  match: any;
}

interface IState {
  id: string;
  type: string;
  reason: string;
  phone: string;
  serialNo: string;
  create: string;
  state: string;
  review: SimpleReview;
  totalPrice: number;
  expireDate: string;
  cancelDate: string;
  checkDate: string;
  sellerInfo: UserInfo;
  logistics: LogisticInfo;
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      type: '',
      reason: '',
      phone: '',
      serialNo: '',
      create: '',
      state: 'apply',
      totalPrice: 0,
      expireDate: '',
      cancelDate: '',
      checkDate: '',
      sellerInfo: {
        contact: '',
        address: '',
        comment: '',
      },
      logistics: {
        company: '',
        serial_no: '',
      },
      review: {
        _id: '',
        img: '',
        name: '',
        spec: '',
        amount: 0,
      },
    };
  }

  componentDidMount() {
    this.fetchDetail();
  }

  fetchDetail = () => {
    const { id } = this.state;
    getDetail(id).then((res: any) => {
      const data  = res.afterSaleDetail;
      const pickItem = [
        'serialNo', 'type', 'state', 'expireDate',
        'create', 'revokedTimes', 'sellerInfo',
        'logistics', 'sellerLogistics', 'rejectInfo',
        'checkDate', 'expireDate', 'cancelDate',
      ];
      this.setState({
        ...pick(data, pickItem),
        ...data.applyInfo,
        review: {
          _id: data.productInfo.product.id,
          img: data.productInfo.product.img,
          spec: data.productInfo.spec,
          amount: data.productInfo.amount,
          name: data.review.name,
        },
        totalPrice: data.totalPrice,
      });
    }).catch(Message.error);

  }

  render() {
    console.log(this.props.match.params.id);
    const {
      review, type, reason, phone, create, serialNo,
      totalPrice, id, state, expireDate, cancelDate,
      sellerInfo, logistics, checkDate,
    } = this.state;
    const reimburse = type === 'reimburse';
    return (
      <div>
        <Title title="售后详情" goBack />

        <TopState
          state={state}
          expireDate={expireDate}
          cancelDate={cancelDate}
          checkDate={checkDate}
        />

        <Prograss state={state} reimburse={reimburse} />

        <MainContent
          state={state}
          type={type}
          sellerInfo={sellerInfo}
          logistics={logistics}
          revoke={!!cancelDate}
          totalPrice={totalPrice}
          id={id}
        />

        <Panel
          className={Styles.record}
          onClick={() => goToAftersalesPage(`/negotiate/${id}`)}
        >
          <div>协商记录</div>
          <div><Image src={grayArrow} /></div>
        </Panel>
        <Info
          review={review}
          type={type}
          reason={reason}
          phone={phone}
          create={create}
          serialNo={serialNo}
          totalPrice={totalPrice}
          noSpec={reimburse}
        />
      </div>
    );
  }
}

export default App;
import * as React from 'react';
import Prograss from './progress';
import Info from './aftersalesInfo';
import Panel from '../components/panel';
import { Message, Image, Title } from '../../../components';
import { grayArrow } from '../../../utils/imgUrl';
import { getDetail } from './actions';
import { goToAftersalesPage } from '../../../utils/common';
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
  productCost: number;
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
      state: '',
      productCost: 0,
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
      const pickItem = ['serialNo', 'type', 'state', 'expireDate', 'create', 'revokedTimes'];
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
        productCost: data.productInfo.productCost,
      });
    }).catch(Message.error);

  }

  render() {
    console.log(this.props.match.params.id);
    const { review, type, reason, phone, create, serialNo, productCost, id } = this.state;
    return (
      <div>
        <Title title="售后详情" goBack />
        <Prograss />

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
          productCost={productCost}
        />
      </div>
    );
  }
}

export default App;
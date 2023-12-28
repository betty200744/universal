import * as React from 'react';
import { post } from '@util/srequest';
import { Message, Title, Image } from '../../../components';
import ReviewTop from '../components/reviewTop';
import { grayArrow, refundIcon, replacementIcon, reimburseIcon } from '../../../utils/imgUrl';
import { getQuery, goToAftersalesPage } from '../../../utils/common';
import { apiUrl } from '../../../utils/constant';
const Styles = require('./index.less');

interface ItemProps {
  type: string;
  img: string;
  label: string;
}

const list: Array<ItemProps> = [
  { type: 'refund', img: refundIcon, label: '退货退款' },
  { type: 'replacement', img: replacementIcon, label: '换货' },
  { type: 'reimburse', img: reimburseIcon, label: '仅退款' },
];


const Item = ({ item, onClick }: { item:ItemProps, onClick(item: ItemProps): void }) => {
  return (
    <div key={item.type} className={Styles.item} onClick={() => onClick(item)}>
      <div className={Styles.itemImg}><Image src={item.img} /></div>
      <div className={Styles.itemText}>
        <div>{item.label}</div>
        <div>
          <Image src={grayArrow} />
        </div>
      </div>
    </div>
  );
};


interface IProps { }

interface IState {
  review: SimpleReview;
  orderId: string;
  productId: string;
  aftersaleId: string;
}

class ApplyAftersales extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      review: {
        _id: '',
        name: '',
        img: '',
        spec: '',
        amount: 0,
      },
      orderId: getQuery('order'),
      productId: getQuery('product'),
      aftersaleId: getQuery('aftersale'),
    };
  }

  componentDidMount() {
    const { orderId, productId } = this.state;
    this.fetchProduct(orderId, productId);
  }

  fetchProduct = (orderId: string, productId: string) => {
    const query = `query($orderId: String, $productId: String){
      getApplySkuInfo(orderId: $orderId, productId: $productId) {
        name
        img
        spec
        amount
      }
    }`;
    const variables = { orderId, productId };
    post(apiUrl, { query, variables }).then((res: any) => {
      this.setState({ review: res.getApplySkuInfo });
    }).catch(Message.error);
  }

  onClick = (item: ItemProps) => {
    const { orderId, productId, aftersaleId } = this.state;
    if (aftersaleId) {
      goToAftersalesPage(`/form?type=${item.type}&order=${orderId}&product=${productId}&aftersale=${aftersaleId}`);
    } else {
      goToAftersalesPage(`/form?type=${item.type}&order=${orderId}&product=${productId}`);
    }
  }

  render() {
    const { review } = this.state;
    return (
      <div>
        <Title title="申请售后" goBack />

        <ReviewTop review={review} />

        <div className={Styles.box}>
          {list.map(e => (<Item key={e.type} item={e} onClick={this.onClick} />))}
        </div>
      </div>
    );
  }
}

export default ApplyAftersales;
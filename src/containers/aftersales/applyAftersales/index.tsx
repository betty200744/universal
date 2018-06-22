import * as React from 'react';
import { Title, Image } from '../../../components';
import ReviewTop from '../components/reviewTop';
import { grayArrow, refundIcon, replacementIcon, reimburseIcon } from '../../../utils/imgUrl';
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


const Item = ({ item }: { item:ItemProps }) => {
  return (
    <div key={item.type} className={Styles.item}>
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

interface IState { }

class App extends React.Component<IProps, IState> {
  render() {
    return (
      <div>
        <Title title="122" goBack />

        <ReviewTop />

        <div className={Styles.box}>
          {list.map(e => (<Item key={e.type} item={e} />))}
        </div>
      </div>
    );
  }
}

export default App;
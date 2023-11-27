import * as React from 'react';
import Item from './item';
import { fetchData } from './actions';
import { Message, Title } from '../../../components';

interface IProps { }

interface ItemFace {
  id: string;
  type: string;
  state: string;
  review: SimpleReview;
  channel: SimpleChannel;
}

interface IState {
  list: Array<ItemFace>;
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetchData().then((res: any) => {
      const list = res.afterSaleList;
      this.setState({
        list: list.map((e: any) => {
          return {
            review: {
              _id: e.productInfo.product.id,
              img: e.productInfo.product.img,
              name: e.review.name,
              spec: e.productInfo.spec,
              amount: e.productInfo.amount,
            },
            channel: e.channel,
            id: e.id,
            type: e.type,
            state: e.state,
          };
        }),
      });
    }).catch(Message.error);
  }

  render() {
    const { list } = this.state;
    return (
      <div>
        <Title title="我的售后" goBack />
        {list.map((e: ItemFace) => (<Item
          key={e.id}
          review={e.review}
          channel={e.channel}
          id={e.id}
          type={e.type}
          state={e.state}
        />))}
      </div>
    );
  }
}

export default App;
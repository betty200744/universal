import * as React from 'react';
import { post } from '@util/srequest';
import { Message,  Image } from '../../../components';
import { apiUrl } from '../../../utils/constant';
import { convertTimeString } from '../../../utils/common';
import { buyerIcon, systemIcon, merchantIcon } from '../../../utils/imgUrl';
const Styles = require('./index.less');

const belongMap: SimpleMap = {
  user: '用户',
  buyer: '买手',
  system: '系统',
  merchant: '商家',
  platform: '平台',
};

const logoMap: SimpleMap = {
  user: buyerIcon,
  buyer: buyerIcon,
  system: systemIcon,
  merchant: merchantIcon,
  platform: merchantIcon,
};


const Item = ({ item }: {item:Item}) => (<div className={Styles.item}>
  <div className={Styles.itemTop}>
    <div className={Styles.itemTop1}><Image src={logoMap[item.belong]} />{belongMap[item.belong]}</div>
    <div className={Styles.itemTop2}>{convertTimeString(item.create)}</div>
  </div>
  <div className={Styles.itemBtm}>
    <div>{item.actionLabel}</div>
    {item.detail.map((e: {key: string, val: string}) => <div key={e.val}>{e.key}: {e.val}</div>)}
    {item.images && item.images.length ? item.images.map((e: string) => <div key={e}><Image src={e} /></div>) : null}
  </div>
</div>);

interface Item {
  id: string;
  create: string;
  operator: {nickname: string};
  belong: string;
  action: string;
  actionLabel: string;
  description: string;
  detail: Array<{key: string; val: string}>;
  images: Array<string>;
}

interface IProps {
  match: any;
}

interface IState {
  id: string;
  list: Array<Item>;
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      list: [],
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { id } = this.state;
    const query = `query($afterSaleId: ID!) {
      afterSaleLogs(afterSaleId: $afterSaleId) {
        id
        create
        operator {
          nickname
        }
        belong
        action
        actionLabel
        description
        detail {
          key
          val
        }
        images
      }
    }`;
    const variables = { afterSaleId: id };
    post(apiUrl, { query, variables }).then((res: any) => {
      this.setState({ list: res.afterSaleLogs });
    }).catch(Message.error);
  }
  render() {
    return (
      <div>
        {this.state.list.map((e: Item) => (<Item key={e.id} item={e} />))}
      </div>
    );
  }
}

export default App;
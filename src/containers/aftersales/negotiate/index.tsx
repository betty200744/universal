import * as React from 'react';
import { post } from '@util/srequest';
import { Title, Button, Message, Image } from '../../../components';
import Submit from '../components/submit';
import { apiUrl } from '../../../utils/constant';
import { convertTimeString, getSupport } from '../../../utils/common';
import { buyerIcon, systemIcon, merchantIcon } from '../../../utils/imgUrl';
const Styles = require('./index.less');

const belongMap: SimpleMap = {
  user: '用户',
  system: '系统',
  merchant: '卖家',
  platform: '卖家',
  buyer: '卖家',
};

const logoMap: SimpleMap = {
  user: buyerIcon,
  system: systemIcon,
  merchant: merchantIcon,
  platform: merchantIcon,
  buyer: merchantIcon,
};


const Item = ({ item }: {item:Item}) => (<div className={Styles.item}>
  <div className={Styles.itemTop}>
    <div className={Styles.itemTop1}><Image src={logoMap[item.belong]} />{belongMap[item.belong]}</div>
    <div className={Styles.itemTop2}>{convertTimeString(item.create)}</div>
  </div>
  <div className={Styles.itemBtm}>
    <div>{item.actionLabel}</div>
    {item.detail.map((e: {key: string, val: string}) => <div key={e.key}>{e.key}: {e.val}</div>)}
    {item.images && item.images.length ? item.images.map((e: string) => <Image style={{ marginRight: '0.8rem' }} src={e} key={e} />) : null}
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
  match: {
    params: {
      id: string;
    };
  };
}

interface IState {
  id: string;
  list: Array<Item>;
}

class Negotiate extends React.Component<IProps, IState> {
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

  click = () => {
    getSupport();
  }
  render() {
    return (
      <div>
        <Title title="协商记录" goBack />

        {this.state.list.map((e: Item) => (<Item key={e.id} item={e} />))}

        <Submit>
          <Button type="danger-light" onClick={this.click}>联系客服</Button>
        </Submit>
      </div>
    );
  }
}

export default Negotiate;
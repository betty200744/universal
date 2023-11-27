import * as React from 'react';
import { Image, Button } from '../../../components';
import ReviewTop from '../components/reviewTop';
import { typeMap, stateMap, listTypeIconMap } from '../constant';
import { goToAftersalesPage } from '../../../utils/common';
const Styles = require('./index.less');

interface IProps {
  id: string;
  type: string;
  state: string;
  review: SimpleReview;
  channel: SimpleChannel;
}

interface IState { }

class App extends React.Component<IProps, IState> {
  render() {
    const { review, channel, type, state, id } = this.props;
    return (
      <div className={Styles.item}>
        <div className={Styles.itemTop}>
          <div>
            <Image src={channel.icon} />
          </div>
          <div>{channel.name}</div>
        </div>
        <div>
          <ReviewTop review={review} />
        </div>
        <div className={Styles.itemBtm}>
          <div className={Styles.itemBtmText}>
            <Image src={listTypeIconMap[type]} />
            {typeMap[type]}<span>{stateMap[state]}</span>
          </div>
          <Button
            type="default"
            width={8}
            height={2.9}
            onClick={() => goToAftersalesPage(`/detail/${id}`)}
          >
            查看详情
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
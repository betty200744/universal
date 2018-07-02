import * as React from 'react';
import { Image } from '../../../components';
import { stateMap, imgMap } from './constant';
import { stateTime } from '../../../utils/imgUrl';
import { getRemainTime } from '../../../utils/common';
const Styles = require('./index.less');

interface IProps {
  state: string;
  expireDate: string;
  cancelDate: string;
}

interface IState { }

class App extends React.Component<IProps, IState> {
  render() {
    const { state, expireDate, cancelDate } = this.props;
    return (
      <div className={Styles.top}>
        <div className={Styles.topLeft}>
          <div className={Styles.topState}>{stateMap.find((e: Option) => e.value === state).label}</div>
          <div className={Styles.topTime}>
            <div>
              <Image src={stateTime} />
            </div>
            <div>{getRemainTime(expireDate)}</div>
          </div>
        </div>
        <div className={Styles.topRight}>
          <Image src={imgMap[state]} />
        </div>
      </div>
    );
  }
}

export default App;
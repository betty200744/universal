import * as React from 'react';
import { Image } from '../../../components';
import { imgMap } from './constant';
import { stateTime } from '../../../utils/imgUrl';
import { getRemainTime, convertTimeString } from '../../../utils/common';
import { stateMap } from '../constant';
const Styles = require('./index.less');

interface IProps {
  state: string;
  expireDate: string;
  cancelDate: string;
  checkDate: string;
}

interface IState { }

class TopState extends React.Component<IProps, IState> {
  render() {
    const { state, expireDate, cancelDate, checkDate } = this.props;
    return (
      <div className={Styles.top}>
        <div className={Styles.topLeft}>
          <div className={Styles.topState}>{stateMap[state]}</div>
          <div className={Styles.topTime}>
            <div>
              <Image src={stateTime} />
            </div>
            <div>{(state !== 'complete' && state !== 'fail') ?
              getRemainTime(expireDate) :
              `于${convertTimeString(cancelDate || checkDate)}
             ${state === 'complete' ? '完成' : '关闭'}`}
            </div>
          </div>
        </div>
        <div className={Styles.topRight}>
          <Image src={imgMap[state]} />
        </div>
      </div>
    );
  }
}

export default TopState;
import * as React from 'react';
import { Image } from '../../../components';
import { aftersaleDone, aftersaleUndo } from '../../../utils/imgUrl';
import { stateMap } from './constant';
const Styles = require('./index.less');

interface IProps {
  state: string;
  reimburse?: boolean;
}

interface IState { }

class App extends React.Component<IProps, IState> {
  render() {
    const { state, reimburse = true } = this.props;
    const map = !reimburse ? stateMap.slice(0, 4) : [stateMap[0], stateMap[4]];
    return (
      <div className={Styles.prograss}>
        {map.map((e: Option, i: number) => (
          <div className={Styles.prograssItem} key={e.value}>
            <div className={Styles.prograssItemImg}>
              <Image src={map.findIndex((ele: Option) => ele.value === state) >= i ? aftersaleDone : aftersaleUndo} />
            </div>
            <div
              style={{ color: map.findIndex((ele: Option) => ele.value === state) >= i ? '#616161' : '#ababab' }}
            >{e.label}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
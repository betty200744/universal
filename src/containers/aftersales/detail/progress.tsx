import * as React from 'react';
import { Image } from '../../../components';
import { aftersaleDone, aftersaleUndo } from '../../../utils/imgUrl';
const Styles = require('./index.less');

const map: Array<Option> = [
  { value: '', label: '商家处理' },
  { value: '', label: '等待买家发货' },
  { value: '', label: '等待商家收货' },
  { value: '', label: '售后成功' },
];

interface IProps { }

interface IState { }

class App extends React.Component<IProps, IState> {
  render() {
    return (
      <div className={Styles.prograss}>
        {map.map((e: Option) => (
          <div className={Styles.prograssItem} key={e.value}>
            <div className={Styles.prograssItemImg}>
              <Image src={aftersaleDone} />
            </div>
            <div>{e.label}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
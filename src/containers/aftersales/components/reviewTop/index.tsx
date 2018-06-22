import * as React from 'react';
import { Image } from '../../../../components';
const Styles = require('./index.less');

interface IProps { }

interface IState { }

class App extends React.Component<IProps, IState> {
  render() {
    return (
      <div className={Styles.top}>
        <div className={Styles.topImg}><Image src={1} /></div>
        <div className={Styles.topText}>
          <div>乐高大世界中带你领略一个你从没有见过的世界</div>
          <div>黄色 x 2</div>
        </div>
      </div>
    );
  }
}

export default App;
import * as React from 'react';
import Prograss from './progress';
import Info from './aftersalesInfo';
import Panel from '../components/panel';
import { Image } from '../../../components';
import { grayArrow } from '../../../utils/imgUrl';
const Styles = require('./index.less');

interface IProps { }

interface IState { }

class App extends React.Component<IProps, IState> {
  render() {
    return (
      <div>
        <Prograss />

        <Panel className={Styles.record}>
          <div>协商记录</div>
          <div><Image src={grayArrow} /></div>
        </Panel>
        <Info />
      </div>
    );
  }
}

export default App;
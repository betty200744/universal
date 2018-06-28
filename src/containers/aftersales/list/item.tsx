import * as React from 'react';
import { Image } from '../../../components';
const Styles = require('./index.less');

interface IProps { }

interface IState { }

class App extends React.Component<IProps, IState> {
  render() {
    return (
      <div>
        <div>
          <Image src={'1'} />
        </div>
        <div>
          <div></div>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div></div>
      </div>
    );
  }
}

export default App;
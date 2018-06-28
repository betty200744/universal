import * as React from 'react';
import Prograss from './progress';
const Styles = require('./index.less');

interface IProps { }

interface IState { }

class App extends React.Component<IProps, IState> {
  render() {
    return (
      <div>
        <Prograss />
      </div>
    );
  }
}

export default App;
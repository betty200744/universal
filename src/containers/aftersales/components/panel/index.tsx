import * as React from 'react';
import classnames from 'classnames';
const Styles = require('./index.less');


interface IProps {
  className?: string;
}

interface IState { }

class App extends React.Component<IProps, IState> {
  render() {
    return (
      <div className={classnames(Styles.panel, this.props.className)}>
        {this.props.children}
      </div>
    );
  }
}

export default App;
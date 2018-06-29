import * as React from 'react';
const Styles = require('./index.less');

interface IProps {
  onClick(): void;
}

interface IState { }

class App extends React.Component<IProps, IState> {
  render() {
    const { onClick } = this.props;
    return (
      <div onClick={onClick}>
        <div style={{ height: '5rem' }}></div>
        <div className={Styles.submit}>
          <div>提交</div>
        </div>
      </div>
    );
  }
}

export default App;
import * as React from 'react';
const Styles = require('./index.less');

interface IProps { }

interface IState { }

class Submit extends React.Component<IProps, IState> {
  render() {
    const { children } = this.props;
    return (
      <div>
        <div style={{ height: '5rem' }}></div>
        <div className={Styles.submit}>
          {children}
        </div>
      </div>
    );
  }
}

export default Submit;
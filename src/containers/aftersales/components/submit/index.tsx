import * as React from 'react';
import classnames from 'classnames';
const Styles = require('./index.less');

interface IProps {
  className?: string;
}

interface IState { }

class Submit extends React.Component<IProps, IState> {
  render() {
    const { children, className } = this.props;
    return (
      <div>
        <div style={{ height: '5rem' }}></div>
        <div className={classnames(Styles.submit, className)}>
          {children}
        </div>
      </div>
    );
  }
}

export default Submit;
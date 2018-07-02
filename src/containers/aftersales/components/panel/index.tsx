import * as React from 'react';
import classnames from 'classnames';
const Styles = require('./index.less');


interface IProps {
  className?: string;
  onClick?(): void;
}

interface IState { }

class Panel extends React.Component<IProps, IState> {
  render() {
    const { className, onClick } = this.props;
    return (
      <div className={classnames(Styles.panel, className)} onClick={onClick}>
        {this.props.children}
      </div>
    );
  }
}

export default Panel;
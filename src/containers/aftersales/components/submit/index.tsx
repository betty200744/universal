import * as React from 'react';
const Styles = require('./index.less');

interface IProps {
  disabled?: boolean;
  onClick(): void;
}

interface IState { }

class Submit extends React.Component<IProps, IState> {
  render() {
    const { onClick, disabled = false } = this.props;
    return (
      <div className={disabled && Styles.disabled} onClick={!disabled && onClick}>
        <div style={{ height: '5rem' }}></div>
        <div className={Styles.submit}>
          <div>提交</div>
        </div>
      </div>
    );
  }
}

export default Submit;
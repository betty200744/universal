import * as React from 'react';
import classnames from 'classnames';
const Styles = require('./index.less');

interface Options {
  value: number | string;
  label: string;
}

interface IProps {
  show: boolean;
  label: string;
  options: Array<Options>;
  onClick(e: Options): void;
  onClickCancel(): void;
}

interface IState { }

class App extends React.Component<IProps, IState> {
  disableScroll = (e: any) => {
    console.log(e);
    if (this.props.show) {
      e.preventDefault();
      return false;
    }
  }
  componentDidMount() {
    document.addEventListener('touchmove', this.disableScroll, { passive: false });
  }

  componentWillUnmount() {
    document.removeEventListener('touchmove', this.disableScroll);
  }

  render() {
    const { label, options, onClick, onClickCancel, show } = this.props;
    return (
      <div className={Styles.container} style={{ visibility: show ? 'visible' : 'hidden' }} >
        <div className={Styles.modal}></div>
        <div className={classnames(Styles.picker, show && Styles.pickerActive)}>
          <div className={classnames(Styles.pickerItem, Styles.pickerTop)}>
            <div className={Styles.pickerLabel}>{label}</div>
            {options.map(e => (<div className={Styles.options} key={e.value} onClick={() => {
              onClick(e);
              onClickCancel();
            }}>{e.label}</div>))}
            <div></div>
          </div>
          <div className={classnames(Styles.pickerItem, Styles.pickerCancel)} onClick={() => onClickCancel()}>
            取消
          </div>
        </div>
      </div>
    );
  }
}

export default App;
import * as React from 'react';
import { Image } from '../../../../components';
import { blackArrow, grayArrow } from '../../../../utils/imgUrl';
const Styles = require('./index.less');

interface IProps {
  value: number;
  maxValue: number;
  onChange(value: number): void;
}

interface IState { }

class App extends React.Component<IProps, IState> {
  onIncrease = () => {
    const { value, maxValue, onChange } = this.props;
    console.log(value);
    if (value < maxValue) {
      onChange(value + 1);
    }
  }
  onDecrease = () => {
    const { value, onChange } = this.props;
    if (value > 0) {
      onChange(value - 1);
    }
  }
  render() {
    const { value, maxValue } = this.props;
    return (
      <div className={Styles.container}>
        <div className={Styles.containerLeft} onClick={this.onDecrease}>
          <Image src={value > 0 ? blackArrow : grayArrow} />
        </div>
        <div className={Styles.containerMiddle}>{value}</div>
        <div className={Styles.containerRight} onClick={this.onIncrease}>
          <Image src={value < maxValue ? blackArrow : grayArrow} />
        </div>
      </div>
    );
  }
}

export default App;
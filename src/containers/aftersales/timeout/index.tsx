import * as React from 'react';
import { Button, Title, Image } from '../../../components';
import { timeout } from '../../../utils/imgUrl';
const Styles = require('./index.less');

interface IProps { }

interface IState { }

class Timeout extends React.Component<IProps, IState> {
  render() {
    return (
      <div>
        <Title title="申请售后" goBack />

        <div className={Styles.container}>
          <Image className={Styles.img} src={timeout} />
          <div className={Styles.title}>申请售后过期</div>
          <div className={Styles.text}>
          您已错过了交易完成 10 天内的售后申请时间段<br />
          如有问题，请联系客服
          </div>
          <div className={Styles.btn}>
            <Button type="danger" width={10.6} height={3.4}>
              在线客服
            </Button>

          </div>
        </div>
      </div>
    );
  }
}

export default Timeout;
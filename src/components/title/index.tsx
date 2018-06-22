//<Title title="我的选品" rightText="编辑选品" goBack />

import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { isFireball, isWeixin } from '@util/useragent';
import { goBack as utilGoBack } from '../../utils/common';
const Styles = require('./index.less');

interface IProps {
  title: String;
  goBack?: any;
  rightText?: String;
  line?: Boolean;
  history: any;
  rightFn?(): void;
}

interface IState { }

class Title extends React.Component<IProps, IState> {
  onClickLeft = () => {
    const { goBack, history } = this.props;
    if (goBack) {
      if (typeof goBack === 'function') {
        goBack();
      } else {
        utilGoBack(history);
      }
    }
  }
  render() {
    const { title, goBack, rightText, rightFn, line = true } = this.props;
    return (
      (isFireball() || !isWeixin()) ? <div className={Styles.navBox}>
        <div className={Styles.nav} style={line ? { borderBottom: '0.5px solid #e6e6e6' } : {}}>
          <div className={Styles.left} onClick={this.onClickLeft}>
            {goBack && <img src="//cdn.image.huoqiuapp.com/cdn/app/nav-back-icon.svg" />}
          </div>
          <div className={Styles.title}>{title}</div>
          <div className={Styles.right} onClick={rightFn}>{rightText}</div>
        </div>
        <div style={{ height: '4.4rem' }}></div>
      </div> : <div></div>
    );
  }
}

export default withRouter(Title as any) as any;
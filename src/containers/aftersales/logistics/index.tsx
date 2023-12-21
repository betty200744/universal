import * as React from 'react';
import classnames from 'classnames';
import { post } from '@util/srequest';
import { isFireball } from '@util/useragent';
import { getQuery, convertTimeString } from '../../../utils/common';
import { copyText } from '../../../utils/jsbridge';
import { apiUrl } from '../../../utils/constant';
const Styles = require('./index.less');

interface IProps {
}

interface IState {
  error: boolean;
  noLogistics: boolean;
  serialNo: string;
  logisticsSerialNo: string;
  logisticsCompany: string;
  logisticsList: Array<{
    AcceptTime: string;
    AcceptStation: string;
  }>;
}

const img = (n: string) => `https://cdn.image.huoqiuapp.com/share/logistics/${n}.png`;

class Logistics extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      error: false,
      noLogistics: false,
      serialNo: getQuery('serialNo'),
      logisticsSerialNo: getQuery('logisticsSerialNo'),
      logisticsCompany: getQuery('logisticsCompany'),
      logisticsList: [],
    };
  }
  componentDidMount() {
    const { logisticsSerialNo, logisticsCompany } = this.state;

    if (!logisticsCompany && !logisticsSerialNo) {
      this.setState({ noLogistics: true });
    } else {
      this.search();
    }
  }
  copy() {
    const { logisticsSerialNo } = this.state;
    if (isFireball()) {
      copyText(logisticsSerialNo);
    }
  }
  search() {
    const { serialNo, logisticsSerialNo, logisticsCompany } = this.state;
    const query = `query($serialNo: string, logisticsCompany: string, $logisticsNo: logisticsNo){
      logistics(serialNo: $serialNo, logisticsCompany: $logisticsCompany, logisticsNo: $logisticsNo) {
        Action
        AcceptTime
        AcceptStation
        Location
      }
    }`;
    const variables = { serialNo, logisticsSerialNo, logisticsCompany };
    post(apiUrl, { query, variables }).then((res: any) => {
      if (res.logistics && res.logistics.length > 0) {
        this.setState({ logisticsList: res.logistics });
      } else {
        this.setState({
          error: true,
          logisticsList: [{
            AcceptTime: convertTimeString(new Date()),
            AcceptStation: '您的订单已提交仓库处理',
          }],
        });
      }
    }).catch(() => {
      this.setState({
        error: true,
        logisticsList: [{
          AcceptTime: convertTimeString(new Date()),
          AcceptStation: '您的订单已提交仓库处理',
        }],
      });
    });
  }
  renderList() {
    const { logisticsList } = this.state;
    return (<div className={Styles.timeline}>
      <div className={Styles.timelineBox}>
        {logisticsList.map((item, index) => {
          if (index === 0) {
            return (<div key={index} className={classnames(Styles.item, Styles.current)}>
              <div>{item.AcceptTime}</div>
              <div>{item.AcceptStation}</div>
              <img src={img('local')} width="22" height="25" />
            </div>);
          }
          return (<div key={index} className={classnames(Styles.item, Styles.ago)}>
            <div>{item.AcceptTime}</div>
            <div>{item.AcceptStation}</div>
            <div className={Styles.point}><div /></div>
          </div>);
        })}
      </div>
    </div>);
  }
  renderError() {
    return (<div className={Styles.error}>
      <div className={Styles.desc}>该单号暂无物流进展</div>
      <div className={Styles.desc}>晚点再试试吧</div>
      <div
        className={Styles.retry}
        onClick={() => {
          this.setState({ error: false, logisticsList: [] });
          this.search();
        }}
      >重新加载</div>
    </div>);
  }

  renderLoading() {
    return (<div className={Styles.loading}>
      <div className={Styles.loadingText}>查询中...</div>
    </div>);
  }

  renderNoLogistics() {
    return (<div className={Styles.noLogistics}>
      <img src={img('no-logistics')} width="190" height="190" />
      <div>此商品无需物流配送喔</div>
    </div>);
  }

  renderHeader() {
    const { noLogistics, logisticsSerialNo, logisticsCompany } = this.state;

    return !noLogistics && (<div
      className={Styles.header}
      style={{ backgroundImage: `url(${img('header-bg')})` }}
    >
      <div className={Styles.companyBox}>
        <div>物流公司</div>
        <div className={Styles.company}>{logisticsCompany || '无'}</div>
      </div>
      <div className={Styles.serialNoBox}>
        <div>物流单号</div>
        <div className={Styles.flexBox}>
          <div className={Styles.serialNo}>{logisticsSerialNo || '无'}</div>
          {!!logisticsSerialNo && <div className={Styles.copy} onClick={() => this.copy()}>
            {isFireball() ? '复制' : ''}
          </div>}
        </div>
      </div>
    </div>);
  }

  judgeRender() {
    const { error, noLogistics, logisticsList } = this.state;
    if (noLogistics) {
      return this.renderNoLogistics();
    } else if (error) {
      return this.renderList();
    } else if (logisticsList) {
      return this.renderList();
    }
    return this.renderLoading();
  }

  render() {
    return (<div>
      {this.renderHeader()}
      {this.judgeRender()}
    </div>);
  }
}

export default Logistics;

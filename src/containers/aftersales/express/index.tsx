import * as React from 'react';
import { Title, Message } from '../../../components';
import ReviewTop from '../components/reviewTop';
import Panel from '../components/panel';
import Submit from '../components/submit';
import Uploader from '../components/uploadImage';
import { getQuery } from '../../../utils/common';
import { fetchData, userDeliveryAfterSale } from './actions';
const Styles = require('./index.less');

interface IProps {
  match: any;
}

interface IState {
  review: SimpleReview;
  expressOptions: Array<Option>;
  express: string;
  serialNo: string;
  orderId: string;
  productId: string;
  images: Array<string>;
  afterSaleId: string;
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      review: {
        _id: '',
        img: '',
        name: '',
        spec: '',
        amount: 0,
      },
      expressOptions: [],
      express: '',
      serialNo: '',
      orderId: getQuery('order'),
      productId: getQuery('product'),
      afterSaleId: this.props.match.params.id,
      images: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { afterSaleId } = this.state;
    fetchData(afterSaleId).then((res: any) => {
      const detail = res.afterSaleDetail;
      this.setState({
        review: {
          _id: detail.productInfo.product.id,
          img: detail.productInfo.product.img,
          name: detail.review.name,
          spec: detail.productInfo.spec,
          amount: 0,
        },
        expressOptions: res.afterSaleUserLogisticsCompany
          .map((e: string) => ({ value: e, label: e })),
      });
    }).catch(Message.error);
  }

  submit = () => {
    const { afterSaleId, express, serialNo, images } = this.state;
    userDeliveryAfterSale(afterSaleId, express, serialNo, images).then((res: any) => {
      Message.success('成功');
    }).catch(Message.error);
  }

  render() {
    const { review, expressOptions, express, serialNo, images } = this.state;
    return (
      <div>
        <Title title="填写物流单号" goBack />

        <ReviewTop review={review} />

        <Panel className={Styles.panel}>
          <div className={Styles.panelLabel}>物流公司</div>
          <div className={Styles.panelInput}>
            <label htmlFor="select"></label>
            <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              this.setState({ express: e.target.value });
            }}>
              <option value="无">无</option>)
              {expressOptions.map((e: Option) =>
                <option key={e.value} value={express}>{e.label}</option>)}
            </select>
          </div>
        </Panel>

        <Panel className={Styles.panel}>
          <div className={Styles.panelLabel}>物流单号</div>
          <input
            className={Styles.panelInput}
            value={serialNo}
            placeholder="请填写物流单号"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              this.setState({ serialNo: e.target.value });
            }}
          />
        </Panel>

        <Panel className={Styles.photo}>
          <div className={Styles.label}>
              上传凭证
          </div>

          <Uploader
            onDelete={(i) => {
              images.splice(i, 1);
              this.setState({ images: [...images] });
            }}
            onChange={(e: Array<string>) => this.setState((prevState) => ({
              images: [...prevState.images, ...e],
            }))}
            maxNumber={9}
            imgs={images}
          />
        </Panel>

        <Submit onClick={this.submit} />
      </div>
    );
  }
}

export default App;
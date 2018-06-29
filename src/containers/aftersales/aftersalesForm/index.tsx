import * as React from 'react';
import { Title, Image, Message } from '../../../components';
import ReviewTop from '../components/reviewTop';
import Panel from '../components/panel';
import NumberInput from '../components/number';
import Picker from '../components/picker';
import Uploader from '../components/uploadImage';
import Submit from '../components/submit';
import { grayArrow } from '../../../utils/imgUrl';
import { getQuery, goToAftersalesPage, numberToMoney } from '../../../utils/common';
import { getRefundPrice, fetchData, createAfterSale } from './actions';
const Styles = require('./index.less');

interface IProps { }

interface IState {
  // product信息
  review: SimpleReview;
  // 当前数量
  amount: number;
  // 显示选择项
  showOptions: boolean;
  // 当前价格
  price: string;
  orderId: string;
  productId: string;
  type: string;
  reasonOptions: Array<Option>;
  reason: Option;
  totalPrice: number;
  expectRefundTransferFee: number;
  phone: string;
  images: Array<string>;
  description: string;
}

const reasonText = [
  '自商品签收之日起7天内商品包装完好，吊牌、配件齐全，未使用等，可提出退换货申请，请您上传符合上述要求的图片作为凭证（鞋类需要鞋面和鞋底的照片）；包邮商品买家承担寄回邮费，非包邮商品买家承担发货和寄回邮费。',
  '请填写能反馈您所遇到问题的有效说明，并上传能证明您说明的有效图片作为凭证',
];

const map: SimpleMap = {
  refund: '退货退款',
  replacement: '换货',
  reimburse: '仅退款',
};

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      review: {
        _id: '',
        name: '',
        img: '',
        spec: '',
        amount: 0,
      },
      amount: 0,
      showOptions: false,
      price: '0',
      orderId: getQuery('order'),
      productId: getQuery('product'),
      type: getQuery('type'),
      reasonOptions: [],
      reason: {
        value: '',
        label: '',
      },
      totalPrice: 0,
      expectRefundTransferFee: 0,
      phone: '',
      images: [],
      description: '',
    };
  }
  componentDidMount() {
    const { orderId, productId } = this.state;
    this.fetchProduct(orderId, productId);
  }


  fetchProduct = (orderId: string, productId: string) => {
    const { type } = this.state;
    fetchData(orderId, productId, type).then((res: any) => {
      const options = res.afterSaleReasonList
        .filter((e: any) => e.used.includes(type))
        .map((e: any) => ({ value: `${e.reasonCode}`, label: e.reason }));
      this.setState({
        review: res.getApplySkuInfo,
        reasonOptions: options,
        reason: options[0],
      });
    }).catch(Message.error);
  }


  onClickPicker = (option: Option) => {
    this.setState({ reason: option }, () => {
      this.getRefundPrice();
    });
  }

  onChangeAmount = (e: number) => {
    this.setState({ amount: e }, () => {
      this.getRefundPrice();
    });
  }

  getRefundPrice = () => {
    const { orderId, productId, amount, reason: { value }} = this.state;
    getRefundPrice(orderId, productId, amount, value).then((res: any) => {
      this.setState({ ...res.afterSaleMakeRefundSubject, price: 0 });
    }).catch(Message.error);
  }

  submit = () => {
    const { orderId, productId, amount, reason: { value }, type, price, description, images } = this.state;
    createAfterSale(orderId, type, price, productId, amount, value, description, images).then((res: any) => {
      goToAftersalesPage(`/detail/${res.createAfterSale}`);
    }).catch(Message.error);
  }

  render() {
    const {
      amount, showOptions, review, reasonOptions, description, type,
      reason, totalPrice, expectRefundTransferFee, phone, price, images,
    } = this.state;
    return (
      <div>
        <Title title={map[type]} goBack />
        <ReviewTop review={review} />

        <div>

          <Panel className={Styles.reason}>
            <div className={Styles.reasonTop} onClick={() => this.setState({ showOptions: true })}>
              <div>{reason.label}</div>
              <div>
                <Image src={grayArrow} />
              </div>
            </div>
            <div className={Styles.reasonBtm}>
              {Number(reason.value) < 3 ? reasonText[0] : reasonText[1]}
            </div>
          </Panel>

          <Panel className={Styles.amount}>
            <div className={Styles.label}>
              商品数量
            </div>
            <NumberInput
              value={amount}
              maxValue={review.amount}
              onChange={this.onChangeAmount}
            />
          </Panel>

          <Panel className={Styles.price}>
            <div>
              <div className={Styles.label}>
              退款金额
              </div>
              <div className={Styles.priceNote}>
              最多 <span>¥ {numberToMoney(totalPrice)} </span>，
              含邮费<span> ¥ {numberToMoney(expectRefundTransferFee)}</span>
              </div>
            </div>
            <label htmlFor="price" className={Styles.priceNum}>¥ {numberToMoney(price)}</label>
            <input
              id="price"
              type="number"
              pattern="\d*"
              min="0"
              max={totalPrice}
              value={price}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = numberToMoney(e.target.value);
                console.log(price, Number(value), totalPrice);
                if (Number(value) <= totalPrice) {
                  this.setState({ price: numberToMoney(Number(e.target.value)) });
                } else {
                  return;
                }
              }}
            />
          </Panel>

          <Panel className={Styles.note}>
            <div className={Styles.label}>
              退货退款说明
            </div>
            <textarea
              className={Styles.noteText}
              value={description}
              maxLength={200}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({ description: e.target.value })}
            />
            <div className={Styles.noteNum}>
              <span>{description.length}</span>/200
            </div>
          </Panel>

          <Panel className={Styles.connecter}>
            <div className={Styles.label}>
              联系方式
            </div>
            <div className={Styles.connecterPhone}>
              <label htmlFor="phone" className={Styles.priceNum}>{phone}</label>
              <input
                id="phone"
                type="tel"
                maxLength={11}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ phone: e.target.value })}
              />
            </div>
          </Panel>

          <Panel className={Styles.photo}>
            <div className={Styles.label}>
              上传凭证
            </div>

            <Uploader
              onDelete={(i) => this.setState((prevState) => ({
                images: prevState.images.splice(i - 1, 1),
              }))}
              onChange={(e: Array<string>) => this.setState((prevState) => ({
                images: [...prevState.images, ...e],
              }))}
              maxNumber={9}
              imgs={images}
            />
          </Panel>
        </div>

        <Submit onClick={this.submit} />

        <Picker
          show={showOptions}
          options={reasonOptions}
          label="如有问题可二次申请"
          onClick={this.onClickPicker}
          onClickCancel={() => this.setState({ showOptions: false })}
        />
      </div>
    );
  }
}

export default App;
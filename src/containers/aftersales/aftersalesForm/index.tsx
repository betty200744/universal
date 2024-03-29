import * as React from 'react';
import { Button, Title, Image, Message } from '../../../components';
import ReviewTop from '../components/reviewTop';
import Panel from '../components/panel';
import NumberInput from '../components/number';
import Picker from '../components/picker';
import Uploader from '../components/uploadImage';
import Submit from '../components/submit';
import { grayArrow } from '../../../utils/imgUrl';
import { getQuery, goToAftersalesPage, numberToMoney, isValidated } from '../../../utils/common';
import { getRefundPrice, fetchData, createAfterSale, fetchAftersale, editAfterSale } from './actions';
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
  aftersaleId: string;
  type: string;
  reasonOptions: Array<Option>;
  reason: Option;
  totalPrice: number;
  refundTransferFee: number;
  phone: string;
  images: Array<string>;
  description: string;
}

const reasonText = [
  '自商品签收之日起7天内商品包装完好，吊牌、配件齐全，未使用等，可提出退换货申请，请您上传符合上述要求的图片作为凭证（鞋类需要鞋面和鞋底的照片）；包邮商品买家承担寄回邮费，非包邮商品买家承担发货和寄回邮费。',
  '请填写能反馈您所遇到问题的有效说明，并上传能证明您说明的有效图片作为凭证',
];



class AftersalesForm extends React.Component<IProps, IState> {
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
      amount: 1,
      showOptions: false,
      price: '0',
      orderId: getQuery('order'),
      productId: getQuery('product'),
      aftersaleId: getQuery('aftersale'),
      type: getQuery('type'),
      reasonOptions: [],
      reason: {
        value: '-1',
        label: '',
      },
      totalPrice: 0,
      refundTransferFee: 0,
      phone: '',
      images: [],
      description: '',
    };
  }
  componentDidMount() {
    const { orderId, productId, aftersaleId } = this.state;
    this.fetchProduct(orderId, productId);
    if (aftersaleId) {
      this.fetchAftersale(aftersaleId);
    }
  }

  fetchAftersale = (aftersaleId: string) => {
    fetchAftersale(aftersaleId).then((res: any) => {
      const detail = res.afterSaleDetail;
      if (detail.type === this.state.type) {
        this.setState({
          reason: {
            value: detail.applyInfo.reasonCode,
            label: detail.applyInfo.reason,
          },
          phone: detail.applyInfo.phone,
          images: detail.applyInfo.images,
          description: detail.applyInfo.description,
          amount: detail.productInfo.amount,
          price: detail.totalPrice,
        }, () => {
          this.getRefundPrice(detail.totalPrice);
        });
      }
    });
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
        // reason: options[0],
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

  getRefundPrice = (price: number = 0) => {
    const { orderId, productId, amount, reason: { value }, aftersaleId } = this.state;
    // 防止无理由的获取退款金额
    if (value === '-1') {
      return false;
    }
    getRefundPrice(orderId, productId, amount, value, aftersaleId).then((res: any) => {
      this.setState({ ...res.afterSaleMakeRefundSubject, price });
    }).catch(Message.error);
  }

  submit = () => {
    const {
      orderId, productId, amount, reason: { value }, aftersaleId,
      type, price, description, images, phone, review: { spec },
    } = this.state;

    const conditions = [
      { condition: Number(value) >= 0, message: '请选择申请原因' },
      { condition: /^1[0-9]{10}$/.test(phone), message: '手机号码不正确' },
      { condition: images.length > 0, message: '请上传图片凭证' },
    ];
    const refundConditions = [
      { condition: Number(price) > 0, message: '退款金额不正确' },
      ...conditions,
    ];
    if (type === 'replacement') {
      if (!isValidated(conditions)) {
        return;
      }
    } else {
      if (!isValidated(refundConditions)) {
        return;
      }
    }
    if (aftersaleId) {
      editAfterSale(aftersaleId, type, price, productId, amount, value, phone, description, images, spec).then((res: any) => {
        goToAftersalesPage(`/detail/${aftersaleId}`);
      }).catch(Message.error);
    } else {
      createAfterSale(orderId, type, price, productId, amount, value, phone, description, images, spec).then((res: any) => {
        goToAftersalesPage(`/detail/${res.createAfterSale}`);
      }).catch(Message.error);
    }

  }

  render() {
    const {
      amount, showOptions, review, reasonOptions, description, type,
      reason, totalPrice, refundTransferFee, phone, price, images,
    } = this.state;
    const replacementDisabled = reason.value && amount && description && phone && images.length;
    const notReplacementDisabled = replacementDisabled && price;
    const disabled = (type === 'replacement' && !replacementDisabled) || (type !== 'replacement' && !notReplacementDisabled);
    return (
      <div>
        <Title title="申请售后" goBack />
        <ReviewTop review={review} />

        <div>

          <Panel className={Styles.reason}>
            <div className={Styles.reasonTop} onClick={() => this.setState({ showOptions: true })}>
              <div>{reason.label || '申请原因'}</div>
              <div>
                <Image src={grayArrow} />
              </div>
            </div>
            {reason.label && <div className={Styles.reasonBtm}>
              {Number(reason.value) < 3 ? reasonText[0] : reasonText[1]}
            </div>}
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

          {type !== 'replacement' && <Panel className={Styles.price}>
            <div>
              <div className={Styles.label}>
              退款金额
              </div>
              <div className={Styles.priceNote}>
              最多 <span>¥ {numberToMoney(totalPrice)} </span>，
              含邮费<span> ¥ {numberToMoney(refundTransferFee)}</span>
              </div>
            </div>
            <label htmlFor="price" className={Styles.priceNum}>¥ {Number(price) > 0 ? numberToMoney(price) : <span>金额</span>}</label>
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
          </Panel>}

          <Panel className={Styles.note}>
            <div className={Styles.label}>
              说明
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
        </div>

        <Submit>
          <Button type={'danger'} onClick={this.submit} disabled={disabled}>提交</Button>
        </Submit>

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

export default AftersalesForm;
import * as React from 'react';
import { Title, Image } from '../../../components';
import ReviewTop from '../components/reviewTop';
import Panel from '../components/panel';
import NumberInput from '../components/number';
import Picker from '../components/picker';
import Uploader from '../components/uploadImage';
import Submit from '../components/submit';
import { grayArrow } from '../../../utils/imgUrl';
const Styles = require('./index.less');

interface Options {
  value: number | string;
  label: string;
}
interface IProps { }

interface IState {
  number: number;
  showOptions: boolean;
  price: string;
}

const options = [
  { value: 1, label: '撤销申请' },
  { value: 12, label: '撤销申请' },
  { value: 13, label: '撤销申请' },
  { value: 1, label: '撤销申请' },
  { value: 1, label: '撤销申请' },
  { value: 1, label: '撤销申请' },
  { value: 1, label: '撤销申请' },
  { value: 1, label: '撤销申请' },
];

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      number: 3,
      showOptions: false,
      price: '0',
    };
  }

  onClickPicker = (options: Options) => {

  }

  render() {
    const { number, showOptions } = this.state;
    return (
      <div>
        <Title title="122" goBack />
        <ReviewTop />

        <div>

          <Panel className={Styles.reason}>
            <div className={Styles.reasonTop} onClick={() => this.setState({ showOptions: true })}>
              <div>七天无理由退货</div>
              <div>
                <Image src={grayArrow} />
              </div>
            </div>
            <div className={Styles.reasonBtm}>
            自商品签收之日起 7 天内商品包装完好，吊牌齐全，配件齐全，未使用，可提出退货申请，请您上传符合上述要求的有效图片作为凭证（鞋类需要鞋面和鞋底的照片）
            </div>
          </Panel>

          <Panel className={Styles.amount}>
            <div className={Styles.label}>
              商品数量
            </div>
            <NumberInput value={number} maxValue={3} onChange={(e: number) => this.setState({ number: e })} />
          </Panel>

          <Panel className={Styles.price}>
            <div>
              <div className={Styles.label}>
              退款金额
              </div>
              <div className={Styles.priceNote}>最多 <span>¥ 511.00 </span>，含邮费<span> ¥ 11.00</span></div>
            </div>
            <label htmlFor="price" className={Styles.priceNum}>¥ {this.state.price}</label>
            <input id="price" type="number" pattern="\d*" onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ price: e.target.value })} />
          </Panel>

          <Panel className={Styles.note}>
            <div className={Styles.label}>
              退货退款说明
            </div>
            <textarea className={Styles.noteText} />
            <div className={Styles.noteNum}>
              <span>211</span>/200
            </div>
          </Panel>

          <Panel className={Styles.connecter}>
            <div className={Styles.label}>
              联系方式
            </div>
            <div className={Styles.connecterPhone}>12121212</div>
          </Panel>

          <Panel className={Styles.photo}>
            <div className={Styles.label}>
              上传凭证
            </div>

            <Uploader
              onDelete={(i) => console.log(i)}
              onChange={(e: Array<string>) => console.log(e)}
              maxNumber={9}
              imgs={[grayArrow, grayArrow, grayArrow]}
            />
          </Panel>
        </div>

        <Submit />

        <Picker
          show={showOptions}
          options={options}
          label="如有问题可二次申请"
          onClick={this.onClickPicker}
          onClickCancel={() => this.setState({ showOptions: false })}
        />
      </div>
    );
  }
}

export default App;
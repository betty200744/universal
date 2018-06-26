import * as React from 'react';
import { Title, Image } from '../../../components';
import ReviewTop from '../components/reviewTop';
import Panel from '../components/panel';
import Uploader from '../components/uploadImage';
import { grayArrow } from '../../../utils/imgUrl';
const Styles = require('./index.less');

interface IProps { }

interface IState { }

class App extends React.Component<IProps, IState> {
  render() {
    return (
      <div>
        <Title title="填写物流单号" goBack />

        <ReviewTop />

        <Panel>
          <div>物流公司</div>
          <div>1</div>
        </Panel>

        <Panel>
          <div>物流单号</div>
          <div>1</div>
        </Panel>

        {/* <Panel>
          <div>寄回运费</div>
          <div>1</div>
        </Panel>

        <Panel>
          <div>支付宝账号</div>
          <div>1</div>
        </Panel> */}

        <Panel>
          <div>上传凭证</div>
          <Uploader onDelete={(i) => console.log(i)} onChange={(e: any) => console.log(e)} maxNumber={9} imgs={[grayArrow, grayArrow, grayArrow]} />
        </Panel>
      </div>
    );
  }
}

export default App;
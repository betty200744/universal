import * as React from 'react';
import { Title, Image } from '../../../components';
const Styles = require('./index.less');

const map = {
  refund: {
    img: '',
    label: '',
  },
};

interface IProps { }

interface IState { }

class App extends React.Component<IProps, IState> {
  render() {
    return (
      <div>
        <Title title="122" goBack />
        <div>
          <div><Image src={1} /></div>
          <div>
            <div>乐高大世界中带你领略一个你从没有见过的世界</div>
            <div>黄色 x 2</div>
          </div>
        </div>
        <div>

        </div>
      </div>
    );
  }
}

export default App;
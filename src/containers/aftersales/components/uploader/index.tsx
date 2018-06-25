import * as React from 'react';
import Cookies from 'js-cookie';
import * as random from 'random-js';
import * as superagent from 'superagent';
import { get } from '@util/srequest';
import { Message, Image } from '../../../../components';
const Styles = require('./index.less');


const r = random();

interface IProps {
  onChange(e: any): void;
}

interface IState { }

class App extends React.Component<IProps, IState> {
  dropZone: any = null;
  getToken = (upload: any) => {
    const token = Cookies.get('qiniuToken');
    if (token) {
      upload(token);
    } else {
      get('/api/token/qiniu').then((resp: any) => {
        const expiresTime = new Date(Date.now() + (3000 * 1000));  // 七牛token 3600 秒过期；
        Cookies.set('qiniuToken', resp.token, { expires: expiresTime });
        upload(resp.token);
      });
    }
  }
  uploadImage = (token: string, files: any) => {
    const { onChange } = this.props;
    console.log(123, Array.from(files));
    const queue = Array.from(files).map((file: any) => {
      const formData = new FormData();

      const name = r.hex(20);
      const extendName = file.name.slice(file.name.lastIndexOf('.'));
      const key = `archive/image/${name}_${extendName}`;
      formData.append('key', key);
      formData.append('file', file);
      formData.append('token', token);

      return new Promise((resolve: any, reject: any) => {
        superagent.post('//upload.qiniu.com').send(formData).end((err, res) => {
          const { body } = res;
          if (body && body.key) {
            resolve(`http://cdn.image.huoqiuapp.com/${body.key}`);
          } else {
            reject(`上传失败${err}`);
          }
        });
      });
    });

    Promise.all(queue).then((files) => {
      Message.success('上传成功');
      onChange(files);
    }).catch(Message.error);
  };

  onChange = (e: any) => {
    console.log(e.target.files);
    this.getToken((token: string) => this.uploadImage(token, e.target.files));
  }
  render() {
    return (
      <div className={Styles.uploader}>
        <label htmlFor="file">
          <Image />
          <div>最多 9 张</div>
        </label>
        <input
          type="file"
          id="file"
          name="file"
          multiple
          accept=".png, .jpg, .jpeg"
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default App;
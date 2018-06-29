import * as React from 'react';
import Cookies from 'js-cookie';
import * as random from 'random-js';
import * as superagent from 'superagent';
import { post } from '@util/srequest';
import { Message, Image } from '../../../../components';
import { uploadBg } from '../../../../utils/imgUrl';
const Styles = require('./index.less');


const r = random();

interface IProps {
  maxNumber: number;
  onChange(e: Array<string>): void;
}

interface IState { }

class App extends React.Component<IProps, IState> {
  getToken = () => {
    return new Promise((resolve, reject) => {
      const token = Cookies.get('qiniuToken');
      if (token) {
        resolve(token);
      } else {
        const query = `query {
          getQiniuUploadToken
        }`;
        post('/api/distribution/graphql', { query }).then((res: any) => {
          const expiresTime = new Date(Date.now() + (3000 * 1000));  // 七牛token 3600 秒过期；
          Cookies.set('qiniuToken', res.getQiniuUploadToken, { expires: expiresTime });
          resolve(res.getQiniuUploadToken);
        }).catch(Message.error);
      }
    });
  }
  uploadImage = (token: string, files: FileList) => {
    const { onChange } = this.props;
    const queue = Array.from(files).map((file: File) => {
      const formData = new FormData();

      const name = r.hex(20);
      const extendName = file.name.slice(file.name.lastIndexOf('.'));
      const key = `archive/image/${name}_${extendName}`;
      formData.append('key', key);
      formData.append('file', file);
      formData.append('token', token);

      return new Promise<string>((resolve, reject) => {
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

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    this.getToken().then((token: string) => {
      console.log(e.target);
      this.uploadImage(token, e.target.files);
    });
  }
  render() {
    const { maxNumber } = this.props;
    return (
      <div className={Styles.uploader}>
        <label htmlFor="file">
          <Image src={uploadBg} />
          <div>最多 {maxNumber} 张</div>
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
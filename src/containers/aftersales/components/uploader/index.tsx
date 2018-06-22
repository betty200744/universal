// import * as React from 'react';
// import Cookies from 'js-cookie';
// import random from 'random-js';
// import * as superagent from 'superagent';
// import DropZone from 'react-dropzone';
// import { get } from '@util/srequest';
// const Styles = require('./index.less');


// const r = random();

// interface IProps {
//   onChange(x: string): void;
// }

// interface IState { }

// class App extends React.Component<IProps, IState> {
//   dropZone: any = null;
//   getToken = (upload: any) => {
//     const token = Cookies.get('qiniuToken');
//     if (token) {
//       upload(token);
//     } else {
//       get('/api/token/qiniu')
//         .then((resp: any) => {
//           const expiresTime = new Date(Date.now() + (3000 * 1000));  // 七牛token 3600 秒过期；
//           Cookies.set('qiniuToken', resp.token, { expires: expiresTime });
//           upload(resp.token);
//         });
//     }
//   }
//   uploadImage = (token: string, files: any) => {
//     const { onChange } = this.props;
//     const formData = new FormData();
//     const file = files[0];

//     if (file && file.type.includes('image')) {
//       formData.append('file', file);
//       formData.append('token', token);
//       const _URL = window.URL || window.webkitURL;
//       const img = new Image();
//       img.onload = () => {
//         const { width, height } = img;
//         const name = r.hex(20);
//         const extendName = file.name.slice(file.name.lastIndexOf('.'));
//         const key = `archive/image/${name}_${width}_${height}${extendName}`;
//         formData.append('key', key);

//         this.setState({ percent: 0 });
//         onChange('');
//         superagent.post('//upload.qiniu.com')
//           .send(formData)
//           .on('progress', (e) => {
//             this.setState({ percent: e.percent });
//           })
//           .end((err, res) => {
//             // 有点奇怪，progress 100% 之后并没有真完成，还有第二次100%； 不准确，所以在end写个101来隐藏进度条吧
//             this.setState({ percent: 101 });
//             const body = res.body;
//             if (body && body.key) {
//               Message.success('上传成功');
//               onChange(`http://cdn.image.huoqiuapp.com/${body.key}`);
//             } else {
//               Message.error(`上传失败${err}`);
//             }
//           });
//       };
//       img.src = _URL.createObjectURL(file);
//     } else {
//       Message.error('文件格式不正确');
//     }
//   };
//   onDrop = (files: any) => {
//     this.getToken((token: string) => this.uploadImage(token, files));
//   };
//   render() {
//     const {
//       style, width, height, img, video, title, tips, type, onChange, limit, token, ...otherProps
//     } = this.props;
//     return (
//       <div>
//         <DropZone
//           style={{ width: 0, height: 0, visibility: 'hidden' }}
//           onDrop={this.onDrop}
//           ref={(node) => {
//             this.dropZone = node;
//           }}
//           {...otherProps}
//         />
//       </div>
//     );
//   }
// }

// export default App;
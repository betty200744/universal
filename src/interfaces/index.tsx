interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: any;
  HuoqiuJavascriptBridge: any;
  webkitURL: any;
}

interface Option {
  value: string;
  label: string;
}

interface SimpleMap {
  [x: string]: any;
}

interface SimpleReview {
  _id: string;
  img: string;
  name: string;
  spec: string;
  amount: number;
}

interface UserInfo {
  contact: string;
  address: string;
  comment: string;
}

interface LogisticInfo {
  company: string;
  serial_no: string;
  sendBackFee?: number;
  images?: Array<string>;
}
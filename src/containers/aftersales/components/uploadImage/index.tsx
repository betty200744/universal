import * as React from 'react';
import Uploader from '../uploader';
import { Image } from '../../../../components';
import { closeIcon } from '../../../../utils/imgUrl';
const Styles = require('./index.less');

interface IProps {
  imgs: Array<string>;
  maxNumber: number;
  onChange(e: Array<string>): void;
  onDelete(i: number): void;
}

interface IState { }

class UploaderImage extends React.Component<IProps, IState> {
  render() {
    const { imgs, maxNumber, onChange, onDelete } = this.props;
    return (
      <div>
        <div className={Styles.photoUpload}>
          {imgs.map((e: string, i: number) => (<div key={e} className={Styles.img}>
            <Image className={Styles.imgMain} src={e} />
            <Image className={Styles.close} src={closeIcon} onClick={() => onDelete(i)} />
          </div>))}

          {imgs.length < maxNumber && <Uploader onChange={onChange} maxNumber={maxNumber} />}
        </div>
      </div>
    );
  }
}

export default UploaderImage;
import * as React from 'react';
import { Image } from '../../../../components';
const Styles = require('./index.less');

interface IProps {
  review: SimpleReview;
}

interface IState { }

class ReviewTop extends React.Component<IProps, IState> {
  render() {
    const { review } = this.props;
    return (
      <div className={Styles.top}>
        <div className={Styles.topImg}><Image src={review.img} /></div>
        <div className={Styles.topText}>
          <div>{review.name}</div>
          <div>{review.spec || '无规格'}</div>
        </div>
      </div>
    );
  }
}

export default ReviewTop;
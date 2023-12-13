import * as React from 'react';
import { Image } from '../../../../components';
const Styles = require('./index.less');

interface IProps {
  review: SimpleReview;
  noSpec?: boolean;
}

interface IState { }

class ReviewTop extends React.Component<IProps, IState> {
  render() {
    const { review, noSpec } = this.props;
    return (
      <div className={Styles.top}>
        <div className={Styles.topImg}><Image src={review.img} /></div>
        <div className={Styles.topText}>
          <div>{review.name}</div>
          <div>{!noSpec ? review.spec : ''} {review.amount ? `x ${review.amount}` : ''}</div>
        </div>
      </div>
    );
  }
}

export default ReviewTop;
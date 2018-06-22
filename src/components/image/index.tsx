import * as React from 'react';

const defaultImage = 'https://cdn.image.huoqiuapp.com/javis/icon/default-image@3x.png';

const getFontSize = (): number => {
  const str = document.documentElement.style.fontSize;
  const num = str.slice(0, -2);
  return Number(num);
};

const getImageSize = (width: number): number => {
  if (!width) return;
  if (typeof width === 'string') return width;
  const documentFontSize = getFontSize();
  return width * documentFontSize;
};

const getThumbnail = (width: number): string => {
  if (!width) return '';
  if (typeof width === 'string') return '';
  const imageSize = getImageSize(width);
  const intSize = parseInt(String(imageSize), 10);
  return `?imageView2/2/w/${intSize * 2}`;
};

const Image = ({ style, width, height, cycle, src, alt, thumbnail = true, ...restProps }: any) =>
  <img
    style={{
      width: getImageSize(width),
      height: getImageSize(height) || getImageSize(width),
      minWidth: getImageSize(width),
      // minHeight: getImageSize(height) || getImageSize(width),
      borderRadius: cycle ? '50%' : '0.4rem',
      ...style,
      objectFit: 'cover', // cover 在 ios9下显示会有问题，不过跟庄胖沟通不在兼容ios9样式
    }}
    src={`${src ? src + (thumbnail ? getThumbnail(width) : '') : defaultImage}`}
    alt={alt || 'image'}
    {...restProps}
  />;

export default Image;

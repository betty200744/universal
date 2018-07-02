import * as React from 'react';
const Styles = require('./index.less');

interface IProps {
  height?: number;
  width?: number;
  type: string;
  disabled?: boolean;
  onClick?(e: React.MouseEvent<HTMLDivElement>): void;
}

interface IState {

}

class Button extends React.Component<IProps, IState> {

   getSize = (type: string) => {
     let term;
     const { height, width } = this.props;
     if (type === 'height') {
       term = height;
     }
     if (type === 'width') {
       term = width;
     }
     if (term) {
       if (typeof term === 'string') {
         return term;
       }

       return `${(term)}rem`;
     }
     return 'unset';
   };


   getStyle = () => {
     const { height = 35.5, width = 3.4 } = this.props;
     const calcStyle = {
       width: `${width}rem`,
       height: `${height}rem`,
       borderRadius: `${height}rem`,
     };
     return calcStyle;
   };

  // primary primary-light default default-light danger danger-light
   getClassName = () => {
     const { type = 'primary', disabled = false } = this.props;
     return `${Styles.button} ${Styles[type]} ${disabled ? Styles.disabled : ''}`;
   };

   render() {
     const { children, onClick, disabled } = this.props;
     return (
       <div
         className={this.getClassName()}
         onClick={(e) => {
           if (!disabled) {
             onClick && onClick(e);
           }
         }}
         style={this.getStyle()}
       >
         {children}
       </div>
     );
   }
}

export default Button;
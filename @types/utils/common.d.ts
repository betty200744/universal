export declare const isValidated: (conditions: ConditionFace[]) => boolean;
/**
 * 数字转换成两位小数的金额浮点数,
 * @param number num 需要转换的数字,
 * @returns string 两位小数的浮点数金额,
*/
export declare const numberToMoney: (num: any) => string;
export declare const convertTimeString: (str: any, type?: string, slicer?: string) => string;
export declare const getRemainTime: (time: string) => string;
export declare const goToPage: (url: string) => void;
export declare const goBack: () => void;
export declare const pageListenGoBack: (cb: () => void) => void;
export declare const getSupport: () => void;
export declare const goToAftersalesPage: (url: string) => void;
export declare const processNumberToK: (num: number) => string | number;
export declare const getShopId: () => any;
export declare const getQuery: (name: string) => any;
export declare const sendMessage: (message: any) => void;
export declare const scrollToTop: () => void;
export declare const getScrollTop: () => number;
export declare const getBottomHeight: () => number;

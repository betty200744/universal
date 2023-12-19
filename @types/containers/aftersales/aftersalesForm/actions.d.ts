export declare const getRefundPrice: (orderId: string, productId: string, amount: number, reasonCode: string, aftersaleId: string) => any;
export declare const fetchData: (orderId: string, productId: string, type: string) => any;
export declare const fetchAftersale: (afterSaleId: string) => any;
export declare const createAfterSale: (orderId: string, type: string, totalPrice: string, product: string, amount: number, reasonCode: string, phone: string, description: string, images: string[]) => any;


export interface CreateSellingOrderParams {
  user_id: number;
  order_status: string;
  delivery_name: string;
  delivery_phone_number: string;
  delivery_zip_code: string;
  delivery_prefecture: string;
  delivery_address1: string;
  delivery_address2: string;
  delivery_address3?: string;
  delivery_method: string;
  payment_method: string;
  amount: number;
  products_num: number;
  admin_note?: string;
  specified_delivery_date?: {
    seconds: string;
    nanos: number;
  } | undefined;
  specified_delivery_time?: string;
  modification_type: string;
}


export interface SellingOrderDelivery {
  sellingOrderDeliveryId: number;
  sellingOrderId: number;
  deliveryMethod: string;
  deliveryNumber: string | null;
  specifiedDeliveryDate: string;
  specifiedDeliveryTime: string;
  completedDeliveryDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SellingOrderTransaction {
  sellingOrderTransactionId: string;
  sellingOrderId: number;
  modificationType: string;
  transactionMethod: string;
  beforeModificationPaymentAmount: number;
  afterModificationPaymentAmount: number;
  beforeManualModificationAmount: number;
  afterManualModificationAmount: number;
  transactionResult: string;
  transactionErrorReason: string | null;
  completedTransactionDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SellingOrderResponse {
  sellingOrderId: number;
  orderStatus: string;
  deliveryName: string;
  deliveryPhoneNumber: string;
  deliveryZipCode: string;
  deliveryPrefecture: string;
  deliveryAddress1: string;
  deliveryAddress2: string;
  deliveryAddress3?: string;
  deliveryMethod: string;
  paymentMethod: string;
  amount: number;
  productsNum: number;
  createdAt: string;
  updatedAt: string;
  sellingOrderDeliveries: SellingOrderDelivery[];
  sellingOrderTransactions: SellingOrderTransaction[];
  sellingOrderInventories: any[]; // Define this properly if you have the structure
}

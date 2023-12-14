export interface Purchase {
  discountCode    ?: string,
  itemName         : string,
  originalPrice    : number,
  discountedPrice ?: number,
}

export interface PurchaseStoreItem {
  customerId: number,
  purchases: Purchase[]
}

export interface DiscountCode {
  nthTransaction   : number,
  discountCode     : string,
  discountedAmount : number // percentage represented as number less than 1
}
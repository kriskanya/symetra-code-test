import _ from 'lodash'

let discountStore: DiscountCode[] = []
let purchaseStore: Purchase[] = []

export const createDiscountRecord = (payload: DiscountCode): Promise<DiscountCode[] | string> => {
  return new Promise(function(resolve, reject) {
    if (!payload || _.isEmpty(payload)) {
      return reject({ message: 'Create discount record error: payload is empty' })
    }

    const existingRecord = discountStore.find(d => {
      return d.discountCode === payload?.discountCode
    })

    if (existingRecord) {
      return reject({message: 'Create discount record error: discount code already exists'})
    }

    // discountStore = [ ...discountStore, payload ]

    discountStore.push(payload)
    resolve(discountStore)
  })
}

export const getDiscountRecordByName = (discountCode: string) => {
  return new Promise(function(resolve, reject) {
    if (!discountCode || (_.isString(discountCode) && discountCode.length === 0)) {
      reject({ message: 'Fetch discount record error: no discount code provided' })
    }

    const record = discountStore.find(d => {
      return d.discountCode === discountCode
    })

    resolve(record)
  })
}

export const createPurchaseRecord = (payload: Purchase): Promise<Purchase[]> => {
  return new Promise(function(resolve, reject) {
    if (!payload || _.isEmpty(payload)) {
      return reject({ message: 'Create discount record error: payload is empty' })
    }


    const discount = discountStore.find(d => {
      return d.discountCode === payload?.discountCode
    })

    if (discount && payload?.originalPrice && discount?.discountedAmount) {
      const discountedPrice = payload.originalPrice - (payload.originalPrice * discount.discountedAmount)
      payload = { ...payload, ...{ discountedPrice } }
    }

    purchaseStore.push(payload)
    resolve(purchaseStore)
  })
}

export interface Purchase {
  discountCode     : string,
  itemName         : string,
  originalPrice    : number,
  discountedPrice ?: number,
  customerId       : number
}

export interface DiscountCode {
  nthTransaction   : number,
  discountCode     : string,
  discountedAmount : number // percentage represented as number less than 1
}
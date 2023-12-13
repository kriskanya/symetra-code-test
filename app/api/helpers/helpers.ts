import _ from 'lodash'
import { getStoreValue, setStoreValue } from '@/app/api/helpers/store'

export const createDiscountRecord = (payload: DiscountCode): Promise<DiscountCode[] | string> => {
  return new Promise(function(resolve, reject) {
    if (!payload || _.isEmpty(payload)) {
      return reject({ message: 'Create discount record error: payload is empty' })
    }

    let discountStore: DiscountCode[] = getStoreValue<DiscountCode>('discountStore')

    const existingRecord = discountStore.find(d => {
      return d.discountCode === payload?.discountCode
    })

    if (existingRecord) {
      return reject({message: 'Create discount record error: discount code already exists'})
    }

    discountStore = setStoreValue<DiscountCode>(payload, 'discountStore')
    resolve(discountStore)
  })
}

export const getDiscountRecordByName = (discountCode: string) => {
  return new Promise(function(resolve, reject) {
    if (!discountCode || (_.isString(discountCode) && discountCode.length === 0)) {
      reject({ message: 'Fetch discount record error: no discount code provided' })
    }

    const discountStore = getStoreValue<DiscountCode>('discountStore')

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

    const discountStore = getStoreValue<DiscountCode>('discountStore')

    const discount = discountStore.find(d => {
      return d.discountCode === payload?.discountCode
    })

    if (discount && payload?.originalPrice && discount?.discountedAmount) {
      const discountedPrice = payload.originalPrice - (payload.originalPrice * discount.discountedAmount)
      payload = { ...payload, ...{ discountedPrice } }
    }

    const purchaseStore = setStoreValue<Purchase>(payload, 'purchaseStore')
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
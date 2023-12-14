import _ from 'lodash'
import { getStoreValue, setDiscountStoreValue, setPurchaseStoreValue } from '@/app/api/shared/store'
import { DiscountCode, Purchase, PurchaseStoreItem } from '@/app/api/shared/types'

/**
 * Creates a discount record
 * @param payload DiscountCode
 * @return Promise<DiscountCode[] | string
 */
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

    discountStore = setDiscountStoreValue(payload)
    resolve(discountStore)
  })
}

/**
 * Fetches discount record from discountStore by provided discountCode
 * @param discountCode
 * @return Promise<DiscountCode>
 */
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

/**
 * Creates a purchase record
 * @param payload
 * @param customerId
 * @return Promise<PurchaseStoreItem[]>
 */
export const createPurchaseRecord = (payload: Purchase, customerId: number): Promise<PurchaseStoreItem[]> => {
  return new Promise(function(resolve, reject) {
    if (!payload || _.isEmpty(payload)) {
      return reject({ message: 'Create discount record error: payload is empty' })
    }
    const discountStore = getStoreValue<DiscountCode>('discountStore')

    // find the discount by the discount code provided
    const discount = discountStore.find(d => {
      return d.discountCode === payload?.discountCode
    })

    const purchaseStoreItemForCustomerId: PurchaseStoreItem[] = getStoreValue<PurchaseStoreItem>('purchaseStore')
      .filter((item: PurchaseStoreItem) => {
        return item?.customerId === customerId
      })
    // if there are no customer purchases yet, consider this the first purchase and set numberOfCustomerPurchases to 0
    const numberOfCustomerPurchases = _.get(purchaseStoreItemForCustomerId, '[0].purchases.length', 0) + 1

    // only apply discount if the number of the current purchase is equal to the nthTransaction specified on the discount record
    if (discount && payload?.originalPrice && discount?.discountedAmount && (discount?.nthTransaction === numberOfCustomerPurchases)) {
      const discountedPrice = payload.originalPrice - (payload.originalPrice * discount.discountedAmount)
      payload = { ...payload, ...{ discountedPrice } }
    }

    const purchaseStore = setPurchaseStoreValue(payload, customerId)
    resolve(purchaseStore)
  })
}
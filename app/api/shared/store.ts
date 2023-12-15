import _ from 'lodash'
import { DiscountCode, Purchase, PurchaseStoreItem } from '@/app/api/shared/types'

// This is the in-memory backend data store. In a real app, a database would handle the persistence
// and retrieval of data.

/**
 * Retrieves store value for discounts or purchases
 * @param storeName
 * @return DiscountCode[] | PurchaseStoreItem[]
 */
export const getStoreValue = <T>(storeName: 'discountStore' | 'purchaseStore'): T[] => {
  const currentStoreValue = _.get(global, storeName)
  if (!currentStoreValue) {
    _.set(global, storeName, [])
  }
  return _.get(global, storeName, [])
}

/**
 * Adds an item to the array of discounts in the discountStore
 * @param input
 * @return DiscountCode[]
 */
export const setDiscountStoreValue = (input: DiscountCode): DiscountCode[] => {
  const currentStoreValue: DiscountCode[] = getStoreValue<DiscountCode>('discountStore')
  const newStoreValue: DiscountCode[] = [...currentStoreValue, input]

  _.set(global, 'discountStore', newStoreValue)

  return getStoreValue<DiscountCode>('discountStore')
}

/**
 * Retrieves the purchase history from the store based on customerId
 * If no purchases exist, create a new PurchaseStoreItem
 * If a PurchaseStoreItem already exists for that customerId, add the purchase to the existing purchases array
 * PurchaseStoreItem: e.g., {
 *   customerId: 1,
 *   purchases: [
 *     { discountCode: 'discount10', itemName: 'queen mattress', originalPrice: 1000, discountedPrice: 900 }
 *   ]
 * }
 * @param input      : Purchase
 * @param customerId : number
 */
export const setPurchaseStoreValue = (input: Purchase, customerId: number): PurchaseStoreItem[] => {
  let newStoreValue: PurchaseStoreItem[] = getStoreValue<PurchaseStoreItem>('purchaseStore')
  let existingStoreValue = newStoreValue.find(item => item.customerId === customerId)

  if (!existingStoreValue) {
    const purchaseObj = {
      customerId,
      purchases: [input]
    }
    newStoreValue.push(purchaseObj)
  } else {
    existingStoreValue.purchases.push(input)
  }

  _.set(global, 'purchaseStore', newStoreValue)

  return getStoreValue<PurchaseStoreItem>('purchaseStore')
}
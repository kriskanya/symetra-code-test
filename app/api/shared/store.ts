import _ from 'lodash'
import { DiscountCode, Purchase, PurchaseStoreItem } from '@/app/api/shared/types'

// {
//   customerId: 1,
//   purchases: []
// }

export const getStoreValue = <T>(storeName: 'discountStore' | 'purchaseStore'): T[] => {
  const currentStoreValue = _.get(global, storeName)
  if (!currentStoreValue) {
    _.set(global, storeName, [])
  }
  return _.get(global, storeName, [])
}

export const setDiscountStoreValue = (input: DiscountCode): DiscountCode[] => {
  const currentStoreValue: DiscountCode[] = getStoreValue('discountStore')
  const newStoreValue: DiscountCode[] = [...currentStoreValue, input]

  _.set(global, 'discountStore', newStoreValue)

  return getStoreValue('discountStore')
}

export const setPurchaseStoreValue = (input: Purchase, customerId: number): PurchaseStoreItem[] => {
  let newStoreValue: PurchaseStoreItem[] = getStoreValue('purchaseStore')
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

  return getStoreValue('purchaseStore')
}
import { DiscountCode, Purchase } from '@/app/api/helpers/helpers'
import _ from 'lodash'

export const getStoreValue = <T>(storeName: 'discountStore' | 'purchaseStore'): T[] => {
  const currentStoreValue = _.get(global, storeName)
  if (!currentStoreValue) {
    _.set(global, storeName, [])
  }
  return _.get(global, storeName, [])
}

export const setStoreValue = <T>(input: T, storeName: 'discountStore' | 'purchaseStore'): T[] => {
  const currentStoreValue: DiscountCode[] = getStoreValue(storeName)
  const newStoreValue = [...currentStoreValue, input]

  _.set(global, storeName, newStoreValue)

  return _.get(global, storeName, [])
}
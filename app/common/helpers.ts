import { cloneDeep, get, isArray, set } from 'lodash'
import { Dispatch, SetStateAction } from 'react'
import { DiscountCode, PurchaseStoreItem } from '@/app/api/shared/types'

export interface AdminForm {
  nthTransaction   : string,
  discountedAmount : string,
  discountCode     : string
}

export interface CustomerForm {
  customerId    : string,
  itemName      : string,
  originalPrice : string,
  discountCode ?: string
}

export const fetchDiscounts = async (setDiscounts: Dispatch<SetStateAction<DiscountCode[]>>, setError: Dispatch<SetStateAction<string>>) => {
  try {
    const res = await fetch('/api/discounts')
    const discounts = await res.json()

    if (isArray(discounts) && discounts.length) {
      setDiscounts(discounts)
    }
  } catch (err) {
    setError(err as string)
  }
}

export const fetchPurchases = async (setPurchases: Dispatch<SetStateAction<PurchaseStoreItem[]>>, setError: Dispatch<SetStateAction<string>>) => {
  try {
    const res = await fetch('/api/purchases')
    const purchases = await res.json()

    if (isArray(purchases) && purchases.length) {
      setPurchases(purchases)
    }
  } catch (err) {
    setError(err as string)
  }
}

export const setMessage = (text: string, setMessage: Dispatch<SetStateAction<string>>) => {
  setMessage(text)
  setTimeout(() => {
    setMessage('')
  }, 6000)
}
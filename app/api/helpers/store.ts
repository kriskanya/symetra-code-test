import { DiscountCode, Purchase } from '@/app/api/helpers/helpers'


class DiscountStore {
  private static _instance: any

  private constructor() { }

  static getInstance() {
    if (this._instance && this._instance.length > 0) {
      return this._instance;
    }

    this._instance = []
    return this._instance;
  }

  static setInstance(input: any) {
    if (!this._instance) {
      this._instance = []
    }

    this._instance.push(input)
    return this._instance;
  }

}

export default DiscountStore

;
export let discountStore: any[] = []
export let purchaseStore: any[] = []

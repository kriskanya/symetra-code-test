'use client'
import { FormEvent, useEffect, useState } from 'react'
import { cloneDeep, get, isArray, set } from 'lodash'
import { DiscountCode, PurchaseStoreItem } from '@/app/api/shared/types'
import { AdminForm, fetchDiscounts, fetchPurchases, setMessage } from '@/app/common/helpers'
import Link from 'next/link'

export default function Admin() {
  const [formValues, setFormValues] = useState<AdminForm>({
    nthTransaction: '',
    discountedAmount: '',
    discountCode: ''
  })
  const [discounts, setDiscounts] = useState<DiscountCode[]>([])
  const [purchases, setPurchases] = useState<PurchaseStoreItem[]>([])
  const [flashMessage, setFlashMessage] = useState<string>('')

  const submitForm = async (event: FormEvent) => {
    event.preventDefault()

    const body = {
      nthTransaction   : +formValues.nthTransaction,
      discountedAmount : +formValues.discountedAmount,
      discountCode     : formValues.discountCode
    }

    const res = await fetch(`/api/discount`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      },
    })

    const jsonResponse = await res.json()

    if (jsonResponse?.error) {
      setMessage(jsonResponse.error, setFlashMessage)
    } else {
      setDiscounts(jsonResponse)
      setMessage('record successfully created', setFlashMessage)
    }
  }

  const onChange = (event: any) => {
    const value = get(event, 'target.value')
    const key = get(event, 'target.id')

    const formInputs = cloneDeep(formValues)

    set(formInputs, `[${ key }]`, value)
    setFormValues(formInputs)
  }

  const getPurchasesCount = () => {
    if (purchases.length === 0) return ''

    return purchases.reduce((accumulator, currentValue) => {
      accumulator += get(currentValue, 'purchases.length', 0)
      return accumulator
    }, 0)
  }

  const getTotalDiscountsGiven = () => {
    if (discounts.length === 0) return ''

    return purchases.reduce((accumulator, currentValue) => {
      const discountsGiven = currentValue?.purchases.filter(p => p.discountedPrice)?.length
      accumulator += discountsGiven
      return accumulator
    }, 0)
  }

  useEffect(() => {
    (async () => {
      await Promise.all([
        fetchDiscounts(setDiscounts, setFlashMessage),
        fetchPurchases(setPurchases, setFlashMessage)
      ])
    })()
  }, [])

  return (
    <form onSubmit={submitForm}>
      <section>
        <div>
          <h1 className="text-2xl mb-4 ml-4 mt-4">Admin Page</h1>
          <div className="text-teal-200 inline-block ml-4">
            <span>{'<'}</span>
          </div>
          <Link className="ml-4 mt-4" href="/customer">go to customer page</Link>
        </div>

        <div className="flex gap-20 justify-center mt-4">
          <div>
            <div className="flex justify-between">
              <label htmlFor="nthTransaction">{`'N'th transaction to receive discount`}</label>
              <input className="ml-3 text-black"
                     id="nthTransaction"
                     type="text"
                     value={formValues.nthTransaction}
                     onChange={onChange}
                     required
              />
            </div>
            <div className="flex justify-between mt-4">
              <label htmlFor="discountedAmount">{`Discounted Amount (<1)`}</label>
              <input className="ml-3 text-black"
                     id="discountedAmount"
                     type="text"
                     value={formValues.discountedAmount}
                     onChange={onChange}
                     required
              />
            </div>
            <div className="flex justify-between mt-4">
              <label htmlFor="discountCode">Discount Code</label>
              <input className="ml-3 text-black"
                     id="discountCode"
                     type="text"
                     value={formValues.discountCode}
                     onChange={onChange}
                     required
              />
            </div>
            <button className="mt-20 border px-4 py-2 rounded">Create new discount</button>
            <p className="mt-2">{flashMessage}</p>
          </div>
          <div className="flex">
            <div>
              {
                isArray(purchases) && purchases.length
                  ? (
                    <div>
                      <h3>Saved Purchases:</h3>
                      <pre id="json">{JSON.stringify(purchases, null, 4)}</pre>
                    </div>
                  )
                  : ''
              }
            </div>
            <div>
              {
                isArray(discounts) && discounts.length
                  ? (
                    <div>
                      <h3>Saved Discounts:</h3>
                      <pre id="json">{JSON.stringify(discounts, null, 4)}</pre>
                    </div>
                  )
                  : ''
              }
            </div>
          </div>
          <div>
            <p>Purchases Count: {getPurchasesCount()}</p>
            <p className="mt-6">Total discounts given out: {getTotalDiscountsGiven()}</p>
          </div>
        </div>
      </section>
    </form>
  )
}
'use client'
import { FormEvent, useEffect, useState } from 'react'
import { cloneDeep, get, isArray, set } from 'lodash'
import { DiscountCode, PurchaseStoreItem } from '@/app/api/shared/types'

export default function Admin() {
  const [formValues, setFormValues] = useState({
    nthTransaction: '',
    discountedAmount: '',
    discountCode: ''
  })
  const [discounts, setDiscounts] = useState<DiscountCode[]>([])
  const [purchases, setPurchases] = useState<PurchaseStoreItem[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')

  const submitForm = async (event: FormEvent) => {
    event.preventDefault()

    const body = {
      nthTransaction: +formValues.nthTransaction,
      discountedAmount: +formValues.discountedAmount,
      discountCode: formValues.discountCode
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
      setError(jsonResponse.error)
    } else {
      setDiscounts(jsonResponse)
    }
  }

  const fetchDiscounts = async () => {
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

  const fetchPurchases = async () => {
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

  const onChange = (event: any) => {
    const value = get(event, 'target.value')
    const key = get(event, 'target.id')

    const formInputs = cloneDeep(formValues)

    set(formInputs, `[${ key }]`, value)
    setFormValues(formInputs)
  }

  const setError = (text: string) => {
    setErrorMessage(text)
    setTimeout(() => {
      setErrorMessage('')
    }, 5000)
  }

  useEffect(() => {
    (async () => {
      await Promise.all([fetchDiscounts(), fetchPurchases()])
    })()
  }, [])

  return (
    <form onSubmit={submitForm}>
      <section>
        <h1 className="text-2xl mb-4 ml-4 mt-4">Admin Page</h1>

        <div className="flex gap-20 justify-center">
          <div>
            <div className="flex justify-between">
              <label htmlFor="nthTransaction">{`'N'th transaction to receive discount`}</label>
              <input className="ml-3 text-black"
                     id="nthTransaction"
                     type="text"
                     value={formValues.nthTransaction}
                     onChange={onChange} required
              />
            </div>
            <div className="flex justify-between mt-4">
              <label htmlFor="discountedAmount">{`Discounted Amount (<1)`}</label>
              <input className="ml-3 text-black"
                     id="discountedAmount"
                     type="text"
                     value={formValues.discountedAmount}
                     onChange={onChange} required
              />
            </div>
            <div className="flex justify-between mt-4">
              <label className="mt-2" htmlFor="discountCode">Discount Code</label>
              <input className="ml-3 text-black"
                     id="discountCode"
                     type="text"
                     value={formValues.discountCode}
                     onChange={onChange} required
              />
            </div>
            <button className="mt-20 border px-4 py-2">Create new discount</button>
            <p className="mt-2">{errorMessage}</p>
          </div>
          <div>
            <div>
              <h3>Saved Discounts:</h3>
              {
                isArray(discounts) && discounts.length
                  ? <pre id="json">{JSON.stringify(discounts, null, 4)}</pre>
                  : ''
              }
            </div>
          </div>
          <div>
            <p>Count of purchases: {purchases?.length}</p>
            <p className="mt-6">Total discounts given out:</p>
          </div>
        </div>
      </section>
    </form>
  )
}
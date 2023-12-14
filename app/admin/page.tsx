'use client'
import { FormEvent, useEffect, useState } from 'react'
import { cloneDeep, get, isArray, isEmpty, set } from 'lodash'
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
  const [report, setReport] = useState<{purchaseCount: number, totalDiscountsGiven: number}>()

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

  const getReport = async () => {
    const res = await fetch('/api/report')
    const jsonResponse = await res.json()

    if (!isEmpty(jsonResponse)) setReport(jsonResponse)
  }

  const onChange = (event: any) => {
    const value = get(event, 'target.value')
    const key = get(event, 'target.id')

    const formInputs = cloneDeep(formValues)

    set(formInputs, `[${ key }]`, value)
    setFormValues(formInputs)
  }

  useEffect(() => {
    (async () => {
      await Promise.all([
        fetchDiscounts(setDiscounts, setFlashMessage),
        fetchPurchases(setPurchases, setFlashMessage)
      ])
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const a = await getReport()
    })()
  }, []);

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
            <p>Purchase Count: {report?.purchaseCount}</p>
            <p className="mt-6">Total discounts given: {report?.totalDiscountsGiven}</p>
          </div>
        </div>
      </section>
    </form>
  )
}
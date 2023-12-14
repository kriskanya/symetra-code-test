'use client'
import { cloneDeep, get, isArray, set } from 'lodash'
import { FormEvent, useEffect, useState } from 'react'
import { DiscountCode, PurchaseStoreItem } from '@/app/api/shared/types'
import { CustomerForm, fetchDiscounts, fetchPurchases, setMessage } from '@/app/common/helpers'
import Link from 'next/link'

export default function Customer() {
  const [formValues, setFormValues] = useState<CustomerForm>({
    customerId : '',
    itemName: '',
    originalPrice: '',
    discountCode: ''
  })
  const [purchases, setPurchases] = useState<PurchaseStoreItem[]>([])
  const [discounts, setDiscounts] = useState<DiscountCode[]>([])
  const [flashMessage, setFlashMessage] = useState<string>('')

  const submitForm = async (event: FormEvent) => {
    event.preventDefault()

    const body = {
      customerId: +formValues.customerId,
      itemName: formValues.itemName,
      originalPrice: +formValues.originalPrice,
      discountCode: formValues.discountCode
    }

    const res = await fetch(`/api/purchase`, {
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
      setPurchases(jsonResponse)
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

  const checkDiscountCode = async (event: any) => {
    event.preventDefault()

    if (!formValues?.discountCode) {
      return setMessage('Please enter discount code', setFlashMessage)
    }

    const res = await fetch(`/api/discount?discountCode=${ formValues?.discountCode }&customerId=${ formValues?.customerId }`)
    const jsonResponse = await res.json()

    if (jsonResponse?.errorMessage) {
      return setMessage(jsonResponse.errorMessage, setFlashMessage)
    } else {
      return setMessage('Discount code is valid', setFlashMessage)
    }
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
          <h1 className="text-2xl mb-4 ml-4 mt-4">Customer Page</h1>
          <div className="text-teal-200 inline-block ml-4">
            <span>{'<'}</span>
          </div>
          <Link className="ml-4 mt-4" href="/admin">go to admin page</Link>
        </div>

        <div className="flex gap-20 justify-center">
          <div>
            <div className="flex justify-between">
              <label htmlFor="customerId">Customer Id</label>
              <input className="ml-3 text-black"
                     id="customerId"
                     type="text"
                     value={formValues.customerId}
                     onChange={onChange}
                     required
              />
            </div>
            <div className="flex justify-between mt-4">
              <label htmlFor="itemName">Item Name</label>
              <input className="ml-3 text-black"
                     id="itemName"
                     type="text"
                     value={formValues.itemName}
                     onChange={onChange}
                     required
              />
            </div>
            <div className="flex justify-between mt-4">
              <label htmlFor="originalPrice">Price</label>
              <input className="ml-3 text-black"
                     id="originalPrice"
                     type="text"
                     value={formValues.originalPrice}
                     onChange={onChange}
                     required
              />
            </div>
            <div>
              <div className="flex justify-between mt-4">
                <label htmlFor="discountCode">Discount Code</label>
                <input className="ml-3 text-black"
                       id="discountCode"
                       type="text"
                       value={formValues.discountCode}
                       onChange={onChange}
                />
              </div>
              <button className="border px-4 py-2 rounded float-right mt-2 text-xs" onClick={checkDiscountCode}>
                Check discount code
              </button>
            </div>
            <button className="mt-20 border px-4 py-2 rounded">Create new purchase</button>
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
        </div>
      </section>
    </form>
  )
}
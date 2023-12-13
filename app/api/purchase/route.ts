import { NextRequest, NextResponse } from 'next/server'
import { validateCreatePurchasePayload } from '@/app/api/purchase/purchase.validation'
import { createPurchaseRecord } from '@/app/api/helpers/helpers'
import DiscountStore from '@/app/api/helpers/store'

export async function POST(req: NextRequest) {
  try {
    const { discountCode, itemName, originalPrice, customerId } = await req.json()
    // validate the payload for the incoming request
    validateCreatePurchasePayload({ discountCode, itemName, originalPrice, customerId })

    console.log('route2', DiscountStore.getInstance())
    debugger

    const res= await createPurchaseRecord({ discountCode, itemName, originalPrice, customerId })
    return Response.json(res)

  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({
        error: err?.message
      }),
      {
        status: 500
      }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import {
  validateCreateDiscountCodePayload,
  validateFetchDiscountCodePayload
} from '@/app/api/discount/discount.validation'
import { createDiscountRecord, getDiscountRecordByName } from '@/app/api/helpers/helpers'
import DiscountStore from '@/app/api/helpers/store'

export async function POST(req: NextRequest) {
  try {
    const { nthTransaction, discountCode, discountedAmount } = await req.json()
    // validate the payload for the incoming request
    validateCreateDiscountCodePayload({ nthTransaction, discountCode, discountedAmount })

    // DiscountStore.setInstance('hello')
    // console.log('route2', DiscountStore.getInstance())


    const res = await createDiscountRecord({ nthTransaction, discountCode, discountedAmount })
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

export async function GET(req: NextRequest) {
  try {
    const discountCode = req.nextUrl.searchParams.get('discountCode')
    // validate the payload for the incoming request
    validateFetchDiscountCodePayload({ discountCode })

    const res = await getDiscountRecordByName(discountCode as string)
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
import { NextRequest, NextResponse } from 'next/server'
import {
  validateCreateDiscountCodePayload,
  validateFetchDiscountCodePayload
} from '@/app/api/discount/discount.validation'
import { createDiscountRecord, getDiscountRecordByName } from '@/app/api/shared/helpers'
import _ from 'lodash'

export async function POST(req: NextRequest) {
  try {
    const { nthTransaction, discountCode, discountedAmount } = await req.json()
    // validate the payload for the incoming request
    validateCreateDiscountCodePayload({ nthTransaction, discountCode, discountedAmount })

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

    let res = await getDiscountRecordByName(discountCode as string)

    if (_.isUndefined(res)) {
      res = { errorMessage: 'Discount code does not exist' }
    }

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
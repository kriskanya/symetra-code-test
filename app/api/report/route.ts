import { NextRequest, NextResponse } from 'next/server'
import { getPurchaseCount, getTotalDiscountsGiven } from '@/app/api/shared/helpers'

export async function GET(req: NextRequest) {
  try {
    const purchaseCount = getPurchaseCount()
    const totalDiscountsGiven = getTotalDiscountsGiven()

    return Response.json({ purchaseCount, totalDiscountsGiven })
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
import { NextRequest, NextResponse } from 'next/server'
import { getStoreValue } from '@/app/api/shared/store'

export async function GET(req: NextRequest) {
  try {
    const res = getStoreValue('discountStore')
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
'use client'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-60">
      <h1 className="text-2xl">Ecommerce Store</h1>
      <div className="flex gap-10">
        <button className="border px-4 py-2" onClick={() => router.push('admin')}>
          Admin
        </button>
        <button className="border px-4 py-2" onClick={() => router.push('customer')}>
          Customer
        </button>
      </div>
    </main>
  )
}

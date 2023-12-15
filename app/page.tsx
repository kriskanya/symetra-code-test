'use client'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center mt-40 gap-20">
      <h1 className="text-2xl">Ecommerce Store</h1>
      <div className="flex gap-10">
        <button className="border px-4 py-2 rounded" onClick={() => router.push('admin')}>
          Admin
        </button>
        <button className="border px-4 py-2 rounded" onClick={() => router.push('customer')}>
          Customer
        </button>
      </div>
    </main>
  )
}

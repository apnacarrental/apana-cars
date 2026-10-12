import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-[120px] font-serif leading-none tracking-tighter mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
        </p>
        <Link 
          href="/"
          className="button button-dark px-8 py-3 rounded-full"
        >
          Return Home
        </Link>
      </main>
      <Footer />
    </>
  )
}

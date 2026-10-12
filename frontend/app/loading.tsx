import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function GlobalLoading() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium uppercase tracking-widest text-sm">Loading</p>
        </div>
      </main>
      <Footer />
    </>
  )
}

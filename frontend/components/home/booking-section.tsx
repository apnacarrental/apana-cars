import { BookingForm } from '@/components/ui/booking-form'

export function BookingSection() {
  return (
    <section id="book" className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-30 mb-8">
      <BookingForm />
    </section>
  )
}

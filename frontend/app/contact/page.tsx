import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ArrowRight, Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import prisma from '@/lib/prisma'
import { InquiryForm } from '@/components/ui/inquiry-form'
import { buildMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> {
  return await buildMetadata({
    fallbackTitle: 'Contact Us | Apna Cars Hyderabad Cab & Rental Support',
    fallbackDescription: 'Get in touch with Apna Car Rental for 24/7 bookings, vehicle quotes, and corporate inquiries across Hyderabad.',
    path: '/contact',
  })
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="section bg-[var(--paper-subtle)]" style={{ paddingTop: '150px', paddingBottom: '90px' }}>
          <div className="max-w-5xl mx-auto">
            <p className="eyebrow">Get in touch</p>
            <h1 className="text-3xl sm:text-5xl font-bold text-neutral-900 tracking-tight mb-4">
              We&apos;re here to <em>help.</em>
            </h1>
            <p className="text-base sm:text-lg text-[var(--soft)] max-w-xl mb-12">
              Have questions about our fleet, custom itineraries, outstation tariffs, or airport transfers? Reach our Hyderabad dispatch desk anytime.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {/* Phone Card */}
              <div className="p-6 bg-white rounded-2xl border border-[var(--line)] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900 mb-4">
                    <Phone size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-1">Call us</h3>
                  <p className="text-xs text-[var(--soft)] mb-4">Available 24/7 for instant bookings &amp; fleet queries.</p>
                </div>
                <a href="tel:+919988123444" className="text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-[var(--brand-orange)] transition-colors">
                  099881 23444
                </a>
              </div>
              
              {/* WhatsApp Card */}
              <div className="p-6 bg-white rounded-2xl border border-[var(--line)] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-[#25D366] mb-4">
                    <MessageCircle size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-1">WhatsApp</h3>
                  <p className="text-xs text-[var(--soft)] mb-4">Instant chat for live vehicle photos and fast quotes.</p>
                </div>
                <a href="https://wa.me/919988123444" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-wider text-[#25D366] hover:underline">
                  Chat on WhatsApp &rarr;
                </a>
              </div>

              {/* Email Card */}
              <div className="p-6 bg-white rounded-2xl border border-[var(--line)] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900 mb-4">
                    <Mail size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-1">Email us</h3>
                  <p className="text-xs text-[var(--soft)] mb-4">Corporate contracts &amp; vendor correspondence.</p>
                </div>
                <a href="mailto:hello@apnacarrental.com" className="text-xs font-bold text-neutral-900 hover:text-[var(--brand-orange)] transition-colors break-all">
                  hello@apnacarrental.com
                </a>
              </div>
              
              {/* Address Card */}
              <div className="p-6 bg-white rounded-2xl border border-[var(--line)] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900 mb-4">
                    <MapPin size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-1">Visit Office</h3>
                  <address className="not-italic text-xs text-[var(--soft)] leading-relaxed">
                    Flat no.403, saraswathi kunj, opp. Krishna Kunj Gardens, Vimana Puri, Quthbullapur, Hyderabad, Telangana 500055
                  </address>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Headquarters</span>
                  <a 
                    href="https://share.google/z8cDjKFU53sT1UXHv" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-[var(--brand-orange)] hover:underline"
                  >
                    View on Google &rarr;
                  </a>
                </div>
              </div>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--brand-orange)] block mb-1">Direct Assistance</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight m-0">Send an Online Inquiry</h2>
              </div>
              <ContactFormWrapper />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

async function ContactFormWrapper() {
  const [locations, services, cars] = await Promise.all([
    prisma.location.findMany({ where: { isActive: true }, select: { id: true, name: true }, orderBy: { name: 'asc' } }),
    prisma.service.findMany({ where: { isActive: true }, select: { id: true, title: true }, orderBy: { sortOrder: 'asc' } }),
    prisma.car.findMany({ where: { isActive: true }, select: { id: true, name: true }, orderBy: { sortOrder: 'asc' } })
  ])

  return <InquiryForm locations={locations} services={services} cars={cars} />
}

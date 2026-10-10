import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react'

import { buildMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> { return await buildMetadata({
  fallbackTitle: 'Contact Us | Apna Car Rental',
  fallbackDescription: 'Get in touch with Apna Car Rental for bookings and inquiries.',
  path: '/contact'
}) }

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="section" style={{ paddingTop: '160px', minHeight: '60vh' }}>
          <p className="eyebrow">Get in touch</p>
          <h1 style={{ fontSize: '3.5rem', margin: '0.5rem 0', letterSpacing: '-0.02em' }}>
            We&apos;re here to <em>help.</em>
          </h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
            <div style={{ padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
              <Phone size={32} style={{ marginBottom: '1rem' }} />
              <h3>Call us</h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>Available 24/7 for urgent inquiries.</p>
              <a href="tel:+919000000000" className="text-button" style={{ fontSize: '1.2rem' }}>+91 90000 00000</a>
            </div>
            
            <div style={{ padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
              <Mail size={32} style={{ marginBottom: '1rem' }} />
              <h3>Email us</h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>Drop us a line anytime.</p>
              <a href="mailto:hello@apnacarrental.com" className="text-button" style={{ fontSize: '1.2rem' }}>hello@apnacarrental.com</a>
            </div>
            
            <div style={{ padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
              <MapPin size={32} style={{ marginBottom: '1rem' }} />
              <h3>Visit us</h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>Our main office in Hyderabad.</p>
              <address style={{ fontStyle: 'normal', fontSize: '1.1rem' }}>
                Hitec City, Madhapur<br />
                Hyderabad, Telangana 500081
              </address>
            </div>
          </div>
          
          <div style={{ marginTop: '4rem', maxWidth: '800px', margin: '4rem auto 0' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Send an Inquiry</h2>
            {/* Note: In a real app we'd fetch these from a server component wrapper, but since this page is a server component, we can fetch them here. */}
            <ContactFormWrapper />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

import prisma from '@/lib/prisma'
import { InquiryForm } from '@/components/ui/inquiry-form'

async function ContactFormWrapper() {
  const [locations, services, cars] = await Promise.all([
    prisma.location.findMany({ where: { isActive: true }, select: { id: true, name: true }, orderBy: { name: 'asc' } }),
    prisma.service.findMany({ where: { isActive: true }, select: { id: true, title: true }, orderBy: { sortOrder: 'asc' } }),
    prisma.car.findMany({ where: { isActive: true }, select: { id: true, name: true }, orderBy: { sortOrder: 'asc' } })
  ])

  return <InquiryForm locations={locations} services={services} cars={cars} />
}


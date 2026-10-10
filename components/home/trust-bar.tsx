import { ShieldCheck, Users, Check, Clock3 } from 'lucide-react'

// Defining a local array for icons to avoid storing React components in pure data files
const trustItems = [
  { title: 'Well-maintained cars', desc: 'Ready for the road', Icon: ShieldCheck },
  { title: 'Professional service', desc: 'People who care', Icon: Users },
  { title: 'Transparent pricing', desc: 'No surprise charges', Icon: Check },
  { title: '24/7 assistance', desc: 'Here when you need us', Icon: Clock3 }
]

export function TrustBar() {
  return (
    <section className="trust-bar">
      {trustItems.map(({ title, desc, Icon }) => (
        <div className="trust-item" key={title}>
          <Icon size={20} />
          <div>
            <strong>{title}</strong>
            <span>{desc}</span>
          </div>
        </div>
      ))}
    </section>
  )
}

'use client'

import { useState } from 'react'
import { sendEmailAction, sendWhatsAppAction } from '@/app/admin/(dashboard)/leads/communications'
import { Mail, MessageCircle, AlertCircle } from 'lucide-react'
import { useFormStatus } from 'react-dom'

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <button disabled={pending} type="submit" className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 disabled:opacity-50">
      {pending ? 'Sending...' : label}
    </button>
  )
}

export function LeadCommunications({ leadId, email, phone, communications }: { leadId: string, email?: string | null, phone: string, communications: any[] }) {
  const [activeTab, setActiveTab] = useState<'NONE' | 'EMAIL' | 'WHATSAPP'>('NONE')

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-6">
      <h2 className="text-xl font-bold mb-4 border-b pb-2">Communications</h2>
      
      <div className="flex gap-4 mb-6">
        <button 
          type="button"
          onClick={() => setActiveTab(activeTab === 'EMAIL' ? 'NONE' : 'EMAIL')}
          className={`flex-1 py-2 px-4 border rounded-md text-sm font-medium flex items-center justify-center gap-2 ${activeTab === 'EMAIL' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'hover:bg-gray-50'}`}
        >
          <Mail size={16} /> Email Lead
        </button>
        <button 
          type="button"
          onClick={() => setActiveTab(activeTab === 'WHATSAPP' ? 'NONE' : 'WHATSAPP')}
          className={`flex-1 py-2 px-4 border rounded-md text-sm font-medium flex items-center justify-center gap-2 ${activeTab === 'WHATSAPP' ? 'bg-green-50 border-green-200 text-green-700' : 'hover:bg-gray-50'}`}
        >
          <MessageCircle size={16} /> WhatsApp Lead
        </button>
      </div>

      {activeTab === 'EMAIL' && (
        <form action={sendEmailAction.bind(null, leadId)} className="mb-8 p-4 border rounded-lg bg-gray-50 space-y-4">
          <h3 className="font-bold text-sm">Send Email</h3>
          {!email ? (
            <p className="text-sm text-red-600 flex items-center gap-1"><AlertCircle size={14}/> No email address on file for this lead.</p>
          ) : (
            <>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">To</label>
                <input readOnly value={email} className="w-full border rounded p-2 text-sm bg-gray-100" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Subject</label>
                <input name="subject" required placeholder="Subject..." className="w-full border rounded p-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Message</label>
                <textarea name="message" required rows={4} placeholder="Type your message..." className="w-full border rounded p-2 text-sm"></textarea>
              </div>
              <SubmitButton label="Send Email" />
            </>
          )}
        </form>
      )}

      {activeTab === 'WHATSAPP' && (
        <form action={sendWhatsAppAction.bind(null, leadId)} className="mb-8 p-4 border rounded-lg bg-gray-50 space-y-4">
          <h3 className="font-bold text-sm">Send WhatsApp</h3>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">To (Normalized internally)</label>
            <input readOnly value={phone} className="w-full border rounded p-2 text-sm bg-gray-100" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Message</label>
            <textarea name="message" required rows={4} placeholder="Type your WhatsApp message..." className="w-full border rounded p-2 text-sm"></textarea>
          </div>
          <SubmitButton label="Send WhatsApp" />
        </form>
      )}

      <div>
        <h3 className="font-bold text-sm mb-3">Communication History</h3>
        {communications.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No communication history.</p>
        ) : (
          <div className="space-y-3">
            {communications.map((comm) => (
              <div key={comm.id} className="text-sm border rounded-lg p-3 relative">
                <div className="flex justify-between items-start mb-1">
                  <span className={`font-medium flex items-center gap-1 ${comm.channel === 'WHATSAPP' ? 'text-green-700' : 'text-blue-700'}`}>
                    {comm.channel === 'WHATSAPP' ? <MessageCircle size={14}/> : <Mail size={14}/>} 
                    {comm.channel}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${comm.status === 'SENT' ? 'bg-green-100 text-green-800' : comm.status === 'FAILED' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                    {comm.status}
                  </span>
                </div>
                <div className="text-gray-500 text-xs mb-2">{new Date(comm.createdAt).toLocaleString()} â€¢ {comm.direction}</div>
                {comm.subject && <div className="font-semibold mb-1">{comm.subject}</div>}
                <div className="text-gray-800 bg-gray-50 p-2 rounded whitespace-pre-wrap">{comm.message}</div>
                {comm.errorMessage && (
                  <div className="mt-2 text-red-600 text-xs flex items-start gap-1">
                    <AlertCircle size={12} className="mt-0.5 shrink-0" />
                    <span>Failed: {comm.errorMessage}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

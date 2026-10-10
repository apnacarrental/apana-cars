import { getAllPageSeos } from '@/lib/data/seo'
import { savePageSeoAction, deletePageSeoAction } from './actions'
import { requireAdmin } from '@/lib/admin-auth'
import { SeoPreviewForm } from '@/components/admin/seo-preview-form'

export default async function PagesSeoDashboard() {
  await requireAdmin()
  const pages = await getAllPageSeos()
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Pages SEO</h1>
      <p className="text-gray-600 mb-8">Override metadata for specific static routes (e.g., /about, /faq).</p>
      
      <SeoPreviewForm saveAction={savePageSeoAction} />
      
      <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <h2 className="font-bold p-4 border-b">Existing Page Overrides</h2>
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 font-medium text-sm">Path</th>
              <th className="p-4 font-medium text-sm">Title</th>
              <th className="p-4 font-medium text-sm">Index/Follow</th>
              <th className="p-4 font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map(p => (
              <tr key={p.id} className="border-b border-gray-50">
                <td className="p-4 text-sm font-medium">{p.path}</td>
                <td className="p-4 text-sm text-gray-500">{p.title || '-'}</td>
                <td className="p-4 text-sm text-gray-500">{p.robotsIndex ? 'Yes' : 'No'} / {p.robotsFollow ? 'Yes' : 'No'}</td>
                <td className="p-4">
                  <form action={deletePageSeoAction}>
                    <input type="hidden" name="path" value={p.path} />
                    <button type="submit" className="text-red-600 text-sm hover:underline">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
            {pages.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">No page overrides configured yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

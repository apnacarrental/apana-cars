import prisma from '@/lib/prisma'
import { saveRedirectAction, deleteRedirectAction } from './actions'

export default async function RedirectsDashboard() {
  const redirects = await prisma.redirect.findMany({ orderBy: { createdAt: 'desc' } })
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Redirect Manager</h1>
      <p className="text-gray-600 mb-8">Manage 301/302 redirects for broken links or migrated content.</p>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h2 className="font-bold mb-4">Add Redirect</h2>
        <form action={saveRedirectAction} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Source Path</label>
              <input name="source" placeholder="/old-page" required className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Destination Path/URL</label>
              <input name="destination" placeholder="/new-page" required className="w-full border rounded-lg p-2" />
            </div>
          </div>
          <button type="submit" className="inline-block bg-black text-white px-4 py-2 rounded-lg font-medium">Add Redirect</button>
        </form>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 font-medium text-sm">Source</th>
              <th className="p-4 font-medium text-sm">Destination</th>
              <th className="p-4 font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {redirects.map(r => (
              <tr key={r.id} className="border-b border-gray-50">
                <td className="p-4 text-sm font-medium">{r.source}</td>
                <td className="p-4 text-sm text-gray-500">{r.destination}</td>
                <td className="p-4">
                  <form action={deleteRedirectAction}>
                    <input type="hidden" name="source" value={r.source} />
                    <button type="submit" className="text-red-600 text-sm hover:underline">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}



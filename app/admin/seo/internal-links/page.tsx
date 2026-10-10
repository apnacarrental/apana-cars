import prisma from '@/lib/prisma'
import { saveInternalLinkAction, deleteInternalLinkAction } from './actions'

export default async function InternalLinksDashboard() {
  const links = await prisma.internalLink.findMany({ orderBy: { sourcePath: 'asc' } })
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Internal Links Manager</h1>
      <p className="text-gray-600 mb-8">Manage strategic internal cross-linking relationships. These links will be injected at the bottom of specified source pages.</p>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h2 className="font-bold mb-4">Add Internal Link</h2>
        <form action={saveInternalLinkAction} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Source Page Path</label>
              <input name="sourcePath" placeholder="e.g. /locations/hyderabad" required className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Anchor Text</label>
              <input name="anchorText" placeholder="e.g. Rent SUV in Hyderabad" required className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Destination Path</label>
              <input name="destinationPath" placeholder="e.g. /fleet/suv" required className="w-full border rounded-lg p-2" />
            </div>
          </div>
          <button type="submit" className="inline-block bg-black text-white px-4 py-2 rounded-lg font-medium">Create Link</button>
        </form>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 font-medium text-sm">Source Page</th>
              <th className="p-4 font-medium text-sm">Anchor Text</th>
              <th className="p-4 font-medium text-sm">Destination</th>
              <th className="p-4 font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {links.map(l => (
              <tr key={l.id} className="border-b border-gray-50">
                <td className="p-4 text-sm font-medium">{l.sourcePath}</td>
                <td className="p-4 text-sm text-gray-500">{l.anchorText}</td>
                <td className="p-4 text-sm text-gray-500">{l.destinationPath}</td>
                <td className="p-4">
                  <form action={deleteInternalLinkAction}>
                    <input type="hidden" name="id" value={l.id} />
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



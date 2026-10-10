import { getNavigationItems } from '@/lib/data/seo'
import { saveNavigationAction, deleteNavigationAction } from './actions'

export default async function NavigationDashboard() {
  const items = await getNavigationItems()
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Navigation Manager</h1>
      <p className="text-gray-600 mb-8">Manage the main website header navigation. If empty, the static fallback is used.</p>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h2 className="font-bold mb-4">Add Navigation Item</h2>
        <form action={saveNavigationAction} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Label</label>
              <input name="label" placeholder="e.g. Home" required className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">URL / Href</label>
              <input name="href" placeholder="e.g. /" required className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Position (Order)</label>
              <input name="position" type="number" defaultValue="0" required className="w-full border rounded-lg p-2" />
            </div>
          </div>
          <button type="submit" className="inline-block bg-black text-white px-4 py-2 rounded-lg font-medium">Add Item</button>
        </form>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 font-medium text-sm">Order</th>
              <th className="p-4 font-medium text-sm">Label</th>
              <th className="p-4 font-medium text-sm">URL</th>
              <th className="p-4 font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b border-gray-50">
                <td className="p-4 text-sm font-medium">{item.position}</td>
                <td className="p-4 text-sm font-medium">{item.label}</td>
                <td className="p-4 text-sm text-gray-500">{item.href}</td>
                <td className="p-4">
                  <form action={deleteNavigationAction}>
                    <input type="hidden" name="id" value={item.id} />
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


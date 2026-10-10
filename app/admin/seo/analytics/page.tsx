import { requireAdmin } from '@/lib/admin-auth'

export default async function AnalyticsAdminPage() {
  await requireAdmin()

  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const isEnabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true'
  const isDebug = process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true'
  const siteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Analytics & Search Console Status</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Google Analytics 4</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg border">
              <p className="text-sm text-gray-500 font-medium">Tracking Status</p>
              <p className="text-lg font-bold">
                {isEnabled ? <span className="text-green-600">Enabled</span> : <span className="text-gray-600">Disabled</span>}
              </p>
              <p className="text-xs text-gray-400 mt-1">NEXT_PUBLIC_ANALYTICS_ENABLED</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg border">
              <p className="text-sm text-gray-500 font-medium">Measurement ID</p>
              <p className="text-lg font-bold">
                {gaMeasurementId ? <span className="text-blue-600">Configured ({gaMeasurementId})</span> : <span className="text-red-600">Not configured</span>}
              </p>
              <p className="text-xs text-gray-400 mt-1">NEXT_PUBLIC_GA_MEASUREMENT_ID</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border">
              <p className="text-sm text-gray-500 font-medium">Debug Mode</p>
              <p className="text-lg font-bold">
                {isDebug ? <span className="text-orange-600">ON</span> : <span className="text-gray-600">OFF</span>}
              </p>
              <p className="text-xs text-gray-400 mt-1">NEXT_PUBLIC_ANALYTICS_DEBUG</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Note: Do not enable analytics during local development to avoid polluting production data.
          </p>
        </div>

        <hr />

        <div>
          <h2 className="text-xl font-bold mb-4">Google Search Console</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg border">
              <p className="text-sm text-gray-500 font-medium">Verification Token</p>
              <p className="text-lg font-bold">
                {siteVerification ? <span className="text-green-600">Configured</span> : <span className="text-gray-600">Not configured</span>}
              </p>
              <p className="text-xs text-gray-400 mt-1">NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg border">
              <p className="text-sm text-gray-500 font-medium">Sitemap & Robots</p>
              <p className="text-lg font-bold text-green-600">
                Available
              </p>
              <p className="text-xs text-gray-400 mt-1">Generated dynamically</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

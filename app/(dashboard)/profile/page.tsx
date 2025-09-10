export default function ProfilePage() {
  return (
    <div className="min-h-[calc(100vh-64px)] space-y-6">
      <div className="rounded-2xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-500" />
        <div className="p-6 sm:p-8 -mt-10">
          <div className="flex items-end gap-4">
            <div className="h-20 w-20 rounded-full ring-4 ring-white bg-gray-200 grid place-items-center shadow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 0115 0V20H4.5v-.5z" />
              </svg>
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-semibold">Admin User</h1>
              <p className="text-sm text-gray-500">admin@example.com</p>
            </div>
            {/* Edit Profile button removed */}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-6">
          <h2 className="font-semibold mb-4">Account Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
              <input className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500" defaultValue="Admin User" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500" defaultValue="admin@example.com" />
            </div>
          </div>
          <div className="mt-6">
            <button className="rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700">Save Changes</button>
          </div>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-6">
          <h2 className="font-semibold mb-4">Change Password</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current password</label>
              <input type="password" className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500" placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New password</label>
              <input type="password" className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500" placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm password</label>
              <input type="password" className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500" placeholder="••••••••" />
            </div>
          </div>
          <div className="mt-6">
            <button className="rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700">Update Password</button>
          </div>
        </div>
      </div>
    </div>
  );
}



import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[radial-gradient(1200px_600px_at_-10%_-20%,#e0e7ff_0%,transparent_50%),radial-gradient(900px_500px_at_110%_120%,#fae8ff_0%,transparent_50%)]">
      {/* Visual side */}
      <div className="hidden lg:flex relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-500 opacity-90" />
        <svg className="absolute -top-16 -left-16 h-72 w-72 text-white/10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M35.7,-62.5C47.4,-54.9,59.6,-47.1,66.1,-36C72.5,-24.9,73.2,-10.4,71.2,3.3C69.3,17,64.7,29.9,56.6,42.2C48.5,54.5,37,66.2,23.9,70.3C10.9,74.5,-3.6,71.1,-17.4,66.6C-31.2,62.1,-44.3,56.4,-55.4,47.4C-66.6,38.4,-75.9,26.2,-79.5,12C-83.2,-2.2,-81.2,-18.6,-73.2,-31.6C-65.2,-44.6,-51.1,-54.2,-37.2,-61.3C-23.3,-68.3,-11.7,-72.8,0.2,-73.1C12.1,-73.5,24.2,-69.7,35.7,-62.5Z" transform="translate(100 100)" />
        </svg>
        <div className="relative z-10 max-w-md text-white">
          <div className="flex items-center gap-3 mb-6">
            <img src="/file.svg" alt="Company logo" className="h-10 w-10 rounded-lg bg-white/10 p-2" />
            <span className="text-xl font-semibold tracking-wide">Admin Portal</span>
          </div>
          <h2 className="text-4xl font-bold leading-tight">Secure access to your dashboard</h2>
          <p className="mt-4 text-white/80">Manage analytics, users, and configurations with confidence. Optimized for speed and security.</p>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden text-center">
            <img src="/file.svg" alt="Company logo" className="mx-auto mb-4 h-12 w-12" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Portal</h1>
            <p className="text-gray-500">Sign in to continue</p>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-xl p-6 sm:p-8">
            <form className="space-y-6" aria-labelledby="login-title">
              <h2 id="login-title" className="sr-only">Sign in</h2>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  inputMode="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-indigo-600 hover:text-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1"
                    >
                    Forgot?
                    </Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 text-white py-3 px-4 font-medium shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/30 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                Sign in
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">© {new Date().getFullYear()} Admin Portal. Restricted access only.</p>
        </div>
      </div>
    </div>
  );
}
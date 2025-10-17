import Link from "next/link";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold mb-2 text-gray-900">Forgot Password</h1>
        <p className="mb-6 text-gray-600">Enter your email and we&apos;ll send you a reset link.</p>
        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition"
              placeholder="you@company.com"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 text-white py-3 px-4 font-medium shadow-lg hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/30 transition"
          >
            Send reset link
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link href="/login" className="text-indigo-600 hover:underline text-sm">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}

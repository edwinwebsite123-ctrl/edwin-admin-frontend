import Link from "next/link";

export default function AddCoursePage() {
  return (
    <div className="min-h-[calc(100vh-64px)] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Add Course</h1>
          <p className="text-sm text-gray-500">Create a new course by filling the details below.</p>
        </div>
        <Link href="/courses" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
      </div>

      <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input id="title" className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500" placeholder="Course title" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea id="description" rows={4} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500" placeholder="Brief description" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Course Image</label>
            <div className="rounded-lg border border-dashed border-gray-300 p-4 bg-white">
              <input id="image" type="file" accept="image/*" className="block w-full text-sm text-gray-700 file:mr-3 file:rounded-md file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-indigo-700 hover:file:bg-indigo-100" />
              <p className="mt-2 text-xs text-gray-500">PNG, JPG up to ~5MB.</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <button className="rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700">Save</button>
          <Link href="/courses" className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">Cancel</Link>
        </div>
      </div>
    </div>
  );
}



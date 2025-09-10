export default function BlogsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Blogs</h1>
        <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          New Post
        </button>
      </div>

      <div className="rounded-xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2 pr-4">Title</th>
                <th className="py-2 pr-4">Author</th>
                <th className="py-2 pr-4">Date</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                {t: "Mastering React Server Components", a: "Jane Cooper", d: "Sep 08, 2025", s: "Published"},
                {t: "Designing Accessible Forms", a: "Cody Fisher", d: "Sep 06, 2025", s: "Draft"},
                {t: "TypeScript Patterns for APIs", a: "Eleanor Pena", d: "Sep 02, 2025", s: "Published"},
              ].map((row, idx) => (
                <tr key={idx}>
                  <td className="py-2 pr-4">{row.t}</td>
                  <td className="py-2 pr-4">{row.a}</td>
                  <td className="py-2 pr-4">{row.d}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded-full ${row.s === 'Published' ? 'bg-emerald-50 text-emerald-700' : 'bg-yellow-50 text-yellow-700'}`}>{row.s}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}



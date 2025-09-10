export default function PlacementsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Placements</h1>
        <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          New Placement
        </button>
      </div>

      <div className="rounded-xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2 pr-4">Role</th>
                <th className="py-2 pr-4">Company</th>
                <th className="py-2 pr-4">Date</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                {r: "Frontend Developer", c: "NovaTech", d: "Sep 20", s: "Scheduled"},
                {r: "Data Analyst", c: "InsightWorks", d: "Sep 24", s: "Scheduled"},
                {r: "Backend Engineer", c: "Cloudify", d: "Sep 28", s: "Scheduled"},
              ].map((row, idx) => (
                <tr key={idx}>
                  <td className="py-2 pr-4">{row.r}</td>
                  <td className="py-2 pr-4">{row.c}</td>
                  <td className="py-2 pr-4">{row.d}</td>
                  <td className="py-2"><span className="px-2 py-1 rounded-full bg-indigo-50 text-indigo-700">{row.s}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}



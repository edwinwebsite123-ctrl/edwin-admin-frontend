export default function HomeDashboardPage() {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="rounded-xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-4">
          <p className="text-sm text-gray-500">Total Courses</p>
          <p className="text-2xl font-semibold mt-2">48</p>
          <p className="text-xs text-emerald-600 mt-1">+3 new this week</p>
        </div>
        <div className="rounded-xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-4">
          <p className="text-sm text-gray-500">Blog Posts</p>
          <p className="text-2xl font-semibold mt-2">312</p>
          <p className="text-xs text-emerald-600 mt-1">+7 published this month</p>
        </div>
        <div className="rounded-xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-4">
          <p className="text-sm text-gray-500">Teachers</p>
          <p className="text-2xl font-semibold mt-2">26</p>
          <p className="text-xs text-emerald-600 mt-1">2 new onboarded</p>
        </div>
        <div className="rounded-xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-4">
          <p className="text-sm text-gray-500">Placements</p>
          <p className="text-2xl font-semibold mt-2">134</p>
          <p className="text-xs text-emerald-600 mt-1">+12 this quarter</p>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 rounded-xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Recent Blog Posts</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-700">View all</button>
          </div>
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
                <tr>
                  <td className="py-2 pr-4">Mastering React Server Components</td>
                  <td className="py-2 pr-4">Jane Cooper</td>
                  <td className="py-2 pr-4">Sep 08, 2025</td>
                  <td className="py-2"><span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700">Published</span></td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Designing Accessible Forms</td>
                  <td className="py-2 pr-4">Cody Fisher</td>
                  <td className="py-2 pr-4">Sep 06, 2025</td>
                  <td className="py-2"><span className="px-2 py-1 rounded-full bg-yellow-50 text-yellow-700">Draft</span></td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">TypeScript Patterns for APIs</td>
                  <td className="py-2 pr-4">Eleanor Pena</td>
                  <td className="py-2 pr-4">Sep 02, 2025</td>
                  <td className="py-2"><span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700">Published</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-4">
          <h2 className="font-semibold mb-4">Upcoming Placements</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-between">
              <span>Frontend Developer - NovaTech</span>
              <span className="text-gray-500">Sep 20</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Data Analyst - InsightWorks</span>
              <span className="text-gray-500">Sep 24</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Backend Engineer - Cloudify</span>
              <span className="text-gray-500">Sep 28</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="rounded-xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Popular Courses</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-700">Manage</button>
          </div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-between">
              <span>Next.js 15 Deep Dive</span>
              <span className="text-gray-500">1.2k students</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Advanced TypeScript</span>
              <span className="text-gray-500">940 students</span>
            </li>
            <li className="flex items-center justify-between">
              <span>UI/UX for Developers</span>
              <span className="text-gray-500">780 students</span>
            </li>
          </ul>
        </div>
        <div className="xl:col-span-2 rounded-xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Featured Teachers</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-700">View all</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-white">
              <img src="/file.svg" alt="Teacher" className="h-10 w-10 rounded-full" />
              <div>
                <p className="font-medium">Jacob Jones</p>
                <p className="text-gray-500">Full‑stack Engineering</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-white">
              <img src="/file.svg" alt="Teacher" className="h-10 w-10 rounded-full" />
              <div>
                <p className="font-medium">Theresa Webb</p>
                <p className="text-gray-500">Data Science</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-white">
              <img src="/file.svg" alt="Teacher" className="h-10 w-10 rounded-full" />
              <div>
                <p className="font-medium">Albert Flores</p>
                <p className="text-gray-500">UI/UX</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-white">
              <img src="/file.svg" alt="Teacher" className="h-10 w-10 rounded-full" />
              <div>
                <p className="font-medium">Courtney Henry</p>
                <p className="text-gray-500">DevOps</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}



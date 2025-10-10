import Link from "next/link";

export default function HomeDashboardPage() {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="rounded-xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Courses</p>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5.25A2.25 2.25 0 015.25 3h8.5A2.25 2.25 0 0116 5.25V19.5a.75.75 0 01-1.16.628L10 17.25l-4.84 2.878A.75.75 0 014 19.5V5.25z" />
            </svg>
          </div>
          <p className="text-2xl font-semibold mt-2">48</p>
        </div>

        <div className="rounded-xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Admission Leads</p>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          </div>
          <p className="text-2xl font-semibold mt-2">312</p>
        </div>

        <div className="rounded-xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Teachers</p>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 0115 0V20H4.5v-.5z" />
            </svg>
          </div>
          <p className="text-2xl font-semibold mt-2">26</p>
        </div>

        <div className="rounded-xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Placements</p>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 7.5A2.25 2.25 0 014.5 5.25h15a2.25 2.25 0 012.25 2.25v1.5H2.25V7.5zM2.25 12h19.5v4.5A2.25 2.25 0 0119.5 18.75h-15A2.25 2.25 0 012.25 16.5V12z" />
            </svg>
          </div>
          <p className="text-2xl font-semibold mt-2">134</p>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 rounded-xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Recent Admission Leads</h2>
            <Link href="/admission-leads" className="text-sm text-indigo-600 hover:text-indigo-700">
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-2 pr-4">Full Name</th>
                  <th className="py-2 pr-4">Email Address</th>
                  <th className="py-2 pr-4">Mobile Number</th>
                  <th className="py-2">Course Interested In</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-2 pr-4">John Doe</td>
                  <td className="py-2 pr-4">john@example.com</td>
                  <td className="py-2 pr-4">9876543210</td>
                  <td className="py-2">MBA</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Jane Smith</td>
                  <td className="py-2 pr-4">jane@example.com</td>
                  <td className="py-2 pr-4">9123456789</td>
                  <td className="py-2">BSc Computer Science</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-4">
          <h2 className="font-semibold mb-4">Placements</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-between">
              <span>Ava Carter - NovaTech</span>
              <span className="text-gray-500">Sep 20</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Liam Patel - InsightWorks</span>
              <span className="text-gray-500">Sep 24</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Mia Chen - Cloudify</span>
              <span className="text-gray-500">Sep 28</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="rounded-xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Courses</h2>
            <Link href="/courses" className="text-sm text-indigo-600 hover:text-indigo-700">
              Manage
            </Link>
          </div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-between">
              <span>Next.js 15 Deep Dive</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Advanced TypeScript</span>
            </li>
            <li className="flex items-center justify-between">
              <span>UI/UX for Developers</span>
            </li>
          </ul>
        </div>
        <div className="xl:col-span-2 rounded-xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Teachers</h2>
            <Link href="/teachers" className="text-sm text-indigo-600 hover:text-indigo-700">
              View all
            </Link>
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



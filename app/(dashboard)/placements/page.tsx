"use client";

import { useState } from "react";

export default function PlacementsPage() {
  const placements = [
    {
      student: "Ava Carter",
      role: "Frontend Developer",
      company: "NovaTech",
      date: "Sep 20, 2025",
      status: "Placed",
      photo: "", // No photo to show skeleton avatar
    },
    {
      student: "Liam Patel",
      role: "Data Analyst",
      company: "InsightWorks",
      date: "Sep 24, 2025",
      status: "Placed",
      photo: "/file.svg",
    },
    {
      student: "Mia Chen",
      role: "Backend Engineer",
      company: "Cloudify",
      date: "Sep 28, 2025",
      status: "Placed",
      photo: "", // No photo to show skeleton avatar
    },
  ];

  const [search, setSearch] = useState("");

  const filteredPlacements = placements.filter(
    (row) =>
      row.student.toLowerCase().includes(search.toLowerCase()) ||
      row.role.toLowerCase().includes(search.toLowerCase()) ||
      row.company.toLowerCase().includes(search.toLowerCase()) ||
      row.date.toLowerCase().includes(search.toLowerCase()) ||
      row.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Placements</h1>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search placements..."
            className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            New Placement
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2 pr-4">Photo</th>
                <th className="py-2 pr-4">Student</th>
                <th className="py-2 pr-4">Role</th>
                <th className="py-2 pr-4">Company</th>
                <th className="py-2 pr-4">Date</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPlacements.map((row, idx) => (
                <tr key={idx}>
                  <td className="py-2 pr-4">
                    {row.photo ? (
                      <img
                        src={row.photo}
                        alt={row.student}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                          />
                        </svg>
                      </div>
                    )}
                  </td>
                  <td className="py-2 pr-4">{row.student}</td>
                  <td className="py-2 pr-4">{row.role}</td>
                  <td className="py-2 pr-4">{row.company}</td>
                  <td className="py-2 pr-4">{row.date}</td>
                  <td className="py-2">
                    <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700">{row.status}</span>
                  </td>
                </tr>
              ))}
              {filteredPlacements.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray-400">
                    No placements found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
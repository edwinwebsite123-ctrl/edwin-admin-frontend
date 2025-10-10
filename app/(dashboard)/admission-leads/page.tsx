"use client";

import { useState } from "react";

export default function AdmissionLeadsPage() {
  const leads = [
    {
      name: "John Doe",
      email: "john@example.com",
      mobile: "9876543210",
      course: "MBA",
      message: "Interested in scholarship options.",
      submittedAt: "2025-10-10 09:30",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      mobile: "9123456789",
      course: "BSc Computer Science",
      message: "",
      submittedAt: "2025-10-09 14:15",
    },
  ];

  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("");

  // Get unique courses for filter dropdown
  const courseOptions = Array.from(new Set(leads.map(l => l.course))).filter(Boolean);

  const filteredLeads = leads.filter(
    (lead) =>
      (lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase()) ||
        lead.mobile.includes(search) ||
        (lead.course && lead.course.toLowerCase().includes(search.toLowerCase())))
      &&
      (courseFilter === "" || lead.course === courseFilter)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-lg font-semibold">Admission Leads</h1>
        <div className="flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads..."
            className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Courses</option>
            {courseOptions.map((course) => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2 pr-4">Full Name</th>
                <th className="py-2 pr-4">Email Address</th>
                <th className="py-2 pr-4">Mobile Number</th>
                <th className="py-2 pr-4">Course Interested In</th>
                <th className="py-2 pr-4">Message / Query</th>
                <th className="py-2">Submitted At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLeads.map((lead, idx) => (
                <tr key={idx}>
                  <td className="py-2 pr-4">{lead.name}</td>
                  <td className="py-2 pr-4">{lead.email}</td>
                  <td className="py-2 pr-4">{lead.mobile}</td>
                  <td className="py-2 pr-4">{lead.course || "-"}</td>
                  <td className="py-2 pr-4">{lead.message || <span className="italic text-gray-400">No message</span>}</td>
                  <td className="py-2">{lead.submittedAt}</td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray-400">
                    No admission leads found.
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
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface DashboardCounts {
  total_applications: number;
}

interface Lead {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  interested_course: string;
  created_at: string;
}

export default function HomeDashboardPage() {
  const [counts, setCounts] = useState<DashboardCounts | null>(null);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch counts
        const countsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboard/counts/`,
          {
            method: "GET",
            headers: {
              Authorization: `Token ${localStorage.getItem("authToken")}`,
            },
          }
        );

        // Fetch recent leads (last 5)
        const leadsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboard/recent-leads/`,
          {
            method: "GET",
            headers: {
              Authorization: `Token ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (countsResponse.ok && leadsResponse.ok) {
          const countsData = await countsResponse.json();
          const leadsData = await leadsResponse.json();
          
          setCounts(countsData);
          setRecentLeads(leadsData);
        } else {
          throw new Error("Failed to fetch dashboard data");
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Admission Leads Skeleton */}
          <div className="rounded-xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-4">
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-8 w-16 bg-gray-200 rounded mt-2 animate-pulse"></div>
          </div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 rounded-xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="h-5 w-40 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex justify-between py-2">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <svg className="w-12 h-12 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className="text-lg font-medium text-red-800 mb-2">Unable to load dashboard</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Admission Leads Card */}
        <div className="rounded-xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Admission Leads</p>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          </div>
          <p className="text-2xl font-semibold mt-2">
            {counts?.total_applications ?? 0}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Total applications received
          </p>
        </div>

        {/* Additional cards can be uncommented and integrated similarly */}
        {/* 
        <div className="rounded-xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Courses</p>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5.25A2.25 2.25 0 015.25 3h8.5A2.25 2.25 0 0116 5.25V19.5a.75.75 0 01-1.16.628L10 17.25l-4.84 2.878A.75.75 0 014 19.5V5.25z" />
            </svg>
          </div>
          <p className="text-2xl font-semibold mt-2">48</p>
        </div>
        */}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 rounded-xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Recent Admission Leads</h2>
            <Link 
              href="/admission-leads" 
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
            >
              View all
            </Link>
          </div>
          
          {recentLeads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-100">
                    <th className="py-3 pr-4 font-medium">Full Name</th>
                    <th className="py-3 pr-4 font-medium">Email Address</th>
                    <th className="py-3 pr-4 font-medium">Mobile Number</th>
                    <th className="py-3 pr-4 font-medium">Course Interested In</th>
                    <th className="py-3 font-medium">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 pr-4 font-medium text-gray-900">
                        {lead.first_name} {lead.last_name}
                      </td>
                      <td className="py-3 pr-4 text-gray-600">{lead.email}</td>
                      <td className="py-3 pr-4 text-gray-600">{lead.mobile_number}</td>
                      <td className="py-3 pr-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {lead.interested_course}
                        </span>
                      </td>
                      <td className="py-3 text-gray-500 text-xs">
                        {formatDate(lead.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500">No admission leads yet</p>
              <p className="text-gray-400 text-sm mt-1">Applications will appear here once submitted</p>
            </div>
          )}
        </div>

        {/* Additional sections can be uncommented and integrated similarly */}
        {/*
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
        */}
      </section>

      {/* Additional sections can be uncommented and integrated similarly */}
      {/*
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
          </div>
        </div>
      </section>
      */}
    </>
  );
}
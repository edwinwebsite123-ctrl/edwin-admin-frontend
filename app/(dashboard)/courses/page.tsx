"use client";

import { useState } from "react";

export default function CoursesPage() {
  const courses = [
    { id: 1, title: "Next.js 15 Deep Dive", description: "Build modern apps with app router and server components.", image: "/window.svg" },
    { id: 2, title: "Advanced TypeScript", description: "Types, generics, and patterns for scalable code.", image: "/file.svg" },
    { id: 3, title: "UI/UX for Developers", description: "Design beautiful, accessible interfaces.", image: "/globe.svg" },
    { id: 4, title: "React Performance", description: "Profiling, memoization, and rendering strategies.", image: "/next.svg" },
    { id: 5, title: "Node.js APIs", description: "Build robust REST and GraphQL services.", image: "/file.svg" },
    { id: 6, title: "Data Visualization", description: "Charts and dashboards with best practices.", image: "/globe.svg" },
  ];

  const [search, setSearch] = useState("");

  const filteredCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-64px)] space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Courses</h1>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <a href="/courses/add" className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium shadow-lg shadow-indigo-600/30 hover:bg-indigo-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Course
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((c) => (
            <div key={c.id} className="group overflow-hidden rounded-2xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
              <div className="relative">
                <img src={c.image} alt={c.title} className="h-44 w-full object-cover bg-gray-100" />
                <button className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-lg bg-white/90 px-2.5 py-1.5 text-xs font-medium text-gray-800 border border-gray-200 hover:bg-white shadow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.313 3 21l1.687-4.5L16.862 3.487z" />
                  </svg>
                  Edit
                </button>
              </div>
              <div className="p-4">
                <p className="font-medium text-gray-900">{c.title}</p>
                <p className="mt-1 text-sm text-gray-500">{c.description}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-gray-400">
            No courses found.
          </div>
        )}
      </div>
    </div>
  );
}
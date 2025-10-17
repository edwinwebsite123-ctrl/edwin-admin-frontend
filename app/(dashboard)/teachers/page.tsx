"use client";

import { useState } from "react";
import Image from "next/image"; // ✅ Import Next.js Image

export default function TeachersPage() {
  const teachers = [
    "Jacob Jones",
    "Theresa Webb",
    "Albert Flores",
    "Courtney Henry",
    "Devon Lane",
    "Darrell Steward",
  ];

  const [search, setSearch] = useState("");

  const filteredTeachers = teachers.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Teachers</h1>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search teachers..."
            className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Teacher
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredTeachers.length > 0 ? (
          filteredTeachers.map((name) => (
            <div
              key={name}
              className="flex items-center gap-3 p-4 rounded-xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60"
            >
              {/* ✅ Use Next.js Image instead of <img> */}
              <Image
                src="/file.svg"
                alt="Teacher"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{name}</p>
                <p className="text-sm text-gray-500">Department • Subject</p>
              </div>
              <div className="ml-auto flex gap-2 text-sm">
                <button className="px-2 py-1 rounded border border-gray-200 bg-white hover:bg-gray-50">
                  Edit
                </button>
                <button className="px-2 py-1 rounded border border-gray-200 bg-white hover:bg-gray-50">
                  View
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-gray-400">
            No teachers found.
          </div>
        )}
      </div>
    </div>
  );
}

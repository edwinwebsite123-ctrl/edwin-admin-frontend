"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

interface PGProgram {
  id: number;
  code: string;
  name: string;
  subtitle: string;
  description: string;
  duration: string;
  specializations: string[];
  eligibility: string;
  students: string;
  modules: number;
  rating: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export default function PGProgramsPage() {
  const [pgPrograms, setPgPrograms] = useState<PGProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPGPrograms();
  }, []);

  const fetchPGPrograms = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pg-programs/`);
      if (response.ok) {
        const data = await response.json();
        setPgPrograms(data);
      }
    } catch (error) {
      console.error("Error fetching PG programs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this PG program?")) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pg-programs/${id}/delete/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.ok) {
        setPgPrograms(pgPrograms.filter(program => program.id !== id));
      } else {
        alert("Failed to delete PG program");
      }
    } catch (error) {
      console.error("Error deleting PG program:", error);
      alert("Error deleting PG program");
    }
  };

  const filteredPGPrograms = pgPrograms.filter(
    (program) =>
      program.name.toLowerCase().includes(search.toLowerCase()) ||
      program.code.toLowerCase().includes(search.toLowerCase()) ||
      program.subtitle.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">PG Programs</h1>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search PG programs..."
            className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Link
            href="/pg-programs/add"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700"
          >
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add PG Program
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">Image</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">Code</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">Duration</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">Rating</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPGPrograms.length > 0 ? (
              filteredPGPrograms.map((program) => (
                <tr key={program.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3">
                    <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-100">
                      {program.image ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${program.image}`}
                          alt={program.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                          <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900">{program.code}</td>
                  <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900">{program.name}</td>
                  <td className="border border-gray-200 px-4 py-3 text-sm text-gray-500">{program.duration}</td>
                  <td className="border border-gray-200 px-4 py-3 text-sm text-gray-500">{program.rating} ⭐</td>
                  <td className="border border-gray-200 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/pg-programs/${program.id}`}
                        className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100"
                      >
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                      </Link>
                      <Link
                        href={`/pg-programs/${program.id}/edit`}
                        className="inline-flex items-center gap-1 rounded-lg bg-yellow-50 px-3 py-1.5 text-xs font-medium text-yellow-700 hover:bg-yellow-100"
                      >
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(program.id)}
                        className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100"
                      >
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="border border-gray-200 px-4 py-12 text-center text-gray-400">
                  No PG programs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

interface EdwinTalk {
  id: number;
  title: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export default function EdwinTalksPage() {
  const [edwinTalks, setEdwinTalks] = useState<EdwinTalk[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEdwinTalks();
  }, []);

  const fetchEdwinTalks = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/edwintalks/`);
      if (response.ok) {
        const data = await response.json();
        setEdwinTalks(data);
      }
    } catch (error) {
      console.error("Error fetching Edwin talks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this Edwin talk?")) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/edwintalks/${id}/delete/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.ok) {
        setEdwinTalks(edwinTalks.filter(talk => talk.id !== id));
      } else {
        alert("Failed to delete Edwin talk");
      }
    } catch (error) {
      console.error("Error deleting Edwin talk:", error);
      alert("Error deleting Edwin talk");
    }
  };

  const filteredEdwinTalks = edwinTalks.filter(
    (talk) =>
      talk.title.toLowerCase().includes(search.toLowerCase())
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-lg font-semibold">Edwin Talks</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Edwin talks..."
            className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Link
            href="/edwin-talks/add"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700 whitespace-nowrap"
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
            Add Edwin Talk
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">Image</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">Title</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">Created</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEdwinTalks.length > 0 ? (
              filteredEdwinTalks.map((talk) => (
                <tr key={talk.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3">
                    <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-100">
                      {talk.image ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${talk.image}`}
                          alt={talk.title}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                          <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900">{talk.title}</td>
                  <td className="border border-gray-200 px-4 py-3 text-sm text-gray-500">{new Date(talk.created_at).toLocaleDateString()}</td>
                  <td className="border border-gray-200 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/edwin-talks/${talk.id}`}
                        className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100"
                      >
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                      </Link>
                      <Link
                        href={`/edwin-talks/${talk.id}/edit`}
                        className="inline-flex items-center gap-1 rounded-lg bg-yellow-50 px-3 py-1.5 text-xs font-medium text-yellow-700 hover:bg-yellow-100"
                      >
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(talk.id)}
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
                <td colSpan={4} className="border border-gray-200 px-4 py-12 text-center text-gray-400">
                  No Edwin talks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
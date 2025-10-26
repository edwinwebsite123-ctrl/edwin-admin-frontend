"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
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

export default function ViewPGProgramPage() {
  const params = useParams();
  const router = useRouter();
  const [pgProgram, setPgProgram] = useState<PGProgram | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchPGProgram();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const fetchPGProgram = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pg-programs/${params.id}/`);
      if (response.ok) {
        const data = await response.json();
        setPgProgram(data);
      } else if (response.status === 404) {
        router.push("/pg-programs");
      }
    } catch (error) {
      console.error("Error fetching PG program:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!pgProgram) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900">PG program not found</h2>
          <p className="text-gray-500">The PG program you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/pg-programs" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700">
            Back to PG Programs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">View PG Program</h1>
          <p className="text-sm text-gray-500">PG program details and information.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/pg-programs/${pgProgram.id}/edit`}
            className="inline-flex items-center gap-2 rounded-lg bg-yellow-600 text-white px-4 py-2 text-sm font-medium hover:bg-yellow-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </Link>
          <Link href="/pg-programs" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{pgProgram.name} ({pgProgram.code})</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-500">Subtitle</label>
                <p className="text-sm text-gray-900">{pgProgram.subtitle}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Duration</label>
                <p className="text-sm text-gray-900">{pgProgram.duration}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Students</label>
                <p className="text-sm text-gray-900">{pgProgram.students}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Modules</label>
                <p className="text-sm text-gray-900">{pgProgram.modules}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Rating</label>
                <p className="text-sm text-gray-900">{pgProgram.rating} ⭐</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-500 mb-2">Description</label>
              <p className="text-sm text-gray-900 whitespace-pre-wrap">{pgProgram.description}</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-500 mb-2">Eligibility</label>
              <p className="text-sm text-gray-900 whitespace-pre-wrap">{pgProgram.eligibility}</p>
            </div>
          </div>

          {/* Specializations */}
          {pgProgram.specializations && pgProgram.specializations.length > 0 && (
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Specializations</h3>
              <div className="flex flex-wrap gap-2">
                {pgProgram.specializations.map((specialization, index) => (
                  <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {specialization}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Image */}
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Program Image</h3>
            <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-100">
              {pgProgram.image ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${pgProgram.image}`}
                  alt={pgProgram.name}
                  width={400}
                  height={225}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                  <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Metadata */}
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Metadata</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-500">Created</label>
                <p className="text-sm text-gray-900">{new Date(pgProgram.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Last Updated</label>
                <p className="text-sm text-gray-900">{new Date(pgProgram.updated_at).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Program ID</label>
                <p className="text-sm text-gray-900 font-mono">{pgProgram.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
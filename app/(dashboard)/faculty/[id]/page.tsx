"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Faculty {
  id: number;
  name: string;
  title: string;
  faculty_image: string;
  bg_image: string;
  created_at: string;
  updated_at: string;
}

export default function ViewFacultyPage() {
  const params = useParams();
  const router = useRouter();
  const [faculty, setFaculty] = useState<Faculty | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchFaculty();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const fetchFaculty = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/faculty/${params.id}/`);
      if (response.ok) {
        const data = await response.json();
        setFaculty(data);
      } else if (response.status === 404) {
        router.push("/faculty");
      }
    } catch (error) {
      console.error("Error fetching faculty:", error);
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

  if (!faculty) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900">Faculty member not found</h2>
          <p className="text-gray-500">The faculty member you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/faculty" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700">
            Back to Faculty
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">View Faculty</h1>
          <p className="text-sm text-gray-500">Faculty member details and information.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/faculty/${faculty.id}/edit`}
            className="inline-flex items-center gap-2 rounded-lg bg-yellow-600 text-white px-4 py-2 text-sm font-medium hover:bg-yellow-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </Link>
          <Link href="/faculty" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">
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
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{faculty.name}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Title</label>
                <p className="text-sm text-gray-900">{faculty.title}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Faculty Image */}
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Faculty Image</h3>
            <div className="aspect-square w-full rounded-full overflow-hidden bg-gray-100">
              {faculty.faculty_image ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${faculty.faculty_image}`}
                  alt={faculty.name}
                  width={200}
                  height={200}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                  <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Background Image */}
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Background Image</h3>
            <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-100">
              {faculty.bg_image ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${faculty.bg_image}`}
                  alt="Background"
                  width={400}
                  height={225}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                  <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
                <p className="text-sm text-gray-900">{new Date(faculty.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Last Updated</label>
                <p className="text-sm text-gray-900">{new Date(faculty.updated_at).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Faculty ID</label>
                <p className="text-sm text-gray-900 font-mono">{faculty.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
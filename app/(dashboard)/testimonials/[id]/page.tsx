"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Testimonial {
  id: number;
  text: string;
  name: string;
  role: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export default function ViewTestimonialPage() {
  const params = useParams();
  const router = useRouter();
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchTestimonial();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const fetchTestimonial = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/testimonials/${params.id}/`);
      if (response.ok) {
        const data = await response.json();
        setTestimonial(data);
      } else if (response.status === 404) {
        router.push("/testimonials");
      }
    } catch (error) {
      console.error("Error fetching testimonial:", error);
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

  if (!testimonial) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900">Testimonial not found</h2>
          <p className="text-gray-500">The testimonial you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/testimonials" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700">
            Back to Testimonials
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">View Testimonial</h1>
          <p className="text-sm text-gray-500">Testimonial details and information.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/testimonials/${testimonial.id}/edit`}
            className="inline-flex items-center gap-2 rounded-lg bg-yellow-600 text-white px-4 py-2 text-sm font-medium hover:bg-yellow-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </Link>
          <Link href="/testimonials" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">
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
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{testimonial.name}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-500">Role</label>
                <p className="text-sm text-gray-900">{testimonial.role}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Testimonial</label>
              <p className="text-sm text-gray-900 whitespace-pre-wrap">{testimonial.text}</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Image */}
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Image</h3>
            <div className="aspect-square w-full rounded-full overflow-hidden bg-gray-100">
              {testimonial.image ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${testimonial.image}`}
                  alt={testimonial.name}
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

          {/* Metadata */}
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Metadata</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-500">Created</label>
                <p className="text-sm text-gray-900">{new Date(testimonial.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Last Updated</label>
                <p className="text-sm text-gray-900">{new Date(testimonial.updated_at).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Testimonial ID</label>
                <p className="text-sm text-gray-900 font-mono">{testimonial.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
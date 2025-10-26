"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Module {
  title: string;
  content: string[];
}

interface Course {
  id: string;
  title: string;
  short_description: string;
  category: string;
  duration: string;
  level: string;
  mode: string;
  certification: string;
  image: string;
  overview: string;
  modules: Module[];
  career_opportunities: string[];
  tools: string[];
  highlights: string[];
  created_at: string;
  updated_at: string;
}

export default function ViewCoursePage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchCourse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const fetchCourse = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/${params.id}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCourse(data);
      } else if (response.status === 404) {
        router.push("/courses");
      } else if (response.status === 401) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        router.push("/login");
      }
    } catch (error) {
      console.error("Error fetching course:", error);
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

  if (!course) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900">Course not found</h2>
          <p className="text-gray-500">The course you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/courses" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">View Course</h1>
          <p className="text-sm text-gray-500">Course details and information.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/courses/${course.id}/edit`}
            className="inline-flex items-center gap-2 rounded-lg bg-yellow-600 text-white px-4 py-2 text-sm font-medium hover:bg-yellow-700"
          >
            Edit
          </Link>
          <Link href="/courses" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">
            Back
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{course.title}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-500">Category</label>
                <p className="text-sm text-gray-900">{course.category}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Duration</label>
                <p className="text-sm text-gray-900">{course.duration}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Level</label>
                <p className="text-sm text-gray-900">{course.level}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Mode</label>
                <p className="text-sm text-gray-900">{course.mode}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Certification</label>
                <p className="text-sm text-gray-900">{course.certification}</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-500 mb-2">Short Description</label>
              <p className="text-sm text-gray-900">{course.short_description}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Overview</label>
              <p className="text-sm text-gray-900 whitespace-pre-wrap">{course.overview}</p>
            </div>
          </div>

          {/* Modules */}
          {course.modules && course.modules.length > 0 && (
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Modules</h3>
              <div className="space-y-4">
                {course.modules.map((module, index) => (
                  <div key={index} className="p-3 border rounded-lg bg-gray-50">
                    <h4 className="font-semibold text-gray-800 mb-2">{module.title}</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {Array.isArray(module.content) && module.content.length > 0 ? (
                        module.content.map((topic, idx) => <li key={idx}>{topic}</li>)
                      ) : (
                        <li className="text-gray-500 italic">No topics available</li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Career Opportunities */}
          {course.career_opportunities && course.career_opportunities.length > 0 && (
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Career Opportunities</h3>
              <div className="flex flex-wrap gap-2">
                {course.career_opportunities.map((opportunity, index) => (
                  <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    {opportunity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tools */}
          {course.tools && course.tools.length > 0 && (
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tools</h3>
              <div className="flex flex-wrap gap-2">
                {course.tools.map((tool, index) => (
                  <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Highlights */}
          {course.highlights && course.highlights.length > 0 && (
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Highlights</h3>
              <ul className="space-y-2">
                {course.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-sm text-gray-900">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Image */}
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Image</h3>
            <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-100">
              {course.image ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${course.image}`}
                  alt={course.title}
                  width={400}
                  height={225}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                  No Image
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
                <p className="text-sm text-gray-900">{new Date(course.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Last Updated</label>
                <p className="text-sm text-gray-900">{new Date(course.updated_at).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Course ID</label>
                <p className="text-sm text-gray-900 font-mono">{course.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

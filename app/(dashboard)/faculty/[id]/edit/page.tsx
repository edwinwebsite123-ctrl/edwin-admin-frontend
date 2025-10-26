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

export default function EditFacultyPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [faculty, setFaculty] = useState<Faculty | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    faculty_image: null as File | null,
    bg_image: null as File | null,
  });

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
        setFormData({
          name: data.name,
          title: data.title,
          faculty_image: null,
          bg_image: null,
        });
      } else if (response.status === 404) {
        router.push("/faculty");
      }
    } catch (error) {
      console.error("Error fetching faculty:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files?.[0] || null;
    setFormData(prev => ({ ...prev, [name]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("title", formData.title);

      if (formData.faculty_image) {
        data.append("faculty_image", formData.faculty_image);
      }
      if (formData.bg_image) {
        data.append("bg_image", formData.bg_image);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/faculty/update/${params.id}/`, {
        method: "PUT",
        headers: {
          Authorization: `Token ${localStorage.getItem("authToken")}`,
        },
        body: data,
      });

      if (response.ok) {
        router.push(`/faculty/${params.id}`);
      } else {
        const error = await response.json();
        alert(`Failed to update faculty member: ${JSON.stringify(error)}`);
      }
    } catch (error) {
      console.error("Error updating faculty member:", error);
      alert("Error updating faculty member");
    } finally {
      setSaving(false);
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
          <h1 className="text-lg font-semibold">Edit Faculty</h1>
          <p className="text-sm text-gray-500">Update faculty member information and images.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/faculty/${faculty.id}`}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View
          </Link>
          <Link href="/faculty" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
              placeholder="Faculty member's full name"
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
              placeholder="e.g., Professor, Lecturer"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="faculty_image" className="block text-sm font-medium text-gray-700 mb-1">Faculty Image</label>
            <div className="rounded-lg border border-dashed border-gray-300 p-4 bg-white">
              <input
                id="faculty_image"
                name="faculty_image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-700 file:mr-3 file:rounded-md file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              <p className="mt-2 text-xs text-gray-500">PNG, JPG up to ~5MB. Leave empty to keep current image.</p>
              {faculty.faculty_image && (
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-2">Current image:</p>
                  <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${faculty.faculty_image}`}
                      alt="Current faculty image"
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="bg_image" className="block text-sm font-medium text-gray-700 mb-1">Background Image</label>
            <div className="rounded-lg border border-dashed border-gray-300 p-4 bg-white">
              <input
                id="bg_image"
                name="bg_image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-700 file:mr-3 file:rounded-md file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              <p className="mt-2 text-xs text-gray-500">PNG, JPG up to ~5MB. Leave empty to keep current image.</p>
              {faculty.bg_image && (
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-2">Current background:</p>
                  <div className="h-16 w-24 rounded overflow-hidden bg-gray-100">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${faculty.bg_image}`}
                      alt="Current background image"
                      width={96}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving && <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
            Update Faculty Member
          </button>
          <Link href={`/faculty/${faculty.id}`} className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
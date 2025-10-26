"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Placement {
  id: number;
  name: string;
  role: string;
  company: string;
  company_logo: string;
  student_image: string;
  background_image: string;
  created_at: string;
  updated_at: string;
}

export default function EditPlacementPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [placement, setPlacement] = useState<Placement | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    company_logo: null as File | null,
    student_image: null as File | null,
    background_image: null as File | null,
  });

  useEffect(() => {
    if (params.id) {
      fetchPlacement();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const fetchPlacement = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/placements/${params.id}/`);
      if (response.ok) {
        const data = await response.json();
        setPlacement(data);
        setFormData({
          name: data.name,
          role: data.role,
          company: data.company,
          company_logo: null,
          student_image: null,
          background_image: null,
        });
      } else if (response.status === 404) {
        router.push("/placements");
      }
    } catch (error) {
      console.error("Error fetching placement:", error);
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
      data.append("role", formData.role);
      data.append("company", formData.company);

      if (formData.company_logo) {
        data.append("company_logo", formData.company_logo);
      }
      if (formData.student_image) {
        data.append("student_image", formData.student_image);
      }
      if (formData.background_image) {
        data.append("background_image", formData.background_image);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/placements/${params.id}/update/`, {
        method: "PUT",
        headers: {
          Authorization: `Token ${localStorage.getItem("authToken")}`,
        },
        body: data,
      });

      if (response.ok) {
        router.push(`/placements/${params.id}`);
      } else {
        const error = await response.json();
        alert(`Failed to update placement: ${JSON.stringify(error)}`);
      }
    } catch (error) {
      console.error("Error updating placement:", error);
      alert("Error updating placement");
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

  if (!placement) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900">Placement not found</h2>
          <p className="text-gray-500">The placement you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/placements" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700">
            Back to Placements
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Edit Placement</h1>
          <p className="text-sm text-gray-500">Update placement information and images.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/placements/${placement.id}`}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View
          </Link>
          <Link href="/placements" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">
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
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Student Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
              placeholder="Student full name"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role/Position *</label>
            <input
              id="role"
              name="role"
              type="text"
              required
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
              placeholder="e.g., Software Engineer"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
            <input
              id="company"
              name="company"
              type="text"
              required
              value={formData.company}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
              placeholder="Company name"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="student_image" className="block text-sm font-medium text-gray-700 mb-1">Student Image</label>
            <div className="rounded-lg border border-dashed border-gray-300 p-4 bg-white">
              <input
                id="student_image"
                name="student_image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-700 file:mr-3 file:rounded-md file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              <p className="mt-2 text-xs text-gray-500">PNG, JPG up to ~5MB. Leave empty to keep current image.</p>
              {placement.student_image && (
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-2">Current image:</p>
                  <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-100">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${placement.student_image}`}
                      alt="Current student image"
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="company_logo" className="block text-sm font-medium text-gray-700 mb-1">Company Logo</label>
            <div className="rounded-lg border border-dashed border-gray-300 p-4 bg-white">
              <input
                id="company_logo"
                name="company_logo"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-700 file:mr-3 file:rounded-md file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              <p className="mt-2 text-xs text-gray-500">PNG, JPG up to ~5MB. Leave empty to keep current logo.</p>
              {placement.company_logo && (
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-2">Current logo:</p>
                  <div className="h-12 w-12 rounded overflow-hidden bg-gray-100">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${placement.company_logo}`}
                      alt="Current company logo"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="background_image" className="block text-sm font-medium text-gray-700 mb-1">Background Image</label>
            <div className="rounded-lg border border-dashed border-gray-300 p-4 bg-white">
              <input
                id="background_image"
                name="background_image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-700 file:mr-3 file:rounded-md file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              <p className="mt-2 text-xs text-gray-500">PNG, JPG up to ~5MB. Leave empty to keep current image.</p>
              {placement.background_image && (
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-2">Current background:</p>
                  <div className="h-16 w-24 rounded overflow-hidden bg-gray-100">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${placement.background_image}`}
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
            Update Placement
          </button>
          <Link href={`/placements/${placement.id}`} className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
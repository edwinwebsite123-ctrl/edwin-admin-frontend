"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddFacultyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    faculty_image: null as File | null,
    bg_image: null as File | null,
  });

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
    setLoading(true);

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

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/faculty/create/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("authToken")}`,
        },
        body: data,
      });

      if (response.ok) {
        router.push("/faculty");
      } else {
        const error = await response.json();
        alert(`Failed to create faculty member: ${JSON.stringify(error)}`);
      }
    } catch (error) {
      console.error("Error creating faculty member:", error);
      alert("Error creating faculty member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Add Faculty</h1>
          <p className="text-sm text-gray-500">Create a new faculty member by filling the details below.</p>
        </div>
        <Link href="/faculty" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
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
              <p className="mt-2 text-xs text-gray-500">PNG, JPG up to ~5MB.</p>
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
              <p className="mt-2 text-xs text-gray-500">PNG, JPG up to ~5MB.</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading && <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
            Save Faculty Member
          </button>
          <Link href="/faculty" className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
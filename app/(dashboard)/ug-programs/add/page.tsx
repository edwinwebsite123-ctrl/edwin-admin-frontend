"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddUGProgramPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    subtitle: "",
    description: "",
    duration: "",
    specializations: "",
    eligibility: "",
    students: "",
    modules: "",
    rating: "",
    image: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("code", formData.code);
      data.append("name", formData.name);
      data.append("subtitle", formData.subtitle);
      data.append("description", formData.description);
      data.append("duration", formData.duration);

      // Convert comma-separated string to array
      if (formData.specializations) {
        data.append("specializations", JSON.stringify(formData.specializations.split(",").map(s => s.trim())));
      }

      data.append("eligibility", formData.eligibility);
      data.append("students", formData.students);
      data.append("modules", formData.modules);
      data.append("rating", formData.rating);

      if (formData.image) {
        data.append("image", formData.image);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ug-programs/create/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("authToken")}`,
        },
        body: data,
      });

      if (response.ok) {
        router.push("/ug-programs");
      } else {
        const error = await response.json();
        alert(`Failed to create UG program: ${JSON.stringify(error)}`);
      }
    } catch (error) {
      console.error("Error creating UG program:", error);
      alert("Error creating UG program");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Add UG Program</h1>
          <p className="text-sm text-gray-500">Create a new undergraduate program by filling the details below.</p>
        </div>
        <Link href="/ug-programs" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">Code *</label>
            <input
              id="code"
              name="code"
              type="text"
              required
              value={formData.code}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
              placeholder="e.g., BTECH-CS"
            />
          </div>

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
              placeholder="Program name"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">Subtitle *</label>
            <input
              id="subtitle"
              name="subtitle"
              type="text"
              required
              value={formData.subtitle}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
              placeholder="Program subtitle"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
              placeholder="Program description"
            />
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
            <input
              id="duration"
              name="duration"
              type="text"
              required
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
              placeholder="e.g., 4 years"
            />
          </div>

          <div>
            <label htmlFor="students" className="block text-sm font-medium text-gray-700 mb-1">Students *</label>
            <input
              id="students"
              name="students"
              type="text"
              required
              value={formData.students}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
              placeholder="e.g., 120"
            />
          </div>

          <div>
            <label htmlFor="modules" className="block text-sm font-medium text-gray-700 mb-1">Modules *</label>
            <input
              id="modules"
              name="modules"
              type="number"
              required
              value={formData.modules}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
              placeholder="Number of modules"
            />
          </div>

          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">Rating *</label>
            <input
              id="rating"
              name="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              required
              value={formData.rating}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
              placeholder="e.g., 4.5"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="specializations" className="block text-sm font-medium text-gray-700 mb-1">Specializations</label>
            <textarea
              id="specializations"
              name="specializations"
              rows={3}
              value={formData.specializations}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
              placeholder="Specialization 1, Specialization 2, Specialization 3 (comma-separated)"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="eligibility" className="block text-sm font-medium text-gray-700 mb-1">Eligibility *</label>
            <textarea
              id="eligibility"
              name="eligibility"
              rows={3}
              required
              value={formData.eligibility}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
              placeholder="Eligibility criteria"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Program Image</label>
            <div className="rounded-lg border border-dashed border-gray-300 p-4 bg-white">
              <input
                id="image"
                name="image"
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
            Save UG Program
          </button>
          <Link href="/ug-programs" className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
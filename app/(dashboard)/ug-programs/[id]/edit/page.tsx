"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface UGProgram {
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

export default function EditUGProgramPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [ugProgram, setUgProgram] = useState<UGProgram | null>(null);
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

  useEffect(() => {
    if (params.id) {
      fetchUGProgram();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const fetchUGProgram = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ug-programs/${params.id}/`);
      if (response.ok) {
        const data = await response.json();
        setUgProgram(data);
        setFormData({
          code: data.code,
          name: data.name,
          subtitle: data.subtitle,
          description: data.description,
          duration: data.duration,
          specializations: data.specializations ? data.specializations.join(", ") : "",
          eligibility: data.eligibility,
          students: data.students,
          modules: data.modules.toString(),
          rating: data.rating,
          image: null,
        });
      } else if (response.status === 404) {
        router.push("/ug-programs");
      }
    } catch (error) {
      console.error("Error fetching UG program:", error);
    } finally {
      setLoading(false);
    }
  };

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
    setSaving(true);

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

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ug-programs/${params.id}/update/`, {
        method: "PUT",
        headers: {
          Authorization: `Token ${localStorage.getItem("authToken")}`,
        },
        body: data,
      });

      if (response.ok) {
        router.push(`/ug-programs/${params.id}`);
      } else {
        const error = await response.json();
        alert(`Failed to update UG program: ${JSON.stringify(error)}`);
      }
    } catch (error) {
      console.error("Error updating UG program:", error);
      alert("Error updating UG program");
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

  if (!ugProgram) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900">UG program not found</h2>
          <p className="text-gray-500">The UG program you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/ug-programs" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700">
            Back to UG Programs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Edit UG Program</h1>
          <p className="text-sm text-gray-500">Update UG program information and details.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/ug-programs/${ugProgram.id}`}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View
          </Link>
          <Link href="/ug-programs" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">
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
              <p className="mt-2 text-xs text-gray-500">PNG, JPG up to ~5MB. Leave empty to keep current image.</p>
              {ugProgram.image && (
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-2">Current image:</p>
                  <div className="h-20 w-32 rounded overflow-hidden bg-gray-100">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${ugProgram.image}`}
                      alt="Current UG program image"
                      width={128}
                      height={80}
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
            Update UG Program
          </button>
          <Link href={`/ug-programs/${ugProgram.id}`} className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
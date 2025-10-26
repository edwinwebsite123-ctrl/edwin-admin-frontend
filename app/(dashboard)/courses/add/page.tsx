"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Module {
  title: string;
  content: string[];
}

export default function AddCoursePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    short_description: "",
    category: "",
    duration: "",
    level: "",
    mode: "",
    certification: "",
    overview: "",
    modules: [] as Module[],
    career_opportunities: "",
    tools: "",
    highlights: "",
    image: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, image: file }));
  };

  // --- Module Handlers ---
  const addModule = () => {
    setFormData(prev => ({
      ...prev,
      modules: [...prev.modules, { title: "", content: [""] }],
    }));
  };

  const addContentToModule = (index: number) => {
    const updated = [...formData.modules];
    updated[index].content.push("");
    setFormData({ ...formData, modules: updated });
  };

  const handleModuleTitleChange = (index: number, value: string) => {
    const updated = [...formData.modules];
    updated[index].title = value;
    setFormData({ ...formData, modules: updated });
  };

  const handleModuleContentChange = (moduleIndex: number, contentIndex: number, value: string) => {
    const updated = [...formData.modules];
    updated[moduleIndex].content[contentIndex] = value;
    setFormData({ ...formData, modules: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("id", formData.id);
      data.append("title", formData.title);
      data.append("short_description", formData.short_description);
      data.append("category", formData.category);
      data.append("duration", formData.duration);
      data.append("level", formData.level);
      data.append("mode", formData.mode);
      data.append("certification", formData.certification);
      data.append("overview", formData.overview);
      data.append("modules", JSON.stringify(formData.modules));

      if (formData.career_opportunities)
        data.append(
          "career_opportunities",
          JSON.stringify(formData.career_opportunities.split(",").map(c => c.trim()))
        );
      if (formData.tools)
        data.append("tools", JSON.stringify(formData.tools.split(",").map(t => t.trim())));
      if (formData.highlights)
        data.append("highlights", JSON.stringify(formData.highlights.split(",").map(h => h.trim())));
      if (formData.image) data.append("image", formData.image);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/create`, {
        method: "POST",
        headers: { Authorization: `Token ${localStorage.getItem("authToken")}` },
        body: data,
      });

      if (response.ok) {
        router.push("/courses");
      } else {
        const error = await response.json();
        alert(`Failed to create course: ${JSON.stringify(error)}`);
      }
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Error creating course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Add Course</h1>
          <p className="text-sm text-gray-500">Create a new course by filling the details below.</p>
        </div>
        <Link href="/courses" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">
          ← Back
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm space-y-4">
        {/* Basic Inputs */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">ID *</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:ring-4 focus-visible:ring-indigo-500/20"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:ring-4 focus-visible:ring-indigo-500/20"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description *</label>
            <textarea
              name="short_description"
              value={formData.short_description}
              onChange={handleInputChange}
              rows={3}
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:ring-4 focus-visible:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:ring-4 focus-visible:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:ring-4 focus-visible:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Level *</label>
            <input
              type="text"
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              required
              placeholder="e.g., Beginner, Intermediate, Advanced"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:ring-4 focus-visible:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mode *</label>
            <input
              type="text"
              name="mode"
              value={formData.mode}
              onChange={handleInputChange}
              required
              placeholder="e.g., Online, Offline, Hybrid"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:ring-4 focus-visible:ring-indigo-500/20"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Certification *</label>
            <input
              type="text"
              name="certification"
              value={formData.certification}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:ring-4 focus-visible:ring-indigo-500/20"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Overview *</label>
            <textarea
              name="overview"
              value={formData.overview}
              onChange={handleInputChange}
              rows={4}
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:ring-4 focus-visible:ring-indigo-500/20"
            />
          </div>

          {/* Modules */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Modules</label>
            {formData.modules.map((module, i) => (
              <div key={i} className="p-3 mb-3 border rounded-lg bg-gray-50">
                <input
                  type="text"
                  value={module.title}
                  onChange={e => handleModuleTitleChange(i, e.target.value)}
                  placeholder="Module title"
                  className="w-full mb-2 px-3 py-2 rounded-lg border border-gray-200 focus-visible:ring-4 focus-visible:ring-indigo-500/20"
                />
                {module.content.map((item, j) => (
                  <input
                    key={j}
                    type="text"
                    value={item}
                    onChange={e => handleModuleContentChange(i, j, e.target.value)}
                    placeholder={`Content item ${j + 1}`}
                    className="w-full mb-2 px-3 py-2 rounded-lg border border-gray-200 focus-visible:ring-4 focus-visible:ring-indigo-500/20"
                  />
                ))}
                <button type="button" onClick={() => addContentToModule(i)} className="text-indigo-600 text-sm">
                  + Add Content
                </button>
              </div>
            ))}
            <button type="button" onClick={addModule} className="text-indigo-600 text-sm mt-2">
              + Add Module
            </button>
          </div>

          {/* Other comma-separated fields */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Career Opportunities</label>
            <textarea
              name="career_opportunities"
              value={formData.career_opportunities}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:ring-4 focus-visible:ring-indigo-500/20"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tools</label>
            <textarea
              name="tools"
              value={formData.tools}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:ring-4 focus-visible:ring-indigo-500/20"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Highlights</label>
            <textarea
              name="highlights"
              value={formData.highlights}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:ring-4 focus-visible:ring-indigo-500/20"
            />
          </div>

          {/* Image Upload */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Image</label>
            <div className="rounded-lg border border-dashed border-gray-300 p-4 bg-white">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-700 file:mr-3 file:rounded-md file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              <p className="mt-2 text-xs text-gray-500">PNG, JPG up to ~5MB.</p>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-6 flex items-center gap-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading && <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
            Save Course
          </button>
          <Link href="/courses" className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">Cancel</Link>
        </div>
      </form>
    </div>
  );
}

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
  image: string | null; // Can be null if not set
  overview: string;
  modules: Module[];
  career_opportunities: string[];
  tools: string[];
  highlights: string[];
  created_at: string;
  updated_at: string;
}

export default function EditCoursePage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [course, setCourse] = useState<Course | null>(null);

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

  useEffect(() => {
    // Ensure params.id is a string before fetching
    if (typeof params.id === 'string') {
      fetchCourse(params.id);
    } else {
      setLoading(false); // Stop loading if no ID is available
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const fetchCourse = async (courseId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/${courseId}/`, {
        headers: { Authorization: `Token ${localStorage.getItem("authToken")}` },
      });

      if (response.ok) {
        const data = await response.json();

        // Normalize modules to always have a content array
        const normalizedModules = (data.modules || []).map((mod: { title?: string; content?: string[] }) => ({
          title: mod.title || "",
          content: Array.isArray(mod.content) ? mod.content : [""],
        }));

        setCourse(data);
        setFormData({
          id: data.id,
          title: data.title,
          short_description: data.short_description,
          category: data.category,
          duration: data.duration,
          level: data.level,
          mode: data.mode,
          certification: data.certification,
          overview: data.overview,
          modules: normalizedModules,
          // Convert array of strings back to comma-separated string for textareas
          career_opportunities: data.career_opportunities?.join(", ") || "",
          tools: data.tools?.join(", ") || "",
          highlights: data.highlights?.join(", ") || "",
          image: null, // Image file starts as null; only send if changed
        });
      } else if (response.status === 404) {
        router.push("/courses");
      } else if (response.status === 401) {
        localStorage.clear();
        router.push("/login");
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  // --- MODULE HANDLERS ---
  const addModule = () => {
    setFormData((prev) => ({
      ...prev,
      modules: [...prev.modules, { title: "", content: [""] }],
    }));
  };

  // Utility to safely remove a module
  const removeModule = (index: number) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.filter((_, i) => i !== index),
    }));
  };

  // Utility to safely remove a content item
  const removeContentFromModule = (moduleIndex: number, contentIndex: number) => {
    const updated = [...formData.modules];
    updated[moduleIndex].content = updated[moduleIndex].content.filter((_, i) => i !== contentIndex);
    // Ensure there is at least one empty string if all content is removed
    if (updated[moduleIndex].content.length === 0) {
      updated[moduleIndex].content.push("");
    }
    setFormData({ ...formData, modules: updated });
  };


  const addContentToModule = (index: number) => {
    const updated = [...formData.modules];
    // Filter out empty strings before adding a new one, unless it's the only item
    const lastContent = updated[index].content[updated[index].content.length - 1];
    if (lastContent.trim() !== "" || updated[index].content.length === 0) {
        updated[index].content.push("");
    }
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
    setSaving(true);

    try {
      const data = new FormData();
      // Only include fields that are part of your form data
      data.append("id", formData.id);
      data.append("title", formData.title);
      data.append("short_description", formData.short_description);
      data.append("category", formData.category);
      data.append("duration", formData.duration);
      data.append("level", formData.level);
      data.append("mode", formData.mode);
      data.append("certification", formData.certification);
      data.append("overview", formData.overview);
      
      // Filter out modules/content with empty titles before serializing
      const sanitizedModules = formData.modules
        .filter(mod => mod.title.trim() !== "")
        .map(mod => ({
            ...mod,
            // Filter out empty content lines unless it's the only one
            content: mod.content.filter(item => item.trim() !== "")
        }));
        
      data.append("modules", JSON.stringify(sanitizedModules));

      // Handle comma-separated list fields
      if (formData.career_opportunities)
        data.append("career_opportunities", JSON.stringify(formData.career_opportunities.split(",").map((c) => c.trim())));
      if (formData.tools)
        data.append("tools", JSON.stringify(formData.tools.split(",").map((t) => t.trim())));
      if (formData.highlights)
        data.append("highlights", JSON.stringify(formData.highlights.split(",").map((h) => h.trim())));
        
      // Only append the image if a new file was selected
      if (formData.image) data.append("image", formData.image);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/${params.id}/update/`, {
        // Use POST for FormData with PUT method override
        method: "PUT",
        headers: { 
            Authorization: `Token ${localStorage.getItem("authToken")}`,
            // IMPORTANT: DO NOT set Content-Type for FormData
        },
        body: data,
      });

      if (response.ok) {
        router.push(`/courses/${params.id}`);
      } else {
        const error = await response.json();
        alert(`Failed to update course: ${JSON.stringify(error)}`);
      }
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Error updating course");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!course)
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

  return (
    <div className="min-h-[calc(100vh-64px)] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Edit Course: {course.title}</h1>
          <p className="text-sm text-gray-500">Update course information and details for {course.id}.</p>
        </div>
        <Link href={`/courses/${course.id}`} className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">
          ← Back to View
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* ID - Readonly for a PK */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">ID * (Cannot be changed)</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              readOnly
              className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Title */}
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

          {/* Short Description */}
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

          {/* ROW OF METADATA FIELDS */}
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
          <div className="sm:col-span-2">
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
          {/* END ROW OF METADATA FIELDS */}

          {/* Overview */}
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

          {/* Career Opportunities (Comma-separated) */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Career Opportunities (Comma-separated)</label>
            <textarea
              name="career_opportunities"
              value={formData.career_opportunities}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:ring-4 focus-visible:ring-indigo-500/20"
            />
          </div>

          {/* Tools (Comma-separated) */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tools (Comma-separated)</label>
            <textarea
              name="tools"
              value={formData.tools}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:ring-4 focus-visible:ring-indigo-500/20"
            />
          </div>

          {/* Highlights (Comma-separated) */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Highlights (Comma-separated)</label>
            <textarea
              name="highlights"
              value={formData.highlights}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:ring-4 focus-visible:ring-indigo-500/20"
            />
          </div>

          {/* Image Upload/Preview */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Image</label>
            <div className="rounded-lg border border-dashed border-gray-300 p-4 bg-white">
              {course.image && !formData.image && (
                <div className="mb-4 relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${course.image}`}
                    alt="Current Course Image"
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
              )}
              {formData.image && (
                <p className="text-sm text-green-600 mb-2">New image selected: {formData.image.name}</p>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-700 file:mr-3 file:rounded-md file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              <p className="mt-2 text-xs text-gray-500">
                PNG, JPG up to ~5MB. Uploading a new file will replace the current image.
              </p>
            </div>
          </div>


          {/* --- MODULES --- */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Modules</label>
            {formData.modules.map((module, i) => (
              <div key={i} className="p-4 mb-4 border rounded-xl bg-gray-50 shadow-inner">
                <div className="flex justify-between items-start mb-2">
                  <input
                    type="text"
                    value={module.title}
                    onChange={(e) => handleModuleTitleChange(i, e.target.value)}
                    placeholder="Module title"
                    className="w-full font-semibold px-3 py-2 rounded-lg border border-gray-200 focus-visible:ring-4 focus-visible:ring-indigo-500/20"
                  />
                  <button type="button" onClick={() => removeModule(i)} className="ml-3 text-red-500 hover:text-red-700 text-sm font-medium">
                      Remove Module
                  </button>
                </div>

                <div className="mt-3 space-y-2">
                    {module.content.map((item, j) => (
                        <div key={j} className="flex items-center gap-2">
                            <input
                                type="text"
                                value={item}
                                onChange={(e) => handleModuleContentChange(i, j, e.target.value)}
                                placeholder={`Content item ${j + 1}`}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:ring-4 focus-visible:ring-indigo-500/20 text-sm"
                            />
                            {module.content.length > 1 && (
                                <button type="button" onClick={() => removeContentFromModule(i, j)} className="text-gray-400 hover:text-red-500 text-lg">
                                    &times;
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <button type="button" onClick={() => addContentToModule(i)} className="text-indigo-600 text-sm mt-3 border-b border-indigo-600 hover:border-transparent">
                  + Add Content Item
                </button>
              </div>
            ))}
            <button type="button" onClick={addModule} className="rounded-lg bg-indigo-50 text-indigo-600 px-3 py-1.5 text-sm font-medium hover:bg-indigo-100 mt-2 border border-indigo-200">
              + Add New Module
            </button>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2 border-t pt-6">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
          >
            {saving && <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
            {saving ? 'Saving...' : 'Update Course'}
          </button>
          <Link href={`/courses/${course.id}`} className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
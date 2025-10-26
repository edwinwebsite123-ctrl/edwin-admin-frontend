"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

interface GalleryItem {
  id: number;
  category: string;
  title: string;
  date: string;
  image: string;
  created_at: string;
  updated_at: string;
  alt?: string;
}

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/gallery/list/`);
      if (response.ok) {
        const data = await response.json();
        setGalleryItems(data);
      }
    } catch (error) {
      console.error("Error fetching gallery items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/gallery/${id}/delete/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.ok) {
        setGalleryItems(galleryItems.filter(item => item.id !== id));
      } else {
        alert("Failed to delete gallery item");
      }
    } catch (error) {
      console.error("Error deleting gallery item:", error);
      alert("Error deleting gallery item");
    }
  };

  const filteredGalleryItems = galleryItems.filter(
    (item) =>
      (item.title?.toLowerCase().includes(search.toLowerCase()) || !item.title) &&
      (categoryFilter === "" || item.category === categoryFilter)
  );

  const categories = [
    { value: "", label: "All Categories" },
    { value: "programs", label: "Programs" },
    { value: "events", label: "Events" },
    { value: "convocations", label: "Convocations" },
    { value: "achievements", label: "Achievements" },
  ];

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Gallery</h1>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search gallery items..."
            className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          <Link
            href="/gallery/add"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add Gallery Item
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredGalleryItems.length > 0 ? (
          filteredGalleryItems.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-2xl border border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm"
            >
              <div className="relative h-48 w-full">
                {item.image && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.image}`}
                    alt={item.title || "Gallery item"}
                    fill
                    className="object-cover bg-gray-100"
                  />
                )}

                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {item.category || "Uncategorized"}
                  </span>
                </div>

                <Link href={`/gallery/${item.id}/edit`} className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-lg bg-white/90 px-2.5 py-1.5 text-xs font-medium text-gray-800 border border-gray-200 hover:bg-white shadow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.313 3 21l1.687-4.5L16.862 3.487z"
                    />
                  </svg>
                  Edit
                </Link>
              </div>

              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-1">{item.title || "Untitled"}</h3>
                {item.date && (
                  <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                )}
                <div className="flex items-center justify-between">
                  <Link
                    href={`/gallery/${item.id}`}
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-sm text-red-600 hover:text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-gray-400">
            No gallery items found.
          </div>
        )}
      </div>
    </div>
  );
}
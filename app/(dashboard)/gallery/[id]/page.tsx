"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

interface GalleryItem {
  id: number;
  category: string;
  title: string;
  date: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export default function ViewGalleryItemPage() {
  const params = useParams();
  const router = useRouter();
  const [galleryItem, setGalleryItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchGalleryItem = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/gallery/${params.id}/`);
      if (response.ok) {
        const data = await response.json();
        setGalleryItem(data);
      } else if (response.status === 404) {
        router.push("/gallery");
      }
    } catch (error) {
      console.error("Error fetching gallery item:", error);
    } finally {
      setLoading(false);
    }
  }, [params.id, router]);

  useEffect(() => {
    if (params.id) {
      fetchGalleryItem();
    }
  }, [params.id, fetchGalleryItem]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!galleryItem) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900">Gallery item not found</h2>
          <p className="text-gray-500">The gallery item you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/gallery" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700">
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  const getCategoryLabel = (category: string) => {
    const categories: { [key: string]: string } = {
      programs: "Programs",
      events: "Events",
      convocations: "Convocations",
      achievements: "Achievements",
    };
    return categories[category] || category;
  };

  return (
    <div className="min-h-[calc(100vh-64px)] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">View Gallery Item</h1>
          <p className="text-sm text-gray-500">Gallery item details and information.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/gallery/${galleryItem.id}/edit`}
            className="inline-flex items-center gap-2 rounded-lg bg-yellow-600 text-white px-4 py-2 text-sm font-medium hover:bg-yellow-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </Link>
          <Link href="/gallery" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">
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
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{galleryItem.title || "Untitled"}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Category</label>
                <p className="text-sm text-gray-900">{getCategoryLabel(galleryItem.category)}</p>
              </div>
              {galleryItem.date && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Date</label>
                  <p className="text-sm text-gray-900">{galleryItem.date}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Image */}
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Image</h3>
            <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-100">
              {galleryItem.image ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${galleryItem.image}`}
                  alt={galleryItem.title || "Gallery item"}
                  width={400}
                  height={225}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                  <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
                <p className="text-sm text-gray-900">{new Date(galleryItem.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Last Updated</label>
                <p className="text-sm text-gray-900">{new Date(galleryItem.updated_at).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Gallery Item ID</label>
                <p className="text-sm text-gray-900 font-mono">{galleryItem.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
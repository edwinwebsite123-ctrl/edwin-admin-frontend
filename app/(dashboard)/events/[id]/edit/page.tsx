"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  phone_number: string;
  registration_message: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function EditEventPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [event, setEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    phone_number: "",
    registration_message: "",
    is_active: false,
  });

  useEffect(() => {
    if (params.id) {
      fetchEvent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const fetchEvent = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events/${params.id}/`);
      if (response.ok) {
        const data = await response.json();
        setEvent(data);
        setFormData({
          title: data.title,
          description: data.description,
          date: data.date,
          location: data.location,
          phone_number: data.phone_number,
          registration_message: data.registration_message,
          is_active: data.is_active,
        });
      } else if (response.status === 404) {
        router.push("/events");
      }
    } catch (error) {
      console.error("Error fetching event:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events/${params.id}/update/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push(`/events`);
      } else {
        const error = await response.json();
        alert(`Failed to update event: ${JSON.stringify(error)}`);
      }
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Error updating event");
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

  if (!event) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900">Event not found</h2>
<p className="text-gray-500">The event you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/events" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Edit Event</h1>
          <p className="text-sm text-gray-500">Update event information and settings.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/events" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Event Title *</label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
              placeholder="Enter the event title"
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
              placeholder="Enter the event description"
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
            <input
              id="date"
              name="date"
              type="date"
              required
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
            <input
              id="location"
              name="location"
              type="text"
              required
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
              placeholder="Enter the event location"
            />
          </div>

          <div>
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <input
              id="phone_number"
              name="phone_number"
              type="text"
              required
              value={formData.phone_number}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
              placeholder="Enter phone number for registration"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="registration_message" className="block text-sm font-medium text-gray-700 mb-1">Registration Message *</label>
            <textarea
              id="registration_message"
              name="registration_message"
              rows={3}
              required
              value={formData.registration_message}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
              placeholder="Enter the WhatsApp message for registration"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700">Active (Show on website)</span>
            </label>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving && <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
            Update Event
          </button>
          <Link href={`/events`} className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
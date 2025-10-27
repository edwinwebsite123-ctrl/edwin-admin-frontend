"use client";

import Link from "next/link";
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

export default function EventsPage() {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events/`);
      if (response.ok) {
        const data = await response.json();
        setEvent(data.length > 0 ? data[0] : null);
      }
    } catch (error) {
      console.error("Error fetching event:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id: number, currentStatus: boolean) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events/${id}/update/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ is_active: !currentStatus }),
      });

      if (response.ok) {
        setEvent(event ? { ...event, is_active: !currentStatus } : null);
      } else {
        alert("Failed to update event status");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Error updating event");
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
      <div className="min-h-[calc(100vh-64px)] space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-lg font-semibold">Event</h1>
          <Link
            href="/events/edit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700 whitespace-nowrap"
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Create Event
          </Link>
        </div>
        <div className="bg-white rounded-lg p-8 text-center">
          <p className="text-gray-500">No active event found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-lg font-semibold">Event</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleToggleActive(event.id, event.is_active)}
            className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium ${
              event.is_active
                ? "bg-green-50 text-green-700 hover:bg-green-100"
                : "bg-red-50 text-red-700 hover:bg-red-100"
            }`}
          >
            {event.is_active ? "Active" : "Inactive"}
          </button>
          <Link
            href={`/events/${event.id}/edit`}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700 whitespace-nowrap"
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit Event
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Title</h3>
            <p className="text-lg font-semibold text-gray-900">{event.title}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700">Date</h3>
            <p className="text-lg font-semibold text-gray-900">{event.date}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700">Location</h3>
            <p className="text-lg font-semibold text-gray-900">{event.location}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700">Phone Number</h3>
            <p className="text-lg font-semibold text-gray-900">{event.phone_number}</p>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700">Description</h3>
          <p className="text-gray-600 mt-1">{event.description}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700">Registration Message</h3>
          <p className="text-gray-600 mt-1">{event.registration_message}</p>
        </div>
      </div>
    </div>
  );
}
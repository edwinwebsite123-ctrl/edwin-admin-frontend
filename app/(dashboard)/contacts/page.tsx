"use client";

import { useState, useEffect } from "react";

// Type definition for the contact message data
interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
}

// Modal component for viewing contact message details
const ContactDetailModal = ({ 
  contact, 
  isOpen, 
  onClose 
}: { 
  contact: ContactMessage | null; 
  isOpen: boolean; 
  onClose: () => void 
}) => {
  if (!isOpen || !contact) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Contact Message Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Full Name</label>
              <p className="text-gray-900">{contact.name || <span className="text-gray-400 italic">Not provided</span>}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-gray-900">{contact.email || <span className="text-gray-400 italic">Not provided</span>}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Phone Number</label>
              <p className="text-gray-900">{contact.phone || <span className="text-gray-400 italic">Not provided</span>}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Submitted At</label>
              <p className="text-gray-900">{new Date(contact.created_at).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-500">Subject</label>
            <p className="text-gray-900 mt-1 p-3 bg-gray-50 rounded-lg">
              {contact.subject || <span className="text-gray-400 italic">No subject provided</span>}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Message</label>
            <p className="text-gray-900 mt-1 p-3 bg-gray-50 rounded-lg min-h-[120px] whitespace-pre-wrap">
              {contact.message || <span className="text-gray-400 italic">No message provided</span>}
            </p>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Confirmation modal for delete actions
const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onConfirm: () => void;
  title: string;
  message: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{message}</p>
        </div>
        
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ContactMessagesPage() {
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [search, setSearch] = useState<string>("");
  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, contactId: 0, contactName: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch contact messages data from the API on component mount
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contact/list/`, {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("authToken")}`,
          },
        });

        if (response.ok) {
          const data: ContactMessage[] = await response.json();
          setContacts(data);
        } else {
          throw new Error("Failed to fetch contact messages");
        }
      } catch (error) {
        console.error("Error fetching contact messages:", error);
        setError("Failed to load contact messages. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleView = (contact: ContactMessage) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contact/delete/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.ok) {
        setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
        setDeleteModal({ isOpen: false, contactId: 0, contactName: "" });
      } else {
        alert("Error deleting contact message.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting contact message.");
    }
  };

  const openDeleteModal = (contact: ContactMessage) => {
    setDeleteModal({
      isOpen: true,
      contactId: contact.id,
      contactName: contact.name || 'Unknown Contact'
    });
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      (contact.name?.toLowerCase().includes(search.toLowerCase()) ||
        contact.email?.toLowerCase().includes(search.toLowerCase()) ||
        contact.phone?.includes(search) ||
        contact.subject?.toLowerCase().includes(search.toLowerCase()) ||
        contact.message?.toLowerCase().includes(search.toLowerCase()))
  );

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return 'No message';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center text-red-600">
          <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
          <p className="text-gray-600 mt-1">Manage and view all contact form submissions</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search messages..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message Preview</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {contact.name || <span className="text-gray-400 italic">Anonymous</span>}
                      </div>
                      <div className="text-sm text-gray-500">{contact.email}</div>
                      {contact.phone && (
                        <div className="text-sm text-gray-500">{contact.phone}</div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-gray-900 max-w-[200px] truncate">
                      {contact.subject || <span className="text-gray-400 italic">No subject</span>}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-gray-600 max-w-[300px]">
                      {truncateText(contact.message, 80)}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {new Date(contact.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleView(contact)}
                        className="inline-flex items-center px-3 py-1.5 text-sm bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                      </button>
                      <button
                        onClick={() => openDeleteModal(contact)}
                        className="inline-flex items-center px-3 py-1.5 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredContacts.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <p className="text-gray-500 text-lg">No contact messages found</p>
                    <p className="text-gray-400 text-sm mt-1">
                      {search ? "Try adjusting your search" : "No contact messages have been submitted yet"}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contact Detail Modal */}
      <ContactDetailModal 
        contact={selectedContact} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, contactId: 0, contactName: "" })}
        onConfirm={() => handleDelete(deleteModal.contactId)}
        title="Delete Contact Message"
        message={`Are you sure you want to delete the contact message from ${deleteModal.contactName}? This action cannot be undone.`}
      />
    </div>
  );
}
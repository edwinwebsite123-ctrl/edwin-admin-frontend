"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, PropsWithChildren, useEffect } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      )
    },
    {
      href: "/admission-leads",
      label: "Admission Leads",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      )
    },
    {
      href: "/contacts",
      label: "Contact Messages",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      )
    },
    {
      href: "/courses",
      label: "Courses",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
        </svg>
      )
    },
    {
      href: "/placements",
      label: "Placements",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
        </svg>
      )
    },
    {
      href: "/edwin-talks",
      label: "Edwin Talks",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      href: "/testimonials",
      label: "Testimonials",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      href: "/faculty",
      label: "Faculty",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      )
    },
    {
      href: "/placement-posters",
      label: "Placement Posters",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      href: "/ug-programs",
      label: "UG Programs",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
        </svg>
      )
    },
    {
      href: "/pg-programs",
      label: "PG Programs",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      href: "/gallery",
      label: "Gallery",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      href: "/events",
      label: "Events",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      )
    },
  ];

  // Token verification effect
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/login");
        return;
      }
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/verify-token/`, {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        if (!response.ok) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userData");
          router.push("/login");
        }
      } catch (error) {
        console.error("Token verification failed:", error);
      }
    };

    verifyToken();
    const interval = setInterval(verifyToken, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [router]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        console.error("Logout failed on server");
      }


      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      router.push("/login");
    } finally {
      setIsLoggingOut(false);
      setShowLogoutConfirm(false);
    }
  };

  const openLogoutConfirm = () => setShowLogoutConfirm(true);
  const closeLogoutConfirm = () => setShowLogoutConfirm(false);

  const linkClass = (href: string) => {
    const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return (
      (isActive ? "bg-indigo-50 text-indigo-700 font-medium " : "text-gray-700 hover:bg-gray-50 ") +
      "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"
    );
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[260px_1fr] grid-rows-[auto_1fr]">
      {/* Desktop Sidebar */}
      <aside className="row-span-2 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-r border-black/5 hidden lg:block">
        <div className="h-16 flex items-center gap-3 px-5 border-b border-black/5">
          <Image src="/logo/hero-icon.png" alt="Company logo" width={32} height={32} />
          <span className="font-semibold tracking-wide">Dashboard</span>
        </div>
        <nav className="p-3 space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(item.href)}>
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-4 left-3 right-3">
          <button
            onClick={openLogoutConfirm}
            className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-9A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 004.5 21h9a2.25 2.25 0 002.25-2.25V15M12 9l3-3m0 0l3 3m-3-3v12" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Header */}
      <header className="h-16 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-black/5 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white h-10 w-10 hover:bg-gray-50 transition-colors"
            aria-label={isMobileSidebarOpen ? "Close sidebar" : "Open sidebar"}
            aria-expanded={isMobileSidebarOpen}
            aria-controls="mobile-sidebar"
            onClick={() => setIsMobileSidebarOpen((v) => !v)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              {isMobileSidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <h1 className="text-lg font-semibold">Overview</h1>
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="inline-flex" aria-label="Open profile">
            <div className="h-8 w-8 rounded-full bg-gray-200 grid place-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 0115 0V20H4.5v-.5z" />
              </svg>
            </div>
          </a>
          <button
            onClick={openLogoutConfirm}
            className="lg:hidden inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-9A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 004.5 21h9a2.25 2.25 0 002.25-2.25V15M12 9l3-3m0 0l3 3m-3-3v12" />
            </svg>
            Logout
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        id="mobile-sidebar"
        role="dialog"
        aria-modal="true"
        className={`lg:hidden fixed inset-0 z-40 ${isMobileSidebarOpen ? "" : "pointer-events-none"}`}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${isMobileSidebarOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsMobileSidebarOpen(false)}
        />
        <aside
          className={`absolute left-0 top-0 h-full w-[85%] max-w-[280px] bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-r border-black/5 transform transition-transform duration-300 ease-out ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="h-16 flex items-center gap-3 px-5 border-b border-black/5">
            <Image src="/logo/hero-icon.png" alt="Company logo" width={32} height={32} />
            <span className="font-semibold tracking-wide">Dashboard</span>
          </div>
          <nav className="p-3 space-y-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass(item.href)} onClick={() => setIsMobileSidebarOpen(false)}>
                {item.icon}
                {item.label}
              </Link>
            ))}
            <button
              onClick={openLogoutConfirm}
              className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors mt-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-9A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 004.5 21h9a2.25 2.25 0 002.25-2.25V15M12 9l3-3m0 0l3 3m-3-3v12" />
              </svg>
              Logout
            </button>
          </nav>
        </aside>
      </div>

      {/* Page Content */}
      <main className="p-4 sm:p-6 space-y-6">
        {children}
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-9A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 004.5 21h9a2.25 2.25 0 002.25-2.25V15M12 9l3-3m0 0l3 3m-3-3v12" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Confirm Logout</h3>
              </div>
              <p className="text-gray-600">
                Are you sure you want to logout? You will need to login again to access the dashboard.
              </p>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={closeLogoutConfirm}
                disabled={isLoggingOut}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoggingOut ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Logging out...
                  </>
                ) : (
                  "Logout"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

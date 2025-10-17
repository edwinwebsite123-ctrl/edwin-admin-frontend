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
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9.75l8.485-6.364a1 1 0 011.03 0L21 9.75V20a1 1 0 01-1 1h-5a1 1 0 01-1-1v-5H10v5a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z" />
        </svg>
      )
    },
    {
      href: "/admission-leads",
      label: "Admission Leads",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
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
          <Image src="/file.svg" alt="Company logo" width={32} height={32} />
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
            <Image src="/file.svg" alt="Company logo" width={32} height={32} />
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

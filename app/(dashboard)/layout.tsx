"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const navItems = [
    {
      href: "/", label: "Home", icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9.75l8.485-6.364a1 1 0 011.03 0L21 9.75V20a1 1 0 01-1 1h-5a1 1 0 01-1-1v-5H10v5a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z" />
        </svg>
      )
    },
    {
      href: "/admission-leads", label: "Admission Leads", icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      )
    },
    {
      href: "/courses", label: "Courses", icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5.25A2.25 2.25 0 015.25 3h8.5A2.25 2.25 0 0116 5.25V19.5a.75.75 0 01-1.16.628L10 17.25l-4.84 2.878A.75.75 0 014 19.5V5.25z" />
        </svg>
      )
    },
    {
      href: "/blogs", label: "Blogs", icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.5 6.75h-9A2.25 2.25 0 008.25 9v9A2.25 2.25 0 0010.5 20.25h9A2.25 2.25 0 0021.75 18V9A2.25 2.25 0 0019.5 6.75zM6.75 17.25H5.25A2.25 2.25 0 013 15V6A2.25 2.25 0 015.25 3.75H15" />
        </svg>
      )
    },
    {
      href: "/teachers", label: "Teachers", icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 0115 0V20H4.5v-.5z" />
        </svg>
      )
    },
    {
      href: "/placements", label: "Placements", icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 7.5A2.25 2.25 0 014.5 5.25h15a2.25 2.25 0 012.25 2.25v1.5H2.25V7.5zM2.25 12h19.5v4.5A2.25 2.25 0 0119.5 18.75h-15A2.25 2.25 0 012.25 16.5V12z" />
        </svg>
      )
    },
  ];

  const linkClass = (href: string) => {
    const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return (
      (isActive ? "bg-indigo-50 text-indigo-700 font-medium " : "text-gray-700 hover:bg-gray-50 ") +
      "flex items-center gap-3 px-3 py-2 rounded-lg"
    );
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[260px_1fr] grid-rows-[auto_1fr]">
      {/* Desktop Sidebar */}
      <aside className="row-span-2 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-r border-black/5 hidden lg:block">
        <div className="h-16 flex items-center gap-3 px-5 border-b border-black/5">
          <img src="/file.svg" alt="Company logo" className="h-8 w-8" />
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
      </aside>

      {/* Header */}
      <header className="h-16 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-black/5 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white h-10 w-10 hover:bg-gray-50"
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
          <a href="/profile" className="inline-flex" aria-label="Open profile">
            <div className="h-8 w-8 rounded-full bg-gray-200 grid place-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 0115 0V20H4.5v-.5z" />
              </svg>
            </div>
          </a>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-9A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 004.5 21h9a2.25 2.25 0 002.25-2.25V15M12 9l3-3m0 0l3 3m-3-3v12" />
            </svg>
            Logout
          </button>
        </div>
      </header>

      {/* Mobile sidebar drawer */}
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
            <img src="/file.svg" alt="Company logo" className="h-8 w-8" />
            <span className="font-semibold tracking-wide">Dashboard</span>
          </div>
          <nav className="p-3 space-y-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass(item.href)} onClick={() => setIsMobileSidebarOpen(false)}>
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
      </div>

      {/* Page content */}
      <main className="p-4 sm:p-6 space-y-6">
        {children}
      </main>
    </div>
  );
}



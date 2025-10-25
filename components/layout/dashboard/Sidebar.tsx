// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   LayoutGrid,
//   LogOut,
//   Settings,
//   X,
//   Newspaper,
//   MessageCircle,
//   StoreIcon,
//   UserPlus,
//   Camera,
// } from "lucide-react";

// // Remove unused icons above

// const navigation = [
//   { name: "Dashboard", href: "/dashboard/admin", icon: LayoutGrid },
//   { name: "Leads", href: "/dashboard/admin/leads", icon: UserPlus },
//   { name: "Services", href: "/dashboard/admin/services", icon: Settings },
//   { name: "Franchises", href: "/dashboard/admin/franchises", icon: StoreIcon },
//   { name: "Blogs", href: "/dashboard/admin/blogs", icon: Newspaper },
//   { name: "Media", href: "/dashboard/admin/media", icon: Camera },
//   {
//     name: "Testimonials",
//     href: "/dashboard/admin/testimonials",
//     icon: MessageCircle,
//   },
//   { name: "Logout", href: "/logout", icon: LogOut },
// ];

// export default function Sidebar({
//   isOpen,
//   onClose,
// }: {
//   isOpen?: boolean;
//   onClose?: () => void;
// }) {
//   const pathname = usePathname();

//   return (
//     <>
//       {/* Mobile Overlay */}
//       <div
//         className={`fixed inset-0 bg-black/50 lg:hidden z-40 transition-opacity duration-300 ease-in-out ${
//           isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//         }`}
//         onClick={onClose}
//       />

//       <aside
//         className={`
//         fixed inset-y-0 left-0 z-50 w-[270px] flex-col border-r bg-white
//         transform transition-all duration-300 ease-in-out
//         ${isOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"}
        
//         lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:flex lg:shadow-none
//       `}
//       >
//         {/* Close button for mobile */}
//         <button
//           onClick={onClose}
//           className="absolute right-4 top-4 p-2 text-slate-600 hover:text-slate-900 lg:hidden"
//         >
//           <X className="h-5 w-5" />
//         </button>

//         {/* Sidebar Header */}
//         <div className="flex flex-col items-center gap-2 border-b px-4 py-4">
//           <Link
//             href="/"
//             className="text-2xl font-extrabold tracking-tight text-slate-900"
//           >
//             Abacus
//           </Link>
//           <div className="h-1 w-3/4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
//         </div>

//         <div className="flex-1 overflow-y-auto py-8">
//           <nav className="grid items-start gap-3 px-6 text-base font-medium">
//             {navigation.map((item) => {
//               const isActive =
//                 item.href === "/dashboard/admin"
//                   ? pathname === item.href
//                   : pathname.startsWith(item.href);

//               // Special styling for Logout
//               const isLogout = item.name === "Logout";
//               const baseClass = `
//                 relative flex items-center gap-4 rounded-xl px-3 py-3 transition-all duration-200 ease-in-out text-base
//                 ${
//                   isLogout
//                     ? "text-red-600 hover:bg-red-100 hover:text-red-700"
//                     : "text-slate-600"
//                 }
//                 ${
//                   !isActive && !isLogout
//                     ? "hover:bg-purple-500/10 hover:text-purple-600 hover:scale-[0.98]"
//                     : ""
//                 }
//                 ${
//                   isActive && !isLogout
//                     ? "bg-white text-purple-600 font-bold shadow-sm"
//                     : ""
//                 }
//               `;

//               return (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   onClick={() => {
//                     if (window.innerWidth < 1024) {
//                       // Only close on mobile/tablet
//                       onClose?.();
//                     }
//                   }}
//                   className={baseClass}
//                 >
//                   {isActive && !isLogout && (
//                     <div className="absolute left-0 h-8 w-1 rounded-r-full bg-purple-600" />
//                   )}

//                   <item.icon
//                     className={`h-6 w-6 transition-colors duration-200${
//                       isActive && !isLogout ? " text-purple-600" : ""
//                     }${isLogout ? " text-red-600" : ""}`}
//                   />
//                   <span>{item.name}</span>
//                 </Link>
//               );
//             })}
//           </nav>
//         </div>
//       </aside>
//     </>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  LogOut,
  Users,
  UserCheck,
  ShieldCheck,
  UserCircle,
  BookOpen,
  Map,
  X,
} from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";

// --- Navigation Links for Each Role ---
const adminNavigation = [
  { name: "Dashboard", href: "/dashboard/admin", icon: LayoutGrid },
  { name: "Manage Guides", href: "/dashboard/admin/guides", icon: UserCheck },
  { name: "Manage Users", href: "/dashboard/admin/users", icon: Users },
];

const guideNavigation = [
  { name: "Dashboard", href: "/dashboard/guide", icon: LayoutGrid },
  { name: "My Profile", href: "/dashboard/guide/profile", icon: UserCircle },
  { name: "My Bookings", href: "/dashboard/guide/bookings", icon: BookOpen },
];

const userNavigation = [
  { name: "Dashboard", href: "/dashboard/user", icon: LayoutGrid },
  { name: "Find a Guide", href: "/guides", icon: Map },
  { name: "My Bookings", href: "/dashboard/user/bookings", icon: BookOpen },
];

// Role to navigation mapping
const roleNavigations = {
  admin: adminNavigation,
  guide: guideNavigation,
  user: userNavigation,
  manager: adminNavigation, // Assuming manager has same access as admin
};

export default function Sidebar({
  isOpen,
  onClose,
  userRole,
}: {
  isOpen?: boolean;
  onClose?: () => void;
  userRole: "admin" | "guide" | "user" | "manager";
}) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const navigation = roleNavigations[userRole] || userNavigation; // Default to user nav

  const handleLinkClick = (href: string) => {
    if (href === "/logout") {
      logout();
    }
    if (window.innerWidth < 1024) {
      onClose?.();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 lg:hidden z-40 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[270px] flex-col border-r bg-white 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
        lg:sticky lg:h-screen lg:translate-x-0 lg:flex lg:shadow-none`}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-slate-500 hover:text-slate-800 lg:hidden"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex flex-col items-center gap-2 border-b px-4 py-5">
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-slate-900">
            BookMyTourGuide
          </Link>
          <div className="h-1 w-3/4 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500" />
        </div>

        <div className="flex-1 overflow-y-auto py-8">
          <nav className="grid items-start gap-3 px-6 text-base font-medium">
            {navigation.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => handleLinkClick(item.href)}
                  className={`relative flex items-center gap-4 rounded-xl px-3 py-3 transition-all duration-200 
                    ${ isActive
                      ? "bg-white text-teal-600 font-bold shadow-sm"
                      : "text-slate-600 hover:bg-teal-500/10 hover:text-teal-600"
                    }`
                  }
                >
                  {isActive && <div className="absolute left-0 h-8 w-1 rounded-r-full bg-teal-500" />}
                  <item.icon className={`h-6 w-6 transition-colors ${isActive ? "text-teal-500" : ""}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t p-4">
            <Link
                href="#"
                onClick={(e) => { e.preventDefault(); logout(); }}
                className="flex items-center gap-4 rounded-xl px-3 py-3 text-red-600 transition-all hover:bg-red-100"
            >
                <LogOut className="h-6 w-6" />
                <span>Logout</span>
            </Link>
        </div>
      </aside>
    </>
  );
}
"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Globe,
  Menu,
  X,
  User,
  LogIn,
  UserPlus,
  LogOut,
  ChevronDown,
  Home,
  Info,
  MapPin,
  Users,
  HelpCircle,
  Mail,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Cart } from "@/components/cart/Cart";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const pathname = usePathname();
  const profileRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "EN", name: "English" },
    { code: "HI", name: "हिंदी" },
    { code: "ES", name: "Español" },
    { code: "FR", name: "Français" },
    { code: "DE", name: "Deutsch" },
    { code: "IT", name: "Italiano" },
    { code: "JA", name: "日本語" },
    { code: "ZH", name: "中文" },
    { code: "RU", name: "Русский" },
    { code: "AR", name: "العربية" },
  ];

  // Fixed navigation items with icons included
  const navigationItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: Info },
    { href: "/tours", label: "Tours", icon: MapPin },
    { href: "/guides", label: "Become a Guide", icon: Users },
    { href: "/how-it-works", label: "How it Works", icon: HelpCircle },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleLogin = () => {
    console.log("Login clicked");
    setIsProfileOpen(false);
  };

  const handleRegister = () => {
    console.log("Register clicked");
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    setIsLoggedIn(false);
    setIsProfileOpen(false);
  };

  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 overflow-hidden rounded-xl bg-primary/10 p-0.5 transition-transform group-hover:scale-105">
              <div className="w-full h-full rounded-lg overflow-hidden bg-white">
                <Image
                  src="/images/logo.jpg"
                  alt="Book My Tour Guide"
                  fill
                  className="object-contain p-1"
                />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-primary">
                BookMyTourGuide
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                bookmytourguide.in
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center space-x-3 px-5 py-3 rounded-xl font-medium transition-all duration-300 group ${
                    active
                      ? "text-primary bg-primary/10 shadow-sm"
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  <span className="text-base font-semibold">{item.label}</span>
                  {active && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Cart */}
            <Cart />

            {/* Language Selector */}
            <div className="relative">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all min-w-[90px] cursor-pointer"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.code}
                  </option>
                ))}
              </select>
              <Globe className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-gray-200 group"
              >
                <div className="relative">
                  <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-sm">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                  {isLoggedIn && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-all duration-300 group-hover:text-gray-700 ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white/98 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in-0 zoom-in-95 duration-200">
                  {!isLoggedIn ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          Welcome!
                        </p>
                        <p className="text-xs text-gray-500">
                          Sign in to access your account
                        </p>
                      </div>
                      <button
                        onClick={handleLogin}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                      >
                        <div className="w-8 h-8 bg-primary/15 rounded-lg flex items-center justify-center">
                          <LogIn className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">Login</span>
                      </button>
                      <button
                        onClick={handleRegister}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                      >
                        <div className="w-8 h-8 bg-primary/15 rounded-lg flex items-center justify-center">
                          <UserPlus className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">Register</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                            <User className="w-5 h-5 text-primary-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              John Doe
                            </p>
                            <p className="text-xs text-gray-500">
                              john@example.com
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsProfileOpen(false)}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200"
                      >
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <User className="w-4 h-4 text-gray-600" />
                        </div>
                        <span className="font-medium">Profile</span>
                      </button>
                      <div className="mx-4 my-2 h-px bg-gray-200" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-200"
                      >
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                          <LogOut className="w-4 h-4 text-red-600" />
                        </div>
                        <span className="font-medium">Logout</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl hover:bg-gray-50 transition-colors border border-gray-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-gray-700" />
            ) : (
              <Menu className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-gray-200/50 bg-white/95 backdrop-blur-md animate-in fade-in-0 slide-in-from-top-2 duration-300">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-4 px-4 py-4 rounded-xl font-medium transition-all duration-200 ${
                      active
                        ? "text-primary bg-primary/10"
                        : "text-gray-700 hover:text-primary hover:bg-gray-50"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        active ? "text-primary" : "text-gray-500"
                      }`}
                    />
                    <span className="text-lg font-semibold">{item.label}</span>
                    {active && (
                      <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
                    )}
                  </Link>
                );
              })}

              <div className="pt-4 mt-4 border-t border-gray-200/50 space-y-4">
                {/* Mobile Language Selector */}
                <div className="px-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mobile Profile Actions */}
                {!isLoggedIn ? (
                  <div className="px-4 space-y-3">
                    <button
                      onClick={handleLogin}
                      className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Login</span>
                    </button>
                    <button
                      onClick={handleRegister}
                      className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Register</span>
                    </button>
                  </div>
                ) : (
                  <div className="px-4 space-y-3">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                          <User className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            John Doe
                          </p>
                          <p className="text-xs text-gray-500">
                            john@example.com
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full flex items-center space-x-3 py-3 px-4 text-gray-700 hover:bg-gray-50 transition-colors rounded-xl font-medium"
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 py-3 px-4 text-red-600 hover:bg-red-50 transition-colors rounded-xl font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

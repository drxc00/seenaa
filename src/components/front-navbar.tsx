"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { PiPaperPlaneThin } from "react-icons/pi";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="border border-dashed">
      <div className="container mx-auto border border-dashed border-t-0 border-b-0 px-4 py-4">
        <nav className="flex justify-between items-center font-semibold text-lg">
          <Link
            href={
              process.env.NODE_ENV === "production"
                ? `https://${process.env.NEXT_PUBLIC_ORIGIN_DOMAIN}`
                : "http://localhost:3000/"
            }
            className="flex items-center gap-2"
          >
            <PiPaperPlaneThin className="w-6 h-6" />
            <span>seenaa</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-6">
              <Link
                href={
                  process.env.NODE_ENV === "production"
                    ? `https://${process.env.NEXT_PUBLIC_ORIGIN_DOMAIN}/signin`
                    : "http://localhost:3000/signin"
                }
              >
                start writing
              </Link>
            </div>
            <div onClick={toggleTheme} aria-label="Toggle theme" className="cursor-pointer">
              {theme === "dark" ? "light" : "dark"}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

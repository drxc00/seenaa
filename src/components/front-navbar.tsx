import Link from "next/link";
import { PiPaperPlaneThin } from "react-icons/pi";

export default function Navbar() {
  return (
    <header className="container mx-auto px-4 py-6">
      <nav className="flex justify-between items-center">
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
      </nav>
    </header>
  );
}

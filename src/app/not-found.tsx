import { Icon } from "@/components/icon";

export async function generateMetadata() {
  return {
    title: "Page Not Found | seenaa",
    description: "The page you are looking for does not exist.",
  };
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="mb-6">
        <Icon />
      </div>
      <h1 className="text-2xl font-medium mb-3">Page Not Found</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        The page you are looking for does not exist.
      </p>
    </div>
  );
}

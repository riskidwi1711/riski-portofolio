import { useProfile } from "@/lib/api";
import { Code } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Footer = () => {
  const { data: profile, isLoading, isError } = useProfile();

  if (isLoading) {
    return (
      <footer className="border-t border-gray-800 bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-6 w-64" />
          </div>
        </div>
      </footer>
    );
  }

  if (isError || !profile) {
    return null; // Or a fallback minimal footer
  }

  return (
    <footer className="border-t border-gray-800 bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-orange-500 p-2">
              <Code className="h-6 w-6 text-black" />
            </div>
            <span className="text-xl font-bold text-white">{profile.name}</span>
          </div>
          <p className="text-gray-400 text-center sm:text-right">
            &copy; {new Date().getFullYear()} {profile.name}. Built with React, Tailwind CSS, and lots of ☕
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
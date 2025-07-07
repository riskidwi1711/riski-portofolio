import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="animate-pulse w-full max-w-4xl">
        {/* Hero Section Skeleton */}
        <div className="h-64 bg-gray-800 rounded-lg mb-8"></div>

        {/* Stats Section Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="h-24 bg-gray-800 rounded-lg"></div>
          <div className="h-24 bg-gray-800 rounded-lg"></div>
          <div className="h-24 bg-gray-800 rounded-lg"></div>
        </div>

        {/* Work Experience Section Skeleton */}
        <div className="h-48 bg-gray-800 rounded-lg mb-8"></div>

        {/* Technical Skills Section Skeleton */}
        <div className="h-48 bg-gray-800 rounded-lg mb-8"></div>

        {/* Projects Section Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="h-64 bg-gray-800 rounded-lg"></div>
          <div className="h-64 bg-gray-800 rounded-lg"></div>
          <div className="h-64 bg-gray-800 rounded-lg"></div>
        </div>

        {/* Contact Section Skeleton */}
        <div className="h-32 bg-gray-800 rounded-lg mb-8"></div>

        {/* Footer Skeleton */}
        <div className="h-24 bg-gray-800 rounded-lg"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;

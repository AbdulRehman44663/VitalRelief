import React from 'react';
import Link from 'next/link';

const PageNotFound = () => {
  // Don't render if there's no message

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-color-gray600">404</h1>
          <p className="mt-4 text-xl text-gray-700">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
          <p className="mt-2 text-gray-500">It seems you&apos;ve hit a dead end.</p>
          <Link href="/" className="mt-6 inline-block px-6 py-3 text-white bg-bgRed border border-[#5B8581]  rounded-lg hover:bg-bgRed focus:outline-none ">
              Go back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
import React, { useState, useEffect } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import BlogCard from "../ListingCard/BlogCard";
import SkeletonLoader from "../SkeletonLoader";

function BlogsList({ blog }) {
  const [loading, setLoading] = useState(false);
  const [blogData, setBlogData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4); // Number of blogs to show initially
  const [hasMore, setHasMore] = useState(true); // Flag to check if there are more blogs to load

  useEffect(() => {

    if (blog) {
      setBlogData(blog)
    }
  }, [blog])

  const loadMoreBlogs = () => {
    if (loading || !hasMore) return;

    setLoading(true);
    // Show the next set of blogs

    setTimeout(() => {
      const nextVisibleCount = visibleCount + 4; // Show 4 more blogs
      setVisibleCount(nextVisibleCount);

      // If all blogs are visible, disable the "Load More" button
      if (nextVisibleCount >= blogData.length) {
        setHasMore(false);
      }

      setLoading(false);

    }, 2000);
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-y-[64px] md:gap-x-12 mb-[64px]">

        {blogData.length > 0 ? (
          blogData.slice(1, visibleCount).map((item, index) => (
            <BlogCard item={item} key={index} />
          ))
        ) : (
          <p>No blogs available.</p>
        )}


        {/* Render skeletons for new blogs while loading */}
        {loading &&
          Array.from({ length: 4 }).map((_, index) => (
            <SkeletonLoader key={`skeleton-${index}`} />
          ))}

  
      </div>
      {hasMore && (
        <div className="pt-4 flex justify-center mb-10 md:mb-0">
          <button className="btn sec-outline-btn rounded-md py-3 px-6 fs-16-700-lato txt-color-darkgray w-full md:w-auto border-[#2F464B]"
            onClick={loadMoreBlogs}
            disabled={loading}
          >
            {loading ? "LOADING..." : "LOAD MORE"}
          </button>
        </div>
      )}

      {!hasMore && (
        <div className="pt-4 flex justify-center mb-10 md:mb-0 fs-17-700-lato txt-color-darkgray">
          <p >No more blogs to load.</p>
        </div>
      )}

    </div>
  );
}

export default BlogsList;

"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

const GalleriesListCardPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const supabase = createClient();

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("gallerys")
      .select(
        `
        *,
        gallery_images (image_url)
      `
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching galleries:", error.message);
      alert("Failed to fetch galleries. Please try again later.");
    } else {
      setPosts(data || []);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container p-4">
      <h1 className="text-2xl text-white font-bold p-2 mb-4 bg-gradient-to-r from-blue-700 to-white">
        ภาพกิจกรรม
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <a href={`/gallerys/${post.id}`} className="block">
              {post.gallery_images?.[0]?.image_url && (
                <img
                  src={post.gallery_images[0].image_url}
                  alt={`Image for ${post.title || "Gallery Image"}`}
                  className="w-full h-48 object-cover"
                />
              )}
            </a>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {post.title || "No Title"}
              </h2>
              <p className="text-gray-600 text-sm">
                {post.description.length > 50 ? (
                  <>
                    {post.description.slice(0, 50)}...
                    <a
                      href={`/gallerys/${post.id}`}
                      className="text-blue-500 hover:underline ml-1"
                    >
                      อ่านเพิ่มเติม
                    </a>
                  </>
                ) : (
                  post.description
                )}
              </p>
              <p className="text-gray-400 text-xs mt-2">
                {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleriesListCardPage;

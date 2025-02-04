"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

const GalleriesListPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const supabase = createClient();

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("gallerys")
      // .select('*')
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

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          {/* <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">Image</th>
              <th className="px-4 py-2 text-left font-semibold">Description</th>
              <th className="px-4 py-2 text-left font-semibold">Date</th>
            </tr>
          </thead> */}
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">
                  {/* แสดงเพียงภาพแรกใน gallery_images */}
                  {post.gallery_images?.[0]?.image_url && (
                     <a
                     href={`/gallerys/${post.id}`}
                     className="text-blue-500 hover:underline ml-1"
                   >
                    <img
                      src={post.gallery_images[0].image_url}
                      alt={`Image for ${post.title || "Gallery Image"}`}
                      className="w-64 h-48 object-cover
            transition-transform duration-300 hover:scale-110 rounded-lg shadow-md"
                    /> </a>
                  )}
                </td>
                <td className="px-2 py-2 text-left">
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
                </td>
                <td className="px-4 py-2">
                  {new Date(post.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GalleriesListPage;

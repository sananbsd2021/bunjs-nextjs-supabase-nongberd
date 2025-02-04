"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

const GalleriesLists = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const supabase = createClient();

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("news")
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

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this note?")) {
      const { error } = await supabase.from("news").delete().eq("id", id);
      if (error) console.error("Error deleting note:", error.message);
      fetchPosts();
    }
  };

  return (
    <div className="container p-4">
      <h1 className="text-2xl text-white font-bold p-2 mb-4 bg-gradient-to-r from-blue-700 to-white">
        ภาพกิจกรรม
      </h1>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">Image</th>
              <th className="px-4 py-2 text-left font-semibold">Description</th>
              <th className="px-4 py-2 text-left font-semibold">Date</th>
              <th className="px-2 py-2 text-left font-semibod">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">
                  {/* แสดงเพียงภาพแรกใน gallery_images */}
                  {post.gallery_images?.[0]?.image_url && (
                    <img
                      src={post.gallery_images[0].image_url}
                      alt={`Image for ${post.title || "Gallery Image"}`}
                      className="w-full h-32 object-cover rounded"
                    />
                  )}
                </td>
                <td className="px-4 py-2">
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
                <td>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GalleriesLists;

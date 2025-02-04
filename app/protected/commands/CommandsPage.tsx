"use client";

import { useState, useEffect } from "react";
import CommandsForm from "./CommandsForm";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const CommandsPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const supabase = createClient();
  const router = useRouter();

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("commands")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching news:", error.message);
    } else {
      setPosts(data || []);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleImageUpload = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "nongberd"); // Replace with your Cloudinary upload preset

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dja3yvewr/image/upload", // Replace with your Cloudinary URL
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      return data.secure_url || null; // Return the uploaded image's URL
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSubmit = async (
    title: string,
    description: string,
    file: File | null
  ) => {
    if (!file) {
      alert("Please upload an image.");
      return;
    }

    const uploadedImageUrl = await handleImageUpload(file);
    if (!uploadedImageUrl) {
      alert("Image upload failed. Please try again.");
      return;
    }

    const { error } = await supabase
      .from("commands")
      .insert([{ title, description, image_url: uploadedImageUrl }]);

    if (error) {
      console.error("Error creating post:", error.message);
    } else {
      fetchPosts(); // Refresh posts

      setTimeout(() => {
        router.push("/protected/commands"); // Redirect to /posts after 2 seconds
      }, 2000);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this note?")) {
      const { error } = await supabase.from("commands").delete().eq("id", id);
      if (error) console.error("Error deleting commands:", error.message);
      fetchPosts();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">เพิ่มบุคลากร</h1>
      <CommandsForm onSubmit={handleSubmit} />
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">Title</th>
              <th className="px-4 py-2 text-left font-semibold">Description</th>
              <th className="px-4 py-2 text-left font-semibold">Image</th>
              <th className="px-4 py-2 text-left font-semibold">Date</th>
              <th className="px-4 py-2 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{post.title}</td>
                <td className="px-4 py-2">{post.description}</td>
                <td className="px-4 py-2">
                  {post.image_url && (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      width={100}
                      height={100}
                      className="object-cover rounded"
                    />
                  )}
                </td>
                <td className="px-4 py-2">
                  {new Date(post.created_at).toLocaleString()}
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

export default CommandsPage;

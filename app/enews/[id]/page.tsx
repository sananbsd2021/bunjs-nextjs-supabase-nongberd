"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // Use this for dynamic parameters in app directory
import { createClient } from "@/utils/supabase/client";

import { BellRing, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import Link from "next/link";

const EnewsDetails = () => {
  const params = useParams(); // Access dynamic route parameters
  const { id } = params; // Get the `id` from the URL
  const router = useRouter();
  const supabase = createClient();

  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ title: "", description: "" });

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        setError(null);
        setLoading(true);

        const { data, error } = await supabase
          .from("enews")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw new Error("Error fetching post: " + error.message);
        }

        setPost(data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching the post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const { error } = await supabase.from("news").delete().eq("id", id);
      if (error) throw new Error("Error deleting post: " + error.message);

      alert("Post deleted successfully!");
      router.push("/protected/enews"); // Redirect after deletion
    } catch (err: any) {
      setError(err.message || "An error occurred while deleting the post.");
    }
  };

  const handleEditClick = () => {
    setEditingPostId(post.id);
    setEditForm({ title: post.title, description: post.description });
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditForm({ title: "", description: "" });
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const { error } = await supabase
        .from("posts")
        .update({ title: editForm.title, description: editForm.description })
        .eq("id", post.id);

      if (error) throw new Error("Error updating post: " + error.message);

      // Update the local state
      setPost({ ...post, ...editForm });

      // Exit edit mode
      handleCancelEdit();
    } catch (err: any) {
      setError(err.message || "An error occurred while updating the post.");
    }
  };

  if (loading) return <p>Loading post...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  if (!post) return <p>Post not found.</p>;

  return (
    <Card>
      <CardHeader className="text-3xl text-center text-bold">
        ข่าวสาร
      </CardHeader>
      <div className="container p-2">
        {editingPostId === post.id ? (
          <div>
            <h1 className="text-2xl font-bold mb-4">แก้ไขข่าวสาร</h1>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                หัวข้อข่าว
              </label>
              <input
                type="text"
                name="title"
                value={editForm.title}
                onChange={handleFormChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                รายละเอียดข่าวสาร
              </label>
              <textarea
                name="description"
                value={editForm.description}
                onChange={handleFormChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                บันทึก
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
            <p className="mb-4">{post.description}</p>
            {/* <p className="text-sm text-gray-500">User: {post.users_id}</p>            */}
          </div>
        )}
      </div>
    </Card>
  );
};

export default EnewsDetails;

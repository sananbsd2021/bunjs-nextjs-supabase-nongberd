"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // Use this for dynamic parameters in app directory
import { createClient } from "@/utils/supabase/client";

const BookBidDetailsPage = () => {
  const params = useParams(); // Access dynamic route parameters
  const { id } = params; // Get the `id` from the URL
  const router = useRouter();
  const supabase = createClient();

  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    numbid: "",
    date: "",
    topic: "",
    note: "",
  });

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        setError(null);
        setLoading(true);

        const { data, error } = await supabase
          .from("bookbidding")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw new Error("Error fetching bookbidding: " + error.message);
        }

        setPost(data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching the bookbidding.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this bookbidding?")) return;

    try {
      const { error } = await supabase.from("bookbidding").delete().eq("id", id);
      if (error) throw new Error("Error deleting bookbidding: " + error.message);

      alert("Bookbidding deleted successfully!");
      router.push("/bookbidding"); // Redirect after deletion
    } catch (err: any) {
      setError(err.message || "An error occurred while deleting the bookbidding.");
    }
  };

  const handleEditClick = () => {
    setEditingPostId(post.id);
    setEditForm({
      numbid: post.numbid,
      date: post.date,
      topic: post.topic,
      note: post.note,
    });
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditForm({
      numbid: "",
      date: "",
      topic: "",
      note: "",
    });
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };


  const handleUpdate = async () => {
    try {
      const { error } = await supabase
        .from("bookbidding") // Correct table name
        .update({
          numbid: editForm.numbid,
          date: editForm.date,
          topic: editForm.topic,
          note: editForm.note,
        })
        .eq("id", post.id);
  
      if (error) throw new Error("Error updating post: " + error.message);
  
      // Update the local state
      setPost({ ...post, ...editForm });
  
      // Exit edit mode
      handleCancelEdit();
    } catch (err: any) {
      console.error("Update Error Details:", err);
      setError(err.message || "An error occurred while updating the post.");
    }
  };
  

  if (loading) return <p>Loading post...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  if (!post) return <p>Post not found.</p>;

  return (
    <div className="container p-4">
      {editingPostId === post.id ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">Edit</h1>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              ที่คำสั่ง
            </label>
            <input
              type="text"
              name="numbid"
              value={editForm.numbid}
              onChange={handleFormChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
            type="date"
              name="date"
              value={editForm.date}
              onChange={handleFormChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
            เรื่อง
            </label>
            <input
            type="text"
              name="topic"
              value={editForm.topic}
              onChange={handleFormChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
            หมายเหตุ
            </label>
            <input
            type="text"
              name="note"
              value={editForm.note}
              onChange={handleFormChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">{post.numbid}</h1>
          <p className="mb-4">{post.date}</p>
          <p className="mb-4">{post.frombid}</p>
          <p className="mb-4">{post.tobid}</p>
          <p className="mb-4">{post.topic}</p>
          <p className="mb-4">{post.plan}</p>
          <p className="mb-4">{post.note}</p>
          <p className="text-sm text-gray-500">User ID: {post.users_id}</p>
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleEditClick}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookBidDetailsPage;

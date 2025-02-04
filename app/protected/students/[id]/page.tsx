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
    numstudent: "",
    fname: "",
    lname: "",
    age: "",
    gclass: "",
    plan: "",
    note: "",
  });

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        setError(null);
        setLoading(true);

        const { data, error } = await supabase
          .from("students")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw new Error("Error fetching students: " + error.message);
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
    if (!confirm("Are you sure you want to delete this students?")) return;

    try {
      const { error } = await supabase.from("students").delete().eq("id", id);
      if (error) throw new Error("Error deleting bookbidding: " + error.message);

      alert("Bookbidding deleted successfully!");
      router.push("/students"); // Redirect after deletion
    } catch (err: any) {
      setError(err.message || "An error occurred while deleting the bookbidding.");
    }
  };

  const handleEditClick = () => {
    setEditingPostId(post.id);
    setEditForm({
      numstudent: post.numstudent,
      fname: post.fname,
      lname: post.lname,
      age: post.age,
      gclass: post.gclass,
      plan: post.plan,
      note: post.note,
    });
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditForm({
      numstudent: "",
      fname: "",
      lname: "",
      age: "",
      gclass: "",
      plan: "",
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
        .from("bookreceive") // Correct table name
        .update({
          numstudent: editForm.numstudent,
          fname: editForm.fname,
          lname: editForm.lname,
          age: editForm.age,
          gclass: editForm.gclass,
          plan: editForm.plan,
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
    <div className="container p-4 w-full">
      {editingPostId === post.id ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">Edit</h1>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="numsudent"
              value={editForm.numstudent}
              onChange={handleFormChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              disabled
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
            From
            </label>
            <input
            type="text"
              name="fname"
              value={editForm.fname}
              onChange={handleFormChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
            To
            </label>
            <input
            type="text"
              name="lname"
              value={editForm.lname}
              onChange={handleFormChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
            Topic
            </label>
            <input
            type="text"
              name="age"
              value={editForm.age}
              onChange={handleFormChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
            Plan
            </label>
            <input
            type="text"
              name="gclass"
              value={editForm.gclass}
              onChange={handleFormChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
            Note
            </label>
            <input
            type="text"
              name="plan"
              value={editForm.plan}
              onChange={handleFormChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>     

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
            Note
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
        <div className="w-full">
          <label htmlFor="">numstudent</label>
          <h1 className="text-2xl font-bold mb-4">{post.numstudent}</h1>
          <label htmlFor="">fname</label>
          <p className="mb-4">{post.fname}</p>
          <label htmlFor="">lname</label>
          <p className="mb-4">{post.lname}</p>
          <label htmlFor="">age</label>
          <p className="mb-4">{post.age}</p>
          <label htmlFor="">gclass</label>
          <p className="mb-4">{post.gclass}</p>
          <label htmlFor="">plan</label>
          <p className="mb-4">{post.plan}</p>
          <label htmlFor="">note</label>
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

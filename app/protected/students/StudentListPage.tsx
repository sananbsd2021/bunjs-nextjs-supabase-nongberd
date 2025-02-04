"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

const StudentsListPage = () => {
  const supabase = createClient();
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setError(null);
        setLoading(true);

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError)
          throw new Error("Error fetching user: " + userError.message);
        if (!user) throw new Error("User not authenticated. Please log in.");

        const { data: postsData, error: postsError } = await supabase
          .from("students")
          .select("*")
          .eq("users_id", user.id);

        if (postsError)
          throw new Error("Error fetching posts: " + postsError.message);

        setPosts(postsData || []);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Delete post
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const { error } = await supabase.from("students").delete().eq("id", id);
      if (error) throw new Error("Error deleting post: " + error.message);

      // Update posts state after deletion
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (err: any) {
      setError(err.message || "An error occurred while deleting the post.");
    }
  };

  // Handle Edit Button Click
  const handleEditClick = (post: any) => {
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

  // Handle Cancel Edit
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

  // Handle Form Change
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Handle Update Post
  const handleUpdate = async (id: number) => {
    try {
      const { error } = await supabase
        .from("students")
        .update({ 
          numstudent: editForm.numstudent,
          fname: editForm.fname,
          lname: editForm.lname,
          age: editForm.age,
          gclass: editForm.gclass,
          plan: editForm.plan,
          note: editForm.note,
        })
        .eq("id", id);

      if (error) throw new Error("Error updating post: " + error.message);

      // Update the post in the local state
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id ? { ...post, ...editForm } : post
        )
      );

      // Reset editing state
      handleCancelEdit();
    } catch (err: any) {
      setError(err.message || "An error occurred while updating the post.");
    }
  };

  if (loading) return <p>Loading posts...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">นักเรียน</h2>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">รหัสนักเรียน</th>
              <th className="border border-gray-300 px-4 py-2">ชื่อ</th>
              <th className="border border-gray-300 px-4 py-2">นามสกุล</th>
              <th className="border border-gray-300 px-4 py-2">อายุ</th>
              <th className="border border-gray-300 px-4 py-2">ชั้น</th>
              <th className="border border-gray-300 px-4 py-2">แผน</th>
              <th className="border border-gray-300 px-4 py-2">รายละเอียด</th>
              {/* <th className="border border-gray-300 px-4 py-2">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {editingPostId === post.id ? (
                    <input
                      type="text"
                      name="numstudent"
                      value={editForm.numstudent}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    post.numstudent
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingPostId === post.id ? (
                    <textarea
                      name="fname"
                      value={editForm.fname}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    post.fname
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingPostId === post.id ? (
                    <textarea
                      name="lname"
                      value={editForm.lname}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    post.lname
                  )}
                  </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingPostId === post.id ? (
                    <textarea
                      name="age"
                      value={editForm.age}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    post.age
                  )}
                  </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingPostId === post.id ? (
                    <textarea
                      name="gclass"
                      value={editForm.gclass}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    post.gclass
                  )}
                  </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingPostId === post.id ? (
                    <textarea
                      name="plan"
                      value={editForm.plan}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    post.plan
                  )}
                  </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingPostId === post.id ? (
                    <textarea
                      name="note"
                      value={editForm.note}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    post.note
                  )}
                  </td>

                {/* <td className="border border-gray-300 px-4 py-2 text-center">
                  {editingPostId === post.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(post.id)}
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
                  ) : (
                    <button
                      onClick={() => handleEditClick(post)}
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td> */}

                <td>
                  <Link href={`/protected/students/${post.id}`} className="px-4 py-2 bg-gray-600 text-white rounded">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentsListPage;

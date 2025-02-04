"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import PostsList from "./PostsListPage";

const PostsForm = () => {
  const supabase = createClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!user) {
        throw new Error("You must be logged in to submit a post.");
      }

      const { error } = await supabase.from("posts").upsert({
        users_id: user.id,
        title,
        description,
      });

      if (error) {
        throw error;
      }

      alert("Post submitted successfully!");
      setTitle("");
      setDescription("");
    } catch (err: any) {
      setError(err.message || "An error occurred while submitting the post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className="container p-4">
      <h1 className="text-2xl font-bold mb-4">Add or Update Post</h1>

      {user ? (
        <div className="mb-4">
          <p className="text-sm text-gray-700">Logged in as: {user.email}</p>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-700 mb-4">Please log in to continue.</p>
      )}

      <form onSubmit={handleSubmit}>
        {/* Title Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
            disabled={isSubmitting || !user}
          >
            {isSubmitting ? "Submitting..." : "Submit Post"}
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Use PostsList */}
      <PostsList />
    </div>
  );
};

export default PostsForm;

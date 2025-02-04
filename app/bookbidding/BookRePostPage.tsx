"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation"; // For redirecting users

const supabase = createClient();

const PostsFormBookRe = () => {
  const router = useRouter(); // For navigation
  const [numreceive, setNumreceive] = useState("");
  const [date, setDate] = useState("");
  const [fromreceive, setFromreceive] = useState("");
  const [toreceive, setToreceive] = useState("");
  const [topic, setTopic] = useState("");
  const [plan, setPlan] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
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

      const { error } = await supabase.from("bookreceive").upsert({
        users_id: user.id,
        numreceive,
        date,
        fromreceive,
        toreceive,
        topic,
        plan,
        note,
      });

      if (error) {
        throw error;
      }

      alert("Post submitted successfully!");

      // Reset form fields on success
      setNumreceive("");
      setDate("");
      setFromreceive("");
      setToreceive("");
      setTopic("");
      setPlan("");
      setNote("");
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
        <div className="mb-4">
          <label className="block text-sm font-medium">Num Receive</label>
          <input
            type="text"
            value={numreceive}
            onChange={(e) => setNumreceive(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">From Receive</label>
          <input
            type="text"
            value={fromreceive}
            onChange={(e) => setFromreceive(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">To Receive</label>
          <input
            type="text"
            value={toreceive}
            onChange={(e) => setToreceive(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Topic</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Plan</label>
          <input
            type="text"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Note</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default PostsFormBookRe;

"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation"; // For redirecting users

const supabase = createClient();

const PostsFormNews = () => {
  const router = useRouter(); // For navigation
  const [numsend, setNumsend] = useState("");
  const [date, setDate] = useState("");
  const [fromsend, setFromsend] = useState("");
  const [tosend, setTosend] = useState("");
  const [topic, setTopic] = useState("");
  const [plan, setPlan] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserAndNumReceive = async () => {
      try {
        // Get logged-in user
        const { data: authData } = await supabase.auth.getUser();
        setUser(authData.user);

        // Fetch the highest `numreceive` from the table
        const { data, error } = await supabase
          .from("booksend")
          .select("numsend")
          .order("numsend", { ascending: false })
          .limit(1);

        if (error) throw error;

        const highestNum = data?.[0]?.numsend || "0000";
        const nextNum = (parseInt(highestNum, 10) + 1).toString().padStart(4, "0");

        setNumsend(nextNum);
      } catch (err) {
        setError("Error fetching initial data.");
        console.error(err);
      }
    };

    fetchUserAndNumReceive();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!user) {
        throw new Error("You must be logged in to submit a post.");
      }

      // Check if `numreceive` already exists
      const { data: existingData, error: checkError } = await supabase
        .from("booksend")
        .select("numsend")
        .eq("numsend", numsend);

      if (checkError) throw checkError;
      if (existingData.length > 0) {
        throw new Error("This Num Receive already exists. Please use a different one.");
      }

      // Insert or update the record
      const { error } = await supabase.from("booksend").upsert({
        users_id: user.id,
        numsend,
        date,
        fromsend,
        tosend,
        topic,
        plan,
        note,
      });

      if (error) {
        throw error;
      }

      alert("Post submitted successfully!");

      // Reset form fields on success
      setNumsend((prev) =>
        (parseInt(prev, 10) + 1).toString().padStart(4, "0")
      );
      setDate("");
      setFromsend("");
      setTosend("");
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
          <label className="block text-sm font-medium">เลขทะบียนส่ง</label>
          <input
            type="text"
            value={numsend}
            onChange={(e) => setNumsend(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
            readOnly
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">วันที่</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">จาก</label>
          <input
            type="text"
            value={fromsend}
            onChange={(e) => setFromsend(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">ถึง</label>
          <input
            type="text"
            value={tosend}
            onChange={(e) => setTosend(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">เรื่อง</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">การปฏิบัติ</label>
          <input
            type="text"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">หมายเหตุ</label>
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
    </div>
  );
};

export default PostsFormNews;

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

const supabase = createClient();

const BookReListPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the authenticated user on component mount
  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;

        setUser(userData?.user);

        if (userData?.user) {
          // Fetch posts associated with the logged-in user
          const { data: postsData, error: postsError } = await supabase
            .from("bookreceive")
            .select("*")
            .eq("users_id", userData.user.id);

          if (postsError) throw postsError;
          setPosts(postsData || []);
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container p-4">
      <h1 className="text-2xl font-bold mb-4">ทะเบียนรับหนังสือ</h1>

      {user ? (
        posts.length > 0 ? (
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">เลขทะเบียนรับ</th>
                <th className="border border-gray-300 px-4 py-2">วันที่</th>
                <th className="border border-gray-300 px-4 py-2">จาก</th>
                <th className="border border-gray-300 px-4 py-2">ถึง</th>
                <th className="border border-gray-300 px-4 py-2">เรื่อง</th>
                <th className="border border-gray-300 px-4 py-2">การปฏิบัติ</th>
                <th className="border border-gray-300 px-4 py-2">หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{post.numreceive}</td>
                  <td className="border border-gray-300 px-4 py-2">{post.date}</td>
                  <td className="border border-gray-300 px-4 py-2">{post.fromreceive}</td>
                  <td className="border border-gray-300 px-4 py-2">{post.toreceive}</td>
                  <td className="border border-gray-300 px-4 py-2">{post.topic}</td>
                  <td className="border border-gray-300 px-4 py-2">{post.plan}</td>
                  <td className="border border-gray-300 px-4 py-2">{post.note}</td>
                  <td>
                  <Link href={`/protected/bookre/${post.id}`} className="px-4 py-2 bg-gray-600 text-white rounded">View</Link>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No posts found.</p>
        )
      ) : (
        <p>Please log in to view your posts.</p>
      )}
    </div>
  );
};

export default BookReListPage;

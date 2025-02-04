"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

const ShowNewsListPage = () => {
  const supabase = createClient();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("news")
          .select("id, title, description, users_id");

        if (error) {
          throw error;
        }

        setPosts(data || []);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }
  
  return (
    <div className="container p-4">
      <h1 className="text-2xl font-bold mb-4">ข่าวการศึกษา</h1>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          {/* <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">User ID</th>
            </tr>
          </thead> */}
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                {/* <td className="border border-gray-300 px-4 py-2">{post.id}</td> */}
                <td className="border border-gray-300 px-4 py-2">{post.title}</td>
                {/* <td className="border border-gray-300 px-4 py-2">{post.description}</td> */}
                <td className="border border-gray-300 px-4 py-2">
                  {post.description.length > 100 ? (
                    <>
                      {post.description.slice(0, 100)}...
                      <a
                        href={`/news/${post.id}`}
                        className="text-blue-500 hover:underline ml-1"
                      >
                        อ่านเพิ่มเติม
                      </a>
                    </>
                  ) : (
                    post.description
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">{post.users_id}</td>
                <td>
                  <Link href={`/protected/news/${post.id}`} className="px-4 py-2 bg-gray-600 text-white rounded">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowNewsListPage;


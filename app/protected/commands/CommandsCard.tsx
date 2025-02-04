"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client"; // Connect to Supabase

const CommandsCardPage = () => {
  const [posts, setPosts] = useState<any[]>([]); // To store posts data
  const supabase = createClient();

  // Fetch posts from Supabase
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("commands") // Table name
      .select("*") // Select all data
      .order("created_at", { ascending: false }); // Sort by newest first

    if (error) {
      console.error("Error fetching commands:", error.message);
    } else {
      setPosts(data || []); // Store posts in state
    }
  };

  useEffect(() => {
    fetchPosts(); // Fetch posts on component load
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-white font-bold p-2 mb-4 bg-gradient-to-r from-blue-700 to-white">
        บุคลากร
      </h1>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            {/* {post.image_url && (
              <img
                src={post.image_url}
                alt={post.title}
                width={200}
                height={200}
                className="w-full h-48 object-cover"
              />
            )} */}

            {post.image_url && (
              <div className="w-86 h-86 overflow-hidden rounded-md">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}

            <div className="p-4">
              <h2 className="text-lg font-bold mb-2 text-center">{post.title}</h2>
              <p className="text-gray-600 mb-4 text-center">{post.description}</p>
              {/* <p className="text-sm text-gray-500">
                {new Date(post.created_at).toLocaleDateString()}
              </p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommandsCardPage;

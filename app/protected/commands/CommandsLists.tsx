'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client'; // เชื่อมต่อกับ Supabase

const CommandsListPage = () => {
  const [posts, setPosts] = useState<any[]>([]); // ใช้เพื่อเก็บข้อมูลโพสต์
  const supabase = createClient();

  // ดึงข้อมูลโพสต์จาก Supabase
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('commands')  // ชื่อตารางที่คุณเก็บโพสต์
      .select('*')  // เลือกข้อมูลทั้งหมด
      .order('created_at', { ascending: false });  // เรียงตามวันที่สร้างใหม่สุด

    if (error) {
      console.error('Error fetching commands:', error.message);
    } else {
      setPosts(data || []); // เก็บข้อมูลโพสต์ใน state
    }
  };

  useEffect(() => {
    fetchPosts(); // เรียกใช้ฟังก์ชั่น fetchPosts เมื่อ component โหลด
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-4">News List</h1> */}
      <h1 className="text-2xl text-white font-bold p-2 mb-1 bg-gradient-to-r from-blue-700 to-white">
        ข่าวสาร
      </h1>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          {/* <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">Title</th>
              <th className="px-4 py-2 text-left font-semibold">Description</th>
              <th className="px-4 py-2 text-left font-semibold">Image</th>
              <th className="px-4 py-2 text-left font-semibold">Date</th>
            </tr>
          </thead> */}
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b hover:bg-gray-50">
                {/* <td className="px-4 py-2">{post.title}</td> */}
                <td className="px-4 py-2">
                  {post.image_url && (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      width={100}
                      height={100}
                      className="object-cover rounded"
                    />
                  )}
                </td>
                <td className="px-4 py-2">{post.description}</td>
                <td className="px-4 py-2">
                  {new Date(post.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommandsListPage;

'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

const GalleryDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [images, setImages] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // Index of selected image
  const [loading, setLoading] = useState<boolean>(true);
  const supabase = createClient();

  const fetchPostDetails = async () => {
    if (!id) return;

    const { data, error } = await supabase
      .from('news')
      .select(`
        *,
        gallery_images (image_url)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching gallery details:', error.message);
      alert('Failed to fetch gallery details.');
      setLoading(false);
    } else {
      setPost(data);
      setImages(data.gallery_images || []);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, [id]);

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  if (loading) {
    return <div className="container p-4 text-gray-500">Loading...</div>;
  }

  if (!post) {
    return <div className="container p-4 text-red-500">Gallery not found.</div>;
  }

  return (
    <div className="container p-4">
      <h1 className="text-2xl font-bold mb-4">{post.title || 'Gallery Detail'}</h1>
      <p className="text-gray-600 mb-4">{post.description}</p>

      {/* Display Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.image_url}
            alt={`Image ${index + 1}`}
            className="w-full h-48 object-cover rounded shadow cursor-pointer"
            onClick={() => setSelectedIndex(index)} // Set the index of the selected image
          />
        ))}
      </div>

      {/* Modal with Image Carousel */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedIndex(null)} // Close modal when clicking outside
        >
          <div className="relative flex items-center justify-center">
            <img
              src={images[selectedIndex].image_url}
              alt="Selected Image"
              className="max-w-full max-h-screen rounded"
            />
            <button
              className="absolute top-2 right-2 bg-white text-black p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation(); // Prevent modal close
                setSelectedIndex(null);
              }}
            >
              ✕
            </button>

            {/* Navigation Buttons */}
            {selectedIndex > 0 && (
              <button
                className="absolute left-4 bg-white text-black p-2 rounded-full"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent modal close
                  handlePrevious();
                }}
              >
                ◀
              </button>
            )}
            {selectedIndex < images.length - 1 && (
              <button
                className="absolute right-4 bg-white text-black p-2 rounded-full"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent modal close
                  handleNext();
                }}
              >
                ▶
              </button>
            )}
          </div>
        </div>
      )}

      <p className="text-sm text-gray-500 mt-4">
        Created on: {new Date(post.created_at).toLocaleDateString()}
      </p>
    </div>
  );
};

export default GalleryDetailPage;

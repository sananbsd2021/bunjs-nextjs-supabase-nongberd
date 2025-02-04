"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

const CLOUDINARY_UPLOAD_PRESET = "nongberd";
const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dja3yvewr/image/upload";

const AddGalleryForm = () => {
  const supabase = createClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // แสดงตัวอย่างภาพ
  const handleImageChange = (files: FileList | null) => {
    if (!files) return;

    const newImages = Array.from(files);
    const newPreviews = newImages.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...newImages]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  // ลบภาพออกจากรายการ
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImagesToCloudinary = async (files: File[]): Promise<string[]> => {
    const promises = files.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      return fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      }).then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error?.message || "Failed to upload image");
        }
        return data.secure_url;
      });
    });

    return Promise.all(promises);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const { data: galleryData, error: galleryError } = await supabase
        .from("gallerys")
        .insert({ title, description })
        .select("*")
        .single();

      if (galleryError) {
        throw new Error(galleryError.message);
      }

      const galleryId = galleryData.id;
      const uploadedImageUrls = await uploadImagesToCloudinary(images);

      if (uploadedImageUrls.length > 0) {
        const { error: imageError } = await supabase
          .from("gallery_images")
          .insert(
            uploadedImageUrls.map((url) => ({
              gallery_id: galleryId,
              image_url: url,
            }))
          );

        if (imageError) {
          throw new Error(imageError.message);
        }
      }

      alert("Gallery added successfully!");
      setTitle("");
      setDescription("");
      setImages([]);
      setImagePreviews([]);
    } catch (err) {
      // setError(err.message || "An error occurred while adding the gallery.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default behavior
    console.log("Back button clicked");
    window.history.back(); // Navigate back
  };

  return (
    <div className="container p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Gallery</h1>

      <button
        type="button"
        onClick={handleBack}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Back
      </button>
      
      <form onSubmit={handleSubmit}>
        {/* Title */}
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

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Upload Images */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Upload Images</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e.target.files)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            multiple
          />
        </div>

        {/* Preview Images */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview}
                alt={`Preview ${index}`}
                className="w-full h-32 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Add Gallery"}
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default AddGalleryForm;

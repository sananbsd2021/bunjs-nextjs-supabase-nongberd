"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

const ProfileForm = () => {
  const supabase = createClient();
  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ตรวจสอบผู้ใช้ที่ล็อกอิน
  useEffect(() => {
    const fetchUser = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      
        if (user) {
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("users_id", user.id)
            .maybeSingle(); // เปลี่ยนจาก single() เป็น maybeSingle()
      
          if (profile) {
            setDisplayName(profile.display_name || "");
            setAvatarUrl(profile.avatar_url || "");
          } else {
            console.warn("No profile found for the current user.");
          }
      
          if (error) {
            console.error("Profile fetch error:", error.message);
          }
        }
      };     

    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!user) {
        throw new Error("You must be logged in to update your profile.");
      }

      const { error } = await supabase
        .from("profiles")
        .upsert({
          users_id: user.id,
          display_name: displayName,
          avatar_url: avatarUrl,
        })
        .select();

      if (error) {
        throw error;
      }

      alert("Profile updated successfully!");
    } catch (err: any) {
      setError(err.message || "An error occurred while updating your profile.");
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
      <h1 className="text-2xl font-bold mb-4">Update Profile</h1>

      {/* ตรวจสอบสถานะล็อกอิน */}
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
        <p className="text-sm text-gray-700 mb-4">You must log in to continue.</p>
      )}

      <form onSubmit={handleSubmit}>
        {/* Display Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Avatar URL */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Avatar URL</label>
          <input
            type="text"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
            disabled={isSubmitting || !user}
          >
            {isSubmitting ? "Submitting..." : "Update Profile"}
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default ProfileForm;

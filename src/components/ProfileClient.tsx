"use client"; 
import { useState } from "react";

export default function ProfileClient({
  profile,
  posts,
  handleUpdateProfile,
  handleEditPost,
  handleDeletePost,
}) {
  const [userName, setUserName] = useState(profile?.user_name || "");
  const [bio, setBio] = useState(profile?.bio || "");

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Update Profile</h2>
      <p className="mb-6 text-gray-600">Welcome to your profile page.</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.set("user_name", userName);
          formData.set("bio", bio);
          handleUpdateProfile(formData);
        }}
        className="space-y-4"
      >
        <input
          name="user_name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Username"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <textarea
          name="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        ></textarea>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>

      <h3 className="text-xl font-semibold mt-10 mb-4 text-gray-800">
        Your Posts
      </h3>

      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            className="mb-6 p-4 bg-gray-50 border border-gray-300 rounded-lg"
          >
            <h4 className="text-lg font-medium mb-2">{post.user_name}</h4>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditPost(post.id, e.target.elements.content.value);
              }}
            >
              <textarea
                name="content"
                defaultValue={post.content}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              ></textarea>
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => handleDeletePost(post.id)}
                  className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        ))
      ) : (
        <p className="text-gray-600">You have not posted anything yet.</p>
      )}
    </div>
  );
}

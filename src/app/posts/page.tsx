import { connect } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export default async function Posts() {
  // get the user ID from clerk
  const { userId } = auth(); //string from SignedInAuthObject
  const db = connect();
  //console.log("*********", userId);
  const posts = await db.query(`
    SELECT      
        posts.id,
        profiles.user_name,
        posts.content
        FROM posts
    INNER JOIN profiles ON posts.clerk_user_id = profiles.clerk_user_id;
    `);

  async function handleCreatePost(formData: FormData) {
    "use server";
    const db = connect();
    // get the content from the form
    const content = formData.get("content");
    // add the post to the database
    await db.query(
      `INSERT INTO posts (clerk_user_id, content) VALUES ($1, $2)`,
      [userId, content]
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Posts</h2>
  
      <h3 className="text-xl font-semibold mb-2">Add New Post</h3>
      <form action={handleCreatePost} className="space-y-4">
        <textarea
          name="content"
          placeholder="New Post"
          className="w-full h-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        ></textarea>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Submit
        </button>
      </form>
  
      <h3 className="text-xl font-semibold mt-8 mb-4">All Posts</h3>
      {posts.rows.map((post) => {
        return (
          <div key={post.id} className="mb-6 p-4 border rounded-lg bg-gray-50">
            <h4 className="text-lg font-medium text-gray-700">{post.user_name} says:</h4>
            <p className="mt-2 text-black">{post.content}</p>
          </div>
        );
      })}
    </div>
  );
  
}

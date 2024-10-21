"use server";
import { connect } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import ProfileClient from "@/components/ProfileClient";

const { userId } = auth();
const db = connect();
export async function handleUpdateProfile(formData: FormData, profile) {
  "use server";
  const user_name = formData.get("user_name");
  const bio = formData.get("bio");

  try {
    if (!profile) {
      await db.query(
        `INSERT INTO profiles (clerk_user_id, user_name, bio) VALUES ($1, $2, $3)`,
        [userId, user_name, bio]
      );
    } else {
      await db.query(
        `UPDATE profiles SET user_name=$1, bio=$2 WHERE clerk_user_id=$3`,
        [user_name, bio, userId]
      );
    }
  } catch (error) {
    console.error("Error updating profile: ", error);
  }
}

export async function handleEditPost(postId: number, formData: FormData) {
  "use server";
  try {
    const content = formData.get("content");
    await db.query(
      `UPDATE posts SET content=$1 WHERE id=$2 AND clerk_user_id=$3`,
      [content, postId, userId]
    );
  } catch (error) {
    console.error("Error updating post: ", error);
  }
}

export async function handleDeletePost(postId: number) {
  "use server";
  try {
    await db.query(`DELETE FROM posts WHERE id=$1 AND clerk_user_id=$2`, [
      postId,
      userId,
    ]);
  } catch (error) {
    console.error("Error deleting post: ", error);
  }
}

export default async function Profile() {
  const { userId } = auth();
  const db = connect();

  const profileResult = await db.query(
    `SELECT * FROM profiles WHERE clerk_user_id = $1`,
    [userId]
  );
  const profile = profileResult.rows[0] || null;

  const postsResult = await db.query(
    `SELECT * FROM posts WHERE clerk_user_id = $1`,
    [userId]
  );
  const posts = postsResult.rows; // the list of posts {} so we can map over it

  return <ProfileClient profile={profile} posts={posts} />;
}

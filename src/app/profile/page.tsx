"use server";
import { connect } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import ProfileClient from "@/components/ProfileClient";

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

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-6">
      <h1 className="text-4xl font-bold mb-8 text-white-900">
        Welcome to the Social Network
      </h1>

      <SignedIn>
        <div className="text-center space-y-4">
          <p className="text-lg text-white-700">
            You are signed in!{" "}
            <Link href="/profile" className="text-blue-500 hover:underline">
              Go to your profile
            </Link>
          </p>
          <p className="text-lg text-white-700">
            Visit the{" "}
            <Link href="/posts" className="text-blue-500 hover:underline">
              timeline
            </Link>
          </p>
        </div>
      </SignedIn>

      <SignedOut>
        <p className="text-lg text-red-500 mt-6">
          Please{" "}
          <span className="text-lg text-blue-500 mt-6">
            {" "}
            <SignInButton />
          </span>{" "}
          to continue.
        </p>
      </SignedOut>
    </div>
  );
}

import Link from "next/link";


export default function Nav() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="/posts">Timeline</Link>
        </li>
      </ul>
    </div>
  );
}

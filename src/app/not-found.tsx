import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <p>Sorry, this is not a valid page!!</p>
      <Link href="/">Back to safety</Link>
    </>
  );
}

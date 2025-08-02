"use client";
import { useRouter } from "next/navigation";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => router.push("/")}>Go to Homepage</button>
      </body>
    </html>
  );
}

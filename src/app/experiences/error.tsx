"use client";
import { isDebug } from "@/lib/environment";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();
  useEffect(() => {
    isDebug() && console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => router.push("/experiences")}>
        Go to Experiences
      </button>
    </div>
  );
}

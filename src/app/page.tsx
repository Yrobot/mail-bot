"use client";
import toast from "@/toast";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button
        className="btn"
        onClick={() => {
          toast.success("hello world");
        }}
      >
        Button
      </button>
    </main>
  );
}

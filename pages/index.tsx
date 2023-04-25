import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <main className="flex flex-row min-h-full justify-between items-stretch">
        <button onClick={() => router.push("/leaderboard")}>Leaderboard</button>
        <button onClick={() => router.push("/versus")}>Versus</button>
      </main>
    </>
  );
}

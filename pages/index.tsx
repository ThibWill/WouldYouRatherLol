import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <main className="flex flex-col">
        <div className="flex flex-col gap-32 pt-40 text-xl">
          <button
            className="w-96 h-20 ml-36 bg-blue-secondary rounded-md hover:bg-blue-primary hover:text-white"
            onClick={() => router.push("/leaderboard")}
          >
            Leaderboard
          </button>
          <button
            className="w-96 h-20 ml-36 bg-blue-secondary rounded-md hover:bg-blue-primary hover:text-white"
            onClick={() => router.push("/versus")}
          >
            Versus
          </button>
        </div>
      </main>
      <div className="grow"></div>
    </>
  );
}

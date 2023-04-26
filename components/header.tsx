import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  return (
    <>
      <header className="flex justify-start w-full h-16 bg-blue-primary">
        <span
          className="text-xl text-white pt-4 ml-8 cursor-pointer"
          onClick={() => router.push("/")}
        >
          Versus
        </span>
      </header>
    </>
  );
}

import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const allHands = await prisma.hand.findMany();

  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1>Keep or Mulligan?</h1>
      <h2>Hands:</h2>
      <ul>
        {allHands.map((hand) => (
          <li key={hand.id}>
            <Link href={`/hand/${hand.id}`}>Hand {hand.id}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

import WithCardImageBackground from "@/components/WithCardImageBackground";
import prisma from "@/lib/prisma";
import Link from "next/link";
import HandPage from "./hand/[id]/page";

export default async function Home() {
  const allHands = await prisma.hand.findMany();
  const handOfTheDayId = allHands[0].id;

  return (
    <WithCardImageBackground cardName="Searing Blaze">
      <div className="p-24">
        <ol className="flex gap-12 flex-wrap justify-center">
          {["Draw a hand", "Keep or Mulligan?", "Learn with stats"].map(
            (step) => (
              <li
                key={step}
                className="aspect-square w-40 backdrop-blur rounded-2xl flex items-center justify-center border border-white/20 bg-white/5"
              >
                {step}
              </li>
            )
          )}
        </ol>
        <h2>Hand of the day</h2>
        <HandPage params={{ id: handOfTheDayId }} />

        <h2>All hands</h2>
        <ul>
          {allHands.map((hand) => (
            <li key={hand.id}>
              <Link href={`/hand/${hand.id}`}>Hand {hand.id}</Link>
            </li>
          ))}
        </ul>
      </div>
    </WithCardImageBackground>
  );
}

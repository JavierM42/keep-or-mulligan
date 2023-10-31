import HandComponent from "@/components/HandComponent";
import HandDecision from "@/components/HandDecision";
import WithCardImageBackground from "@/components/WithCardImageBackground";
import prisma from "@/lib/prisma";
import Link from "next/link";

const startDay = new Date("2023-10-31");

export default async function Home() {
  const allHands = await prisma.hand.findMany();
  const millisecondsSinceStart = (new Date() as any) - (startDay as any);
  const daysSinceStart = Math.floor(
    millisecondsSinceStart / (1000 * 60 * 60 * 24)
  );
  const handOfTheDayId = allHands[daysSinceStart % allHands.length].id;
  const handOfTheDay = await prisma.hand.findUniqueOrThrow({
    where: { id: handOfTheDayId },
  });

  return (
    <WithCardImageBackground cardName={handOfTheDay.cards[0]}>
      <div className="p-24 space-y-24">
        <div className="p-12 backdrop-blur rounded-2xl border border-white/20 bg-white/5 flex flex-col gap-12 items-center w-fit mx-auto">
          Make better mulligan decisions based on data.
        </div>

        <div className="p-12 backdrop-blur rounded-2xl border border-white/20 bg-white/5 flex flex-col gap-12 items-center w-fit mx-auto">
          <div className="flex flex-col gap-1 items-center">
            <h2 className="font-bold text-lg">Hand of the day:</h2>
            <p>
              {handOfTheDay.formatName} {handOfTheDay.deckName},{" "}
              {handOfTheDay.onThePlay ? "going first" : "going second"}.
            </p>
          </div>
          <HandComponent cardNames={handOfTheDay.cards} display="row" />
          <HandDecision handId={handOfTheDayId} />
        </div>

        <div className="p-12 backdrop-blur rounded-2xl border border-white/20 bg-white/5 flex flex-col gap-12 items-center w-fit mx-auto">
          <h2 id="hands">All hands</h2>
          <ul>
            {allHands.map((hand) => (
              <li key={hand.id}>
                <Link href={`/hand/${hand.id}`}>Hand {hand.id}</Link>
              </li>
            ))}
          </ul>
          <p>Hand submission coming soon!</p>
        </div>
      </div>
    </WithCardImageBackground>
  );
}

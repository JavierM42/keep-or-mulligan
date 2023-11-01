import HandComponent from "@/components/HandComponent";
import HandDecision from "@/components/HandDecision";
import WithCardImageBackground from "@/components/WithCardImageBackground";
import prisma from "@/lib/prisma";
import { Hand } from "@prisma/client";
import { groupBy } from "lodash";
import Link from "next/link";

const startDay = new Date("2023-10-31");

export default async function Home() {
  const allHands = await prisma.hand.findMany();
  const millisecondsSinceStart = (new Date() as any) - (startDay as any);
  const daysSinceStart = Math.floor(
    millisecondsSinceStart / (1000 * 60 * 60 * 24)
  );
  if (!allHands.length) return <div>missing init</div>;

  const handOfTheDayId = allHands[daysSinceStart % allHands.length].id;
  const handOfTheDay = await prisma.hand.findUniqueOrThrow({
    where: { id: handOfTheDayId },
  });

  const handsByFormat: Record<string, Hand[]> = groupBy(allHands, "formatName");

  return (
    <WithCardImageBackground cardName={handOfTheDay.cards[0]}>
      <div className="p-4 lg:p-24 space-y-24">
        <div className="p-12 backdrop-blur rounded-2xl border border-white/20 bg-white/5 flex flex-col gap-12 items-center w-full max-w-4xl mx-auto">
          <div className="flex flex-col gap-1 items-center">
            <h2 className="font-bold text-lg">Hand of the day:</h2>
            <p>
              {handOfTheDay.formatName}, {handOfTheDay.deckName},{" "}
              {handOfTheDay.onThePlay ? "going first" : "going second"}.
            </p>
            <p>{handOfTheDay.notes}</p>
          </div>
          <Link href={`/hand/${handOfTheDay.id}`}>
            <HandComponent cardNames={handOfTheDay.cards} display="row" />
          </Link>
          <HandDecision handId={handOfTheDayId} />
        </div>

        <div className="px-8 py-4 backdrop-blur rounded-2xl border border-white/20 bg-white/5 flex flex-col gap-12 items-center w-full max-w-4xl mx-auto">
          <h2 id="hands" className="text-lg font-bold">
            All hands
          </h2>
          <ul className="w-full">
            {Object.entries(handsByFormat).map(([formatName, hands]) => (
              <li key={formatName}>
                <h3 className="text-lg mb-2">{formatName}</h3>
                <ul className="w-full overflow-x-auto flex gap-4 snap-x pb-3">
                  {hands.map((hand) => (
                    <li key={hand.id} className="contents">
                      <Link
                        href={`/hand/${hand.id}`}
                        className="hover:bg-white/20 transition-colors cursor-pointer px-4 py-2 backdrop-blur shrink-0 snap-start rounded-xl border border-white/20 bg-white/5 w-80 aspect-video no-underline flex items-center justify-center flex-col gap-2"
                      >
                        {hand.deckName}
                        <HandComponent
                          cardNames={hand.cards}
                          display="small-row"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p>Hand submission coming soon!</p>
        </div>
      </div>
    </WithCardImageBackground>
  );
}

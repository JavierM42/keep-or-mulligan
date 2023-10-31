import HandComponent from "@/components/HandComponent";
import WithCardImageBackground from "@/components/WithCardImageBackground";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function HandStatsPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { keep?: string };
}) {
  const hand = await prisma.hand.findUnique({
    where: { id: params.id },
    include: { decisions: true },
  });

  if (!hand) return notFound();

  const totalDecisions = hand.decisions.length;
  const keepPercentage = Math.round(
    (hand.decisions.reduce(
      (acc, decision) => (decision.keep ? acc + 1 : acc),
      0
    ) /
      totalDecisions) *
      100
  );
  const mulliganPercentage = 100 - keepPercentage;

  const didKeep = searchParams.keep === "true";
  const majorityKeep = keepPercentage > mulliganPercentage;
  const majorityMulligan = mulliganPercentage > keepPercentage;

  return (
    <WithCardImageBackground cardName={hand.cards[0]}>
      <div className="flex flex-col items-center justify-center gap-12 py-24 w-full h-full">
        <HandComponent cardNames={hand.cards} />
        <div className="flex flex-col items-center gap2">
          <p>
            On the {hand.onThePlay ? "play" : "draw"} with {hand.deckName} in{" "}
            {hand.formatName}.
          </p>
          <p>
            {didKeep ? "You kept" : "You mulliganed"}
            {didKeep
              ? majorityKeep
                ? ", and so did most users. Congratulations!"
                : "."
              : majorityMulligan
              ? ", and so did most users. Congratulations!"
              : "."}
          </p>
        </div>
        <div className="w-1/2 h-12 rounded-2xl shadow-lg shadow-black/20 flex overflow-clip backdrop-blur">
          {keepPercentage > 0 && (
            <div
              className="bg-white/50 text-black flex items-center px-6 font-medium whitespace-nowrap"
              style={{ width: `${keepPercentage}%` }}
            >
              {keepPercentage}% kept
            </div>
          )}
          {mulliganPercentage > 0 && (
            <div
              className="bg-black/40 text-white flex items-center justify-end px-6 font-medium whitespace-nowrap"
              style={{ width: `${mulliganPercentage}%` }}
            >
              {mulliganPercentage}% mulliganed
            </div>
          )}
        </div>
        <Link href="/#hands">
          <strong>Keep or Mulligan</strong> more hands
        </Link>
      </div>
    </WithCardImageBackground>
  );
}

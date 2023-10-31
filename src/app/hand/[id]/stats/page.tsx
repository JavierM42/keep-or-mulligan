import Hand from "@/components/Hand";
import WithCardImageBackground from "@/components/WithCardImageBackground";
import prisma from "@/lib/prisma";
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
        <Hand cardNames={hand.cards} />
        <div className="w-1/2 h-10 rounded-2xl shadow-lg shadow-black/20 flex overflow-clip">
          <div
            className="bg-white text-black flex items-center p-2"
            style={{ width: `${keepPercentage}%` }}
          >
            {keepPercentage}% kept
          </div>
          <div
            className="bg-black text-white flex items-center justify-end p-2"
            style={{ width: `${mulliganPercentage}%` }}
          >
            {mulliganPercentage}% mulliganed
          </div>
        </div>
        <div>
          {didKeep
            ? majorityKeep
              ? "You kept, so did most"
              : "You kept, but most mulliganed"
            : majorityMulligan
            ? "You mulliganed, so did most"
            : "You mulliganed, but most kept"}
        </div>
      </div>
    </WithCardImageBackground>
  );
}

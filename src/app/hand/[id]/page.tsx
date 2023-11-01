import HandComponent from "@/components/HandComponent";
import HandDecision from "@/components/HandDecision";
import WithCardImageBackground from "@/components/WithCardImageBackground";
import prisma from "@/lib/prisma";

export default async function HandPage({ params }: { params: { id: string } }) {
  const hand = await prisma.hand.findUniqueOrThrow({
    where: { id: params.id },
  });

  return (
    <WithCardImageBackground cardName={hand.cards[0]}>
      <div className="flex flex-col items-center justify-center gap-12 py-24 w-full h-full">
        <HandComponent cardNames={hand.cards} />
        <div className="flex flex-col items-center gap-2 text-center">
          <p>
            You are <strong>on the {hand.onThePlay ? "play" : "draw"}</strong>{" "}
            playing <em>{hand.deckName}</em> in {hand.formatName}.
          </p>
          <p>{hand.notes}</p>
        </div>
        <HandDecision handId={hand.id} />
        {hand.source && (
          <a className="text-sm text-gray-300" href={hand.source}>
            Original source ({hand.source})
          </a>
        )}
      </div>
    </WithCardImageBackground>
  );
}

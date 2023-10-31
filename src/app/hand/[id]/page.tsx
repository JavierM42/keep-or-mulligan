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
        <HandDecision handId={hand.id} />
      </div>
    </WithCardImageBackground>
  );
}

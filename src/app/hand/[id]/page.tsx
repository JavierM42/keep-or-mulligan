import Hand from "@/components/Hand";
import WithCardImageBackground from "@/components/WithCardImageBackground";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function HandPage({ params }: { params: { id: string } }) {
  const hand = await prisma.hand.findUniqueOrThrow({
    where: { id: params.id },
  });

  const submitDecision = async (formData: FormData) => {
    "use server";
    const keep = formData.get("keep") === "true";
    try {
      await prisma.decision.create({ data: { handId: hand.id, keep } });
    } catch (error) {
      console.log("error");
      redirect("/error");
    }
    redirect(`/hand/${hand.id}/stats?keep=${keep}`);
  };

  return (
    <WithCardImageBackground cardName={hand.cards[0]}>
      <div className="flex flex-col items-center justify-center gap-12 py-24 w-full h-full">
        <Hand cardNames={hand.cards} />
        <form
          className="absolute bottom-12 inset-x-12 sm:bottom-auto sm:inset-x-auto sm:relative flex items-center justify-center gap-12"
          action={submitDecision}
        >
          <button
            className="w-40 py-4 text-2xl font-medium text-center text-black bg-white rounded-2xl shadow-lg shadow-black/40"
            type="submit"
            name="keep"
            value="true"
          >
            Keep
          </button>
          <button
            className="w-40 py-4 text-2xl font-medium text-center text-white bg-black rounded-2xl shadow-lg shadow-black/40"
            type="submit"
            name="keep"
            value="false"
          >
            Mulligan
          </button>
        </form>
      </div>
    </WithCardImageBackground>
  );
}

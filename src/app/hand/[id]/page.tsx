import Hand from "@/components/Hand";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function HandPage({ params }: { params: { id: string } }) {
  const hand = await prisma.hand.findUnique({ where: { id: params.id } });

  if (!hand) return notFound();

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
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-12 p-4">
      <Hand cardNames={hand.cards} />
      <form
        className="flex items-center justify-center gap-12"
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
  );
}

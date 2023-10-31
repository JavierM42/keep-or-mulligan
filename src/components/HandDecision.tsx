import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function HandDecision({ handId }: { handId: string }) {
  const submitDecision = async (formData: FormData) => {
    "use server";
    const keep = formData.get("keep") === "true";
    try {
      await prisma.decision.create({ data: { handId, keep } });
    } catch (error) {
      console.log("error");
      redirect("/error");
    }
    redirect(`/hand/${handId}/stats?keep=${keep}`);
  };

  return (
    <form
      className="absolute bottom-12 inset-x-12 sm:bottom-auto sm:inset-x-auto sm:relative flex items-center justify-center gap-12"
      action={submitDecision}
    >
      <button
        className="w-40 py-4 text-2xl font-medium text-center text-white bg-white/20 border border-white/20 backdrop-blur rounded-2xl shadow-lg shadow-black/20 hover:bg-white/40 transition-colors"
        type="submit"
        name="keep"
        value="true"
      >
        Keep
      </button>
      <button
        className="w-40 py-4 text-2xl font-medium text-center text-white bg-black/50 border border-white/10 backdrop-blur rounded-2xl shadow-lg shadow-black/40 hover:bg-black/60 transition-colors"
        type="submit"
        name="keep"
        value="false"
      >
        Mulligan
      </button>
    </form>
  );
}

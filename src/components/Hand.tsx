import clsx from "clsx";

export const CARD_TRANSFORMS: Record<number, string> = {
  0: "sm:rotate-[-5deg] lg:rotate-[-7deg]",
  1: "sm:rotate-[-2deg] sm:translate-y-[-10px] lg:translate-y-[-18px]",
  2: "sm:rotate-[2deg] sm:translate-y-[-10px] lg:translate-y-[-18px]",
  3: "sm:rotate-[5deg] lg:rotate-[7deg]",
  4: "sm:rotate-[-5deg] lg:rotate-[-6deg]",
  5: "sm:translate-y-[-8px] lg:translate-y-[-12px]",
  6: "sm:rotate-[5deg] lg:rotate-[6deg]",
};

export default async function Hand({ cardNames }: { cardNames: string[] }) {
  const cards = await Promise.all(
    cardNames.map((cardName) =>
      fetch(`https://api.scryfall.com/cards/named?fuzzy=${cardName}`)
        .then((res) => res.json())
        .then((res) => ({ name: cardName, imageUrl: res.image_uris.png }))
    )
  );

  return (
    <div className="w-screen sm:max-w-[640px] md:max-w-[768px] lg:max-w-[900px] flex flex-col sm:flex-row items-center justify-center sm:flex-wrap space-y-[-225px] sm:space-y-0 sm:gap-4 lg:gap-6">
      {cards.map(({ name, imageUrl }, index) => (
        <img
          key={index}
          alt={name}
          src={imageUrl}
          className={clsx(
            "w-48 sm:w-32 md:w-40 lg:w-48 aspect-[745/1040] rounded-[10px] shadow-lg shadow-black/40",
            CARD_TRANSFORMS[index]
          )}
        />
      ))}
    </div>
  );
}
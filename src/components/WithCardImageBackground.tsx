import { ReactNode } from "react";

export default async function WithCardImageBackground({
  cardName,
  children,
}: {
  cardName: string;
  children: ReactNode;
}) {
  const src = await fetch(
    `https://api.scryfall.com/cards/named?fuzzy=${cardName}`
  )
    .then((res) => res.json())
    .then((res) => res.image_uris.art_crop);

  return (
    <main
      className="w-screen h-screen bg-center bg-cover overflow-auto"
      style={{ backgroundImage: `url(${src})` }}
    >
      <div className="min-h-screen pt-12 bg-gray-800/60 z-10">{children}</div>
    </main>
  );
}

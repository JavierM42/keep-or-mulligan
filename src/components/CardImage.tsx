export default async function CardImage({
  cardName,
  className,
}: {
  cardName: string;
  className?: string;
}) {
  const src = await fetch(
    `https://api.scryfall.com/cards/named?fuzzy=${cardName}`
  )
    .then((res) => res.json())
    .then((res) => res.image_uris.art_crop);

  return <img className={className} src={src} />;
}

import HomeSatiny from "@/components/pages/HomeSatiny";
import { client } from "@/utils/sanity";

export default async function HomePage() {
  const cars = await client.fetch(`*[_type == "car"] | order(_createdAt desc){
    _id,
    name,
    number,
    car,
    price,
    model,
    owner,
    fuel,
    kilometers,
    original,
    tyre,
    interior,
    engine,
    images
  }`);

  return (
    <>
      <HomeSatiny initialCars={cars} />
    </>
  );
}

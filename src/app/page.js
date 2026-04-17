export const dynamic = "force-dynamic";
import HomeSatiny from "@/components/pages/HomeSatiny";
import { client } from "@/utils/sanity";

export default async function HomePage() {
  const [cars, dealers] = await Promise.all([
    client.fetch(
      `*[_type == "car"] | order(_createdAt desc){
      _id, name, number, car, price, model, owner, fuel,
      kilometers, original, tyre, interior, engine, images
    }`,
      {},
      { cache: "no-store" },
    ),
    client.fetch(
      `*[_type == "dealerInfo"] | order(_createdAt desc){
      _id, name, businessName, address, phone, image
    }`,
      {},
      { cache: "no-store" },
    ),
  ]);

  return <HomeSatiny initialCars={cars} initialDealers={dealers} />;
}

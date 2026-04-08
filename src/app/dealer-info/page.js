export const dynamic = "force-dynamic";
import Cta from "@/components/common/Cta";
import Hero from "@/components/home/Hero";
import { client, urlFor } from "@/utils/sanity";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0;

const page = async () => {
  const dealers = await client.fetch(
    `*[_type == "dealerInfo"] | order(_createdAt desc) {
      _id, name, businessName, address, phone, image
    }`,
    {},
    { cache: "no-store" },
  );

  return (
    <>
      <Hero
        title={<>Find Trusted Car Dealers Near You</>}
        description="Explore verified car dealers, compare options, and connect directly to get the best deals on your next car."
      />
      <div className="max-w-[1180px] mx-auto px-5 mt-8">
        <div className="bg-white w-full py-3 px-3 font-semibold text-sm shadow flex items-center">
          <h3 className="text-lg md:font-semibold text-gray-800 leading-tight">
            Latest Car Dealer
          </h3>
        </div>
      </div>

      {dealers.length === 0 ? (
        <div className="max-w-[1180px] mx-auto px-5 py-16 text-center text-gray-500">
          No dealers found yet.
        </div>
      ) : (
        <div className="grid gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-[1180px] px-5 py-8">
          {dealers.map((dealer) => (
            <div
              key={dealer._id}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition-all ease-in-out duration-300 max-sm:max-w-[380px] max-sm:w-full max-sm:mx-auto"
            >
              <div className="h-[220px] lg:h-[210px] xl:h-[250px] flex items-center border-b overflow-hidden">
                {dealer.image ? (
                  <Image
                    src={urlFor(dealer.image).width(400).height(300).url()}
                    alt={dealer.businessName || "dealer"}
                    width={400}
                    height={300}
                    className="w-full object-cover pointer-events-none"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <div className="p-3 sm:p-4 space-y-2">
                <h2 className="font-bold text-xl line-clamp-1">
                  {dealer.businessName}
                </h2>
                <p className="text-base">
                  <strong>Dealer:</strong> {dealer.name}
                </p>
                <p className="text-base">
                  <strong>Contact:</strong>{" "}
                  <Link href={`tel:${dealer.phone}`} className="text-blue-600">
                    {dealer.phone}
                  </Link>
                </p>
                <p className="text-base pb-3">
                  <strong>Address:</strong> {dealer.address}
                </p>
                <Cta url="/">View Dealer Cars</Cta>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default page;

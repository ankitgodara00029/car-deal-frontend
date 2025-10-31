import ContactUs from "@/components/common/ContactUs";
import Faq from "@/components/common/Faq";
import DetailsPages from "@/components/home/DetailsPages";
import { client } from "@/utils/sanity";

export default function CarDetailPage({ params }) {
  return (
    <>
      <DetailsPages />
      <ContactUs />
      <Faq />
    </>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { id } = params;

  try {
    const car = await client.fetch(
      `*[_type == "car" && _id == $id][0]{
        car,
        price,
        model,
        images
      }`,
      { id }
    );

    if (!car) {
      return {
        title: "Car Not Found",
      };
    }

    return {
      title: `${car.car} - ${car.model} | ₹${car.price}`,
      description: `Buy ${car.car} ${car.model} for ₹${car.price}. View complete details and contact seller.`,
    };
  } catch (error) {
    return {
      title: "Car Details",
    };
  }
}

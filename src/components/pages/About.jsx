import HowWeWork from "../about-us/HowWeWork";
import WhyChoose from "../about-us/WhyChoose";
import ContactUs from "../common/ContactUs";
import Faq from "../common/Faq";
import Hero from "../home/Hero";

const About = () => {
  return (
    <div>
      <Hero
        title={
          <>
            Your Trusted Car <br />
            <span className="text-[#ff5e00]">Buying & Selling </span>
            Marketplace!
          </>
        }
        description="We are a leading online platform that connects car buyers and sellers in a hassle-free and secure way. Whether you’re looking to buy a dream car or sell your vehicle at the best price, we make the process simple, transparent, and reliable."
      />
      <WhyChoose />
      <HowWeWork />
      <ContactUs />
      <Faq />
    </div>
  );
};

export default About;

import { WHY_CHOOSE_LIST } from "@/utils/helper";
import Icons from "../common/Icons";

const WhyChoose = () => {
  return (
    <div className="py-12">
      <div className="container max-w-[1180px] mx-auto px-5">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-4 md:mb-6">
          Why <span className="text-[#ff5e00]">Choose</span> Us?
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {WHY_CHOOSE_LIST.map((obj, index) => {
            return (
              <div
                className="flex items-center flex-col border py-12 rounded-lg text-center px-3 hover:border-black hover:shadow-lg duration-300"
                key={index}
              >
                <Icons icon="why-choose-icon" />
                <h3 className="text-2xl text-black font-bold mt-1.5">
                  {obj.title}
                </h3>
                <p className="text-black text-base mt-2 font-normal">
                  {obj.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;

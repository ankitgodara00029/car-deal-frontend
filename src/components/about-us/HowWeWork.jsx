import { HOW_WORK_LIST } from "@/utils/helper";

const HowWeWork = () => {
  return (
    <div className="py-12">
      <div className="container max-w-[1180px] mx-auto px-5">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-4 md:mb-6">
          How We <span className="text-[#ff5e00]">Work?</span>
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {HOW_WORK_LIST.map((obj, index) => {
            return (
              <div
                className="flex items-center flex-col border py-12 rounded-lg text-center px-3 hover:border-black hover:shadow-lg duration-300"
                key={index}
              >
                <div className="size-8 bg-blue-400 text-white font-black rounded text-xl flex justify-center items-center !leading-[120%]">
                  {index + 1}
                </div>
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

export default HowWeWork;

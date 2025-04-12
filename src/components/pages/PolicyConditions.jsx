import Link from "next/link";

const PolicyConditions = ({ mapList }) => {
  return (
    <div className="max-w-[1180px] px-5 mx-auto py-12 sm:py-20">
      {mapList.map((obj, index) => {
        return (
          <div key={index}>
            <h2 className="font-bold mb-1 sm:mb-2 text-base sm:text-lg lg:text-xl">
              {obj.title}
            </h2>
            <ul className="list-disc ps-7 mb-3 sm:mb-4">
              {obj.list.map((list, subIndex) => {
                return (
                  <li
                    className="text-sm sm:text-base max-w-[800px]"
                    key={subIndex}
                  >
                    {list}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
      <p className="text-sm sm:text-base text-black">
        📩 Have Questions? Contact Us at:&nbsp;
        <Link href="tel:+9999999999" className="text-blue-400 underline">
          9999999999
        </Link>
      </p>
    </div>
  );
};

export default PolicyConditions;

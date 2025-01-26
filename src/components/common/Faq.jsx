"use client";
import { FAQ_LIST } from "@/utils/helper";
import { useState } from "react";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="container mx-auto max-w-[880px] px-5 py-8 md:py-12">
      <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-4 md:mb-6">
        Frequently Asked <span className="text-[#ff5e00]">Questions</span>
      </h2>
      <div className="space-y-4">
        {FAQ_LIST.map((faq, index) => (
          <div
            key={index}
            className={`border rounded-lg p-3 sm:p-4 bg-white shadow-sm transition-all duration-300 ${
              openIndex === index ? "border-[#ff5e00]" : "border-gray-300"
            }`}
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h2 className="text-base sm:text-lg text-black font-medium">
                {faq.question}
              </h2>
              <svg
                className={`w-5 h-5 transition-transform ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {openIndex === index && (
              <p className="mt-1.5 text-black text-sm sm:text-base text-opacity-60 max-w-[800px]">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;

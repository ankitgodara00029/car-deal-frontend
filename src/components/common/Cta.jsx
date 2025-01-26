import Link from "next/link";

const Cta = ({ children, className, onClick, url }) => {
  const commonClasses = `w-full border border-[#ff5e00] text-sm sm:text-base rounded-lg py-2.5 sm:py-3 px-2 text-white font-semibold bg-[#ff5e00] hover:text-[#ff5e00] hover:bg-white transition-all ease-in-out duration-300 ${className}`;

  return url ? (
    <Link href={url} className={`${commonClasses} block text-center`}>
      {children}
    </Link>
  ) : (
    <button onClick={onClick} className={commonClasses}>
      {children}
    </button>
  );
};

export default Cta;

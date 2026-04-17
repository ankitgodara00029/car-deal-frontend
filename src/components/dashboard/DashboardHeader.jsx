import Link from "next/link";

const DashboardHeader = ({ user, totalCars }) => {
  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-4 md:mb-8">
        <div className="flex items-center space-x-4">
          <div className="size-12 sm:size-16 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-xl sm:text-2xl font-bold text-blue-600">
              {user.firstName?.[0] ||
                user.emailAddresses[0].emailAddress[0].toUpperCase()}
            </span>
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
              Welcome, {user.firstName || "User"}!
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 md:mb-8">
        <Link
          href="/post-your-car"
          className="bg-[#ff5e00]/80 text-white p-4 rounded-lg bg-[#ff5e00] transition-colors text-center"
        >
          <div className="text-2xl mb-2">🚗</div>
          <div className="font-medium">Post New Car</div>
        </Link>
        <div className="bg-purple-100 p-4 rounded-lg text-center">
          <div className="text-2xl mb-2">📊</div>
          <div className="font-medium text-purple-800">
            {totalCars} Total Cars
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;

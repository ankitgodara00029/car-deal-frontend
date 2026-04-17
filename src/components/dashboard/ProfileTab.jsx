const ProfileTab = ({ user }) => {
  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Profile Information
      </h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <div className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2">
              {user.firstName || "Not provided"}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <div className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2">
              {user.lastName || "Not provided"}
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2">
            {user.emailAddresses[0].emailAddress}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Member Since
          </label>
          <div className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2">
            {new Date(user.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;

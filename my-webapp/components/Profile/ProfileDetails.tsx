
import ProfileInfo from "./ProfileInfo"
const ProfileDetails = () => {
    return (
      <div>
        <div className="px-4 sm:px-0">
          <h1 className="text-lg font-semibold text-primary-focus">Username</h1>
        </div>
        <div className="mt-6 border-t">
          <ProfileInfo />
        </div>
      </div>
    );
  };
  export default ProfileDetails
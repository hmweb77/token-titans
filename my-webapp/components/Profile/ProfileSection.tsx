import Avatar from "./Avatar"
import EditButton from "./EditButton"
import ProfileInfo from "./ProfileInfo"
const ProfileSection = () => {
  return (
    <section className="flex items-center justify-center h-1/2">
      <div className="w-1/4"> 
        <Avatar /> 
      </div>
      <div className="flex-grow text-center">
        <div>
          <div className="px-4 sm:px-0">
            <h1 className="text-lg font-semibold text-primary-focus">Username</h1>
          </div>
          <div className="mt-6 border-t">
            <ProfileInfo />
          </div>
        </div>
      </div>
      <div className="ml-auto">
        <EditButton />
      </div>
    </section>
  );
};
export default ProfileSection
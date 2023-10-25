import Image from 'next/image'
import Prof from "../../assets/pfp.jpg"
const Avatar = () => {
    return (
      <div className="avatar">
        <div className="rounded-full m-2">
          <Image src={Prof} height={200} width={200} alt="Profile Image" />
        </div>
      </div>
    );
  };
  export default Avatar
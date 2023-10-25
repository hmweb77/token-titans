

import CommunityContent from 'components/Content/CommunityContent'
import CreateContent from 'components/Content/CreateContent'
import Image from 'next/image'
import FirstPost from "../assets/Content Assets/Post1.png"
import SecondPost from "../assets/Content Assets/Post2.png"


const Content = () => {
    return (
        <div className="flex flex-col justify-center items-center w-9/12 h-screen bg-white">
            <CreateContent />
            <CommunityContent/>
            <Image src={FirstPost} alt="Post" width={600} height={600}/>
            <Image src={SecondPost} alt="Post" width={600} height={1900}/>
        </div>
    )
}

export default Content
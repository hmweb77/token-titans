

import CommunityContent from 'components/Content/CommunityContent'
import CreateContent from 'components/Content/CreateContent'
import Image from 'next/image'
import FirstPost from "../assets/Content Assets/Post1.png"
import SecondPost from "../assets/Content Assets/Post2.png"


const Content = () => {
    return (
        <div className="flex flex-col justify-center items-center w-1200  bg-white">
            <CreateContent />
            <CommunityContent/>
            <Image src={FirstPost} alt="Post" width={700} height={150}/>
            <Image src={SecondPost} alt="Post" width={700} height={450}/>
        </div>
    )
}

export default Content
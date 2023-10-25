import React from 'react';
import ImgF from "../../assets/Content Assets/Posts.png"
import Image from 'next/image';
import Com from "../../assets/Content Assets/Communities.png"

const CommunityContent = () => {
  return (
    <div className="flex w-10/12 items-center justify-center h-2/4 rounded-lg ">
    {/* First Section */}
    <div className="w-2/3 p-2">
      <h2 className="text-2xl text-primary-focus font-semibold mb-6">Your community</h2>
      <div className="flex justify-center">
        <Image
          src={ImgF} 
          alt="Image 1"
          className="w-64 h-64 rounded"
          width={400}
          height={200}
        />
      </div>
    </div>
  
    {/* Second Section */}
    <div className="w-1/3 p-2">
      <h2 className="text-2xl text-primary-focus font-semibold mb-6">New Communities</h2>
      <div className="flex justify-center">
        <Image
          src={Com} 
          alt="Image 1"
          className="w-64 h-64 rounded"
          width={200}
          height={200}
        />
      </div>
    </div>
  </div>
  

  );
};

export default CommunityContent;

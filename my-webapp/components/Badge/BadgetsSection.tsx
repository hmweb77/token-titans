
import React from 'react'

import Image from 'next/image'
import Badge from "../../assets/Profile Assets/Badges.png"
import Commun from "../../assets/Profile Assets/Community - Section.png"
import BadgeInfo from "./BadgeInfo"
import BadgeReward from './BadgetReward'
const BadgetsSection = () => {
  return (
    <section className="py-8">

      <div className="container mx-auto flex">
        <div className="w-1/2 p-4">
          <Image src={Commun} alt="Main Image 1" />
        </div>
        <div className="w-1/2 p-4">
          <Image src={Badge} alt="Main Image 2" />
          <BadgeInfo />
          <BadgeReward/>

        </div>
      </div>
    </section>
  );
};
export default BadgetsSection

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Vote from "../../assets/democracy.png"

const BadgeInfo = () => {
  return (
    <div className="card border bg-white m-3">
      <div className="card-body flex items-center">
        <div style={{ width: '36px', height: '36px', overflow: 'hidden' }}>
          <Image src={Vote} alt="Vote Image" />
        </div>
        <Link href="/">
          <span className="text-primary-focus underline">Vote for new features</span>
        </Link>
      </div>
    </div>
  );
};
export default BadgeInfo
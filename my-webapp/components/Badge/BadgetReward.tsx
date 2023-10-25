import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Troph from "../../assets/Trophey.png";
import Diam from "../../assets/Diamond.png"

const BadgeReward = () => {
    return (
        <div className="card border bg-white m-3">
            <div className="card-body flex items-center">
                <div>
                    <span className="text-primary-focus underline">Rewards you gave</span>
                </div>
                <div className="flex items-center">
                    <div className="mr-10">
                        <span className="ml-1 text-xl">10</span>
                        <Image src={Diam} alt="Image" width={40} height={40} />
                    </div>
                    <div className="mr-2">
                        <span className="ml-1 text-xl">20</span>
                        <Image src={Troph} alt="Image" width={40} height={40} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BadgeReward;

import React, { useState } from 'react';

import Avatar from "./Avatar"
import EditButton from "./EditButton"
import ProfileInfo from "./ProfileInfo"
import PopupComponent from "./PopupComponent"
import EditProfileWindow from "./EditProfileWindow"
import { useSigningClient } from 'contexts/client'
import Link from 'next/link'

const ProfileSection = () => {
  const { walletAddress } = useSigningClient()
  const [username, setUsername] = useState("Username")
  const [bio, setBio] = useState(" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet gravida magna. Curabitur id molesded.")

  const [isPopupVisible, setPopupVisible] = useState(false);
  const togglePopup = () => {
    console.log('Toggle popup called');
    setPopupVisible(!isPopupVisible);
  };
  return (
    <section className="flex items-center justify-center h-1/2">
      <div className="w-1/4">
        <Avatar />
      </div>
      <div className="flex-grow text-center">
        <div>
          <div className="px-4 sm:px-0">
            <h1 className="text-lg font-semibold text-primary-focus">{username}</h1>
          </div>
          <div className="mt-6 border-t">
            <dl className="divide-y">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
                <Link href={process.env.NEXT_PUBLIC_CHAIN_EXPLORER + "coreum/accounts/" + walletAddress} passHref>
                  <a target="_blank" rel="noreferrer" className="font-mono break-all whitespace-pre-wrap link link-primary">
                    {walletAddress}
                  </a>
                </Link>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Bio</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {bio}
                </dd>
              </div>
            </dl>
            {isPopupVisible && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="w-1/2 bg-white rounded-lg p-4 shadow-lg">
                  <EditProfileWindow
                    username={username}
                    bio={bio}
                    onSave={(editedUsername, editedBio) => {
                      setUsername(editedUsername);
                      setBio(editedBio);
                      setPopupVisible(false);
                    }}
                    onCancel={() => setPopupVisible(false)} // Close the popup when needed
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="ml-auto">
        <EditButton onClick={togglePopup} />
      </div>
    </section>
  );
};
export default ProfileSection
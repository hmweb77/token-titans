import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Vote from "../assets/democracy.png"
import Prof from "../assets/pfp.jpg"
import Pen from "../assets/pen.png"

function Profile() {
    return (
      <div className="bg-white">
        <section className="flex items-center justify-center h-1/2">
          <div className="avatar">
            <div className="w-24 rounded">
              <Image src={Prof} height={64} width={64} alt="Profile Image" />
            </div>
          </div>
          <div className="ml-8">
            <div className="px-4 sm:px-0">
              <h2 className="text-lg font-semibold text-primary-focus">Username</h2>
            </div>
            <div className="mt-6 border-t">
              <dl className="divide-y">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">00000000</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Bio</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
                    sit amet gravida magna. Curabitur id molestie ex.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="avatar ml-8">
            <div className="w-24 rounded">
            <button className="btn btn-outline btn-secondary  m-3"><Image src={Pen} height={32} width={32} alt="Pen Image" /></button>
              
            </div>
          </div>
        </section>
        <section className="flex items-center justify-center h-1/2">
          <div className="flex flex-col w-full text-center">
            <div className="card border bg-white m-3">
              <div className="card-body">
                <h2 className="text-primary-focus text-center text-lg">Badgets</h2>
                <p>Rerum reiciendis beatae tenetur excepturi</p>
              </div>
            </div>
            <div className="card border bg-white m-3">
              <div className="card-body">
                <h2 className="text-primary-focus text-center text-lg">Activities</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
                  sit amet gravida magna. Curabitur id molestie ex. Morbi efficitur
                  aliquam ex, sed ullamcorper...
                </p>
                <span className="text-primary-focus underline">Show all posts</span>
              </div>
            </div>
            <div className="card border bg-white m-3">
              <div className="card-body">
                <button className="m-3">
                  <Image src={Vote} height={32} width={32} alt="Vote Image" />
                </button>
                <Link href="/">
                  <span className="text-primary-focus underline">Vote for new features</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
  
  export default Profile;
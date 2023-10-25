

import { useSigningClient } from 'contexts/client'
import Link from 'next/link'


const ProfileInfo = () => {
  const { walletAddress } = useSigningClient()

  return (
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet gravida magna. Curabitur id molesded.
        </dd>
      </div>
    </dl>
  );
};
export default ProfileInfo
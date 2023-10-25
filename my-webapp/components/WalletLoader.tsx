import { ReactNode } from 'react'
import Image from 'next/image'
import { useSigningClient } from 'contexts/client'
import Loader from './Loader'
import homePageImage from "../assets/Home.jpeg"

function WalletLoader({
  children,
  loading = false,
}: {
  children: ReactNode
  loading?: boolean
}) {
  const {
    walletAddress,
    loading: clientLoading,
    error,
    connectWallet,
  } = useSigningClient()

  if (loading || clientLoading) {
    return (
      <div className="justify-center">
        <Loader />
      </div>
    )
  }

  if (walletAddress === '') {
    return (
      <div className="max-w-full">
        <h1 className=" m-3 text-6xl font-bold">
          Where users <span className='text-white'>Lead</span> the way
        </h1>
        <div className="flex flex-wrap items-center justify-around md:max-w-4xl mt-3 mb-10 sm:w-full">
          <button
            className="p-6 mt-6 text-left border border-secondary hover:border-primary-focus w-96 rounded-xl hover:text-primary-focus focus:text-primary"
            onClick={connectWallet}
          >
            <h3 className="text-2xl font-bold">Connect your wallet &rarr;</h3>
            <p className="mt-4 text-xl">
              Get your Keplr wallet connected now and start using it.
            </p>
          </button>
        </div>
        <Image
          src={homePageImage}
          height={320}
          width={320}
          alt="home-page-image"
          className="m-3" 
        />
      </div>
    )
  }

  if (error) {
    return <code>{JSON.stringify(error)}</code>
  }

  return <>{children}</>
}

export default WalletLoader

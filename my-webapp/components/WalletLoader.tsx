import { ReactNode } from 'react'
import Image from 'next/image'
import { useSigningClient } from 'contexts/client'
import Loader from './Loader'
import homePageImage from "../assets/Home.jpeg"
import Logo from "../assets/Logo PNG.png"

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
         <Image
          src={Logo}
          height={100}
          width={100}
          alt="logo"
          className="m-3"
        />
        <h1 className=" m-3 text-6xl font-bold">
          Where users <span className='text-white'>Lead</span> the way
        </h1>
        <p className="mt-4 text-xl">A social network operated by its users, powered by Coreum.</p>
        <div className="flex flex-col items-center justify-around md:max-w-4xl mt-3 mb-10 sm:w-full">
          <button className="bg-gradient-to-l from-primary to-primary-focus  text-white font-semibold px-16 py-2 rounded  " onClick={connectWallet}>
            Log In
          </button>
          <span className="text-primary-focus underline">Don&apos;t have a wallet</span>
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

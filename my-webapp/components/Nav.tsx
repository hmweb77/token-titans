import { useSigningClient } from 'contexts/client'
import Link from 'next/link'
import Image from 'next/image'
import Router from 'next/router'
import Logo from "../assets/Logo PNG.png"
import MarketPlace from "../assets/Marketplace-Icon.png"
import Community from "../assets/Community-Icon.png"
import Prof from "../assets/pfp.jpg"
import Home from "../assets/Home-Icon.png"


function Nav() {
  const { walletAddress, connectWallet, disconnect } = useSigningClient()
  const handleConnect = () => {
    if (walletAddress.length === 0) {
      connectWallet()
    } else {
      disconnect()
      Router.push('/')
    }
  }



  return (
    <div className="border-b w-screen px-2 md:px-16 bg-primary">
      <nav className="flex flex-wrap text-center md:text-left md:flex flex-row w-full justify-between items-center py-4">
        <div className="flex items-center">
          <Link href="/">
            <a>
              <Image
                src={Logo}
                height={64}
                width={64}
                alt="Logo"
              />
            </a>
          </Link>
          <Link href="/">
            <a className="ml-1 md:ml-2 font-semibold text-xl md:text-2xl align-top">
              TOKEN TITANS
            </a>
          </Link>
        </div>
        <div className="flex flex-grow lg:flex-grow-0 max-w-full">
          {walletAddress ? (
            // Render content when the user is connected
            <div>
              {/* Add your profile icon or other icons here */}

              <button className="btn btn-outline btn-secondary  m-3">
                <Image
                  src={MarketPlace}
                  height={32}
                  width={32}
                  alt="home-page-image"

                /></button>

              <button className="btn btn-outline btn-secondary  m-3">
                <Image
                  src={Community}
                  height={32}
                  width={32}
                  alt="home-page-image"

                />
              </button>
              <Link href="/content">
                <button className="btn btn-outline btn-secondary  m-3">
                  <Image
                    src={Home}
                    height={32}
                    width={32}
                    alt="home-page-image"
                  />
                </button>
              </Link>
              <Link href="/profile">
                <button className="btn btn-outline btn-secondary  m-3">
                  <Image
                    src={Prof}
                    height={32}
                    width={32}
                    alt="home-page-image"
                  />
                </button>
              </Link>
              {/* Add other icons as needed */}
            </div>
          ) : (
            // Render the "Connect Wallet" button when user is not connected
            <div className="flex flex-grow lg:flex-grow-0 max-w-full">
              <button
                className="btn btn-outline btn-secondary bg-base-100"
                onClick={handleConnect}
              >
                Connect Wallet
              </button>
            </div>
          )}
        </div>
      </nav >
    </div >
  )
}

export default Nav
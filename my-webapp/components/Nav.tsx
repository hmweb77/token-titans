import {useSigningClient} from 'contexts/client'
import Link from 'next/link'
import Image from 'next/image'
import Router from 'next/router'
import Logo from "../assets/Logo.jpeg"

function Nav() {
  const {walletAddress, connectWallet, disconnect} = useSigningClient()
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
      <nav
        className="flex flex-wrap text-center md:text-left md:flex flex-row w-full justify-between items-center py-4 ">
        <div className="flex items-center">
          <Link href="/">
            <a>     
                <Image
                  src={Logo}
                  height={32}
                  width={32}
                  alt="Logo"
                />
            </a>
          </Link>
          <Link href="/">
            <a className="ml-1 md:ml-2 link link-hover font-semibold text-xl md:text-2xl align-top">
             TOKEN TITANS
            </a>
          </Link>
        </div>
        <div className="flex flex-grow lg:flex-grow-0 max-w-full">
          <button
            className="block btn btn-outline btn-secondary bg-base-100  w-full max-w-full truncate"
            onClick={handleConnect}
          >
            {walletAddress || 'Connect Wallet'}
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Nav

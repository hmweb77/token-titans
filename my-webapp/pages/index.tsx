import type {NextPage} from 'next'
import Link from 'next/link'
import WalletLoader from 'components/WalletLoader'
import {useSigningClient} from 'contexts/client'




const Home: NextPage = () => {
  const {walletAddress} = useSigningClient()

  return (
    <WalletLoader>


      <h1 className="text-6xl font-bold">
 
        Welcome to {process.env.NEXT_PUBLIC_CHAIN_NAME} !
      </h1>

      <div className="mt-3 text-2xl">
        Your wallet address is:{' '}
        <pre></pre>
        <Link href={process.env.NEXT_PUBLIC_CHAIN_EXPLORER + "coreum/accounts/" + walletAddress} passHref>
          <a target="_blank" rel="noreferrer" className="font-mono break-all whitespace-pre-wrap link link-primary">
            {walletAddress}
          </a>
        </Link>

      </div>

      <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
        <Link href="https://docs.coreum.dev/tools-ecosystem/faucet.html" passHref>
          <a target="_blank" rel="noreferrer"
             className="p-6 mt-6 text-left border border-secondary hover:border-primary w-96 rounded-xl hover:text-primary focus:text-primary-focus">
            <h3 className="text-2xl font-bold">Fund wallet &rarr;</h3>
            <p className="mt-4 text-xl">
              Fund you wallet for the {process.env.NEXT_PUBLIC_CHAIN_NAME}.
            </p>
          </a>
        </Link>
        <Link href="/send" passHref>
          <a
            className="p-6 mt-6 text-left border border-secondary hover:border-primary w-96 rounded-xl hover:text-primary focus:text-primary-focus">
            <h3 className="text-2xl font-bold">Send to wallet &rarr;</h3>
            <p className="mt-4 text-xl">
              Execute a transaction to send funds to a wallet address.
            </p>
          </a>
        </Link>
        <Link href="/nft" passHref>
          <a
            className="p-6 mt-6 text-left border border-secondary hover:border-primary w-96 rounded-xl hover:text-primary focus:text-primary-focus">
            <h3 className="text-2xl font-bold">Create community &rarr;</h3>
            <p className="mt-4 text-xl">
              Start meaningful connections that make a difference
            </p>
          </a>
        </Link>
        <Link href="/profile" passHref>
          <a
            className="p-6 mt-6 text-left border border-secondary hover:border-primary w-96 rounded-xl hover:text-primary focus:text-primary-focus">
            <h3 className="text-2xl font-bold">Profile &rarr;</h3>
            <p className="mt-4 text-xl">
              Profile
            </p>
          </a>
        </Link>
      </div>


    </WalletLoader>
  )
}

export default Home

import {useEffect, useState} from 'react'
import type {NextPage} from 'next'
import {sha256} from 'js-sha256'

import WalletLoader from 'components/WalletLoader'
import {useSigningClient} from 'contexts/client'
import {QueryNFTsResponse} from "../coreum/proto-ts/coreum/nft/v1beta1/query";
import {AssetNFT as AssetNFTTx, NFT as NFTTx} from "../coreum/tx";
import {EncodeObject} from "@cosmjs/proto-signing";

const nftClassSymbol = `kittens${Date.now()}`

const generateKittenURL = () => {
  return `https://placekitten.com/${200 + Math.floor(Math.random() * 100)}/${200 + Math.floor(Math.random() * 100)}`
}

const NFT: NextPage = () => {
  const {walletAddress, signingClient, coreumQueryClient} = useSigningClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [classCreated, setClassCreated] = useState(false)
  const [nftClassDescription, setNFTClassDescription] = useState('')
  const [nfts, setNfts] = useState<{ classId: string; id: string, uri: string, uriHash: string, owner: string }[]>([])
  const [kittenURI, setKittenURI] = useState(generateKittenURL())
  const [transferID, setTransferID] = useState("")
  const [recipientAddress, setRecipientAddress] = useState('')
  const nftClassID = `${nftClassSymbol}-${walletAddress}`

  useEffect(() => {
    if (!signingClient || walletAddress.length === 0) {
      return
    }
    setError('')
    setLoading(true)
    queryClass()

  }, [signingClient, walletAddress])

  const queryNFTs = () => {
    setLoading(true)
    coreumQueryClient?.NFTClient().NFTs({
      classId: nftClassID,
      owner: "",
    }).then(async (res: QueryNFTsResponse) => {
      const nfts = await Promise.all(
        res.nfts.map(async (nft) => {
          const resOwner = await coreumQueryClient?.NFTClient().Owner({
            classId: nft.classId,
            id: nft.id
          })
          return {
            classId: nft.classId,
            id: nft.id,
            uri: nft.uri,
            uriHash: nft.uriHash,
            owner: resOwner.owner,
          }
        })
      )
      nfts.sort((a, b) => a.id.localeCompare(b.id))
      setNfts(nfts)
      setLoading(false)
    })
      .catch((error) => {
        setLoading(false)
        setError(`Error! ${error.message}`)
      })
  }

  const queryClass = () => {
    // check that class is already created
    coreumQueryClient?.NFTClient().Class({classId: nftClassID}).then(() => {
      queryNFTs()
      setClassCreated(true)
    }).catch((error) => {
      setLoading(false)
      if (error.message.includes("not found class")) {
        setClassCreated(false)
        return
      }
      setError(`Error! ${error.message}`)
    })
  }

  const createNFTClass = () => {
    setError('')
    setLoading(true)

    sendTx([AssetNFTTx.MsgIssueClass({
      issuer: walletAddress,
      symbol: nftClassSymbol,
      description: nftClassDescription,
    })]).then((passed) => {
      setClassCreated(passed)
    })
  }

  const changeKitten = () => {
    setKittenURI(generateKittenURL())
  }

  const mintKitten = () => {
    setError('')
    setLoading(true)
    sendTx([AssetNFTTx.MsgMint({
      sender: walletAddress,
      classId: nftClassID,
      id: `kitten-${Date.now()}`,
      uri: kittenURI,
      uriHash: sha256.create().update(kittenURI).hex()
    })]).then((passed) => {
      if (passed) {
        queryNFTs()
      }
    })
  }

  const cancelTransferOwnership = () => {
    setError('')
    setTransferID('')
    setRecipientAddress('')
  }

  const transferOwnership = () => {
    setError('')
    setLoading(true)
    sendTx([NFTTx.MsgSend({
      sender: walletAddress,
      classId: nftClassID,
      id: transferID,
      receiver: recipientAddress,
    })]).then((passed) => {
      if (passed) {
        cancelTransferOwnership()
        queryNFTs()
      }
    })
  }

  const sendTx = async (msgs: readonly EncodeObject[]) => {
    try {
      const resp = await signingClient
        ?.signAndBroadcast(walletAddress, msgs, 'auto')
      console.log(`Tx hash: ${resp?.transactionHash}`)
      setLoading(false)
      return true
    } catch (error: any) {
      console.error(error)
      setLoading(false)
      setError(`Error! ${error}`)
      return false
    }
  }

  return (
    <WalletLoader loading={loading}>
      {error.length > 0 && (
        <div className="alert alert-error">
          <label className="flex-grow break-all">{error}</label>
        </div>
      )}
      {transferID == "" && !classCreated && (
        <div>
          <h1 className="text-3xl font-bold my-8">
            Create your {nftClassSymbol} Community
          </h1>
          <div className="flex w-full max-w-xl">
            <input
              type="text"
              id="description"
              className="input input-bordered bg-white input-lg rounded-full flex-grow font-mono text-center text-lg"
              placeholder={`Class description`}
              onChange={(event) => setNFTClassDescription(event.target.value)}
              value={nftClassDescription}
            />
            <button
              className="mt-4 md:mt-0 btn btn-primary btn-lg font-semibold hover:text-base-100 text-2xl rounded-full flex-grow"
              onClick={createNFTClass}
            >
              Create
            </button>
          </div>

        </div>

      )}
      {transferID == "" && classCreated && (
        <div>
          <h1 className="text-3xl font-bold py-4">
            Welcome to your {nftClassSymbol} collection!
          </h1>
          <h1 className="text-m italic pb-4">
            {nftClassDescription}
          </h1>
          <div className="grid grid-flow-col auto-cols-max">
            <div>
              <table className="table">
                <thead>
                <tr>
                  <th className="w-24">Image</th>
                  <th className="w-40">ID</th>
                  <th className="w-40">Owner</th>
                  <th className="w-96">Hash</th>
                  <th className="w-24"></th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                {
                  nfts.map((l, k) => {
                    return (
                      <tr key={k}>
                        <td>
                          <div className="flex items-center space-x-3 w-24">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img src={l.uri} alt="Images"/>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="font-bold">{l.id}</td>
                        <td className="truncate w-40">{l.owner}</td>
                        <td><p className="truncate w-96">{l.uriHash}</p></td>
                        <td className="w-24">
                          {walletAddress == l.owner && (
                            <button className="btn btn-primary rounded-full"
                                    onClick={() => setTransferID(l.id)}>Transfer</button>
                          )
                          }
                        </td>
                      </tr>
                    )
                  })
                }
                </tbody>
              </table>
            </div>
            <div className="ml-8">
              <img className="rounded-full object-cover h-48 w-48" src={kittenURI} alt=""/>
              <div className="py-8">
                <button className="btn btn-primary float-left btn-accent rounded-full" onClick={changeKitten}>Change
                </button>
                <button className="btn btn-primary float-right rounded-full" onClick={mintKitten}>Mint</button>
              </div>
            </div>
          </div>
        </div>)}
      {transferID != "" && classCreated && (
        <div>
          <h1 className="text-3xl font-bold py-4">
            Transfer {transferID} NFT ownership.
          </h1>
          <div className="flex w-full max-w-xl">
            <input
              type="text"
              id="recipient-address"
              className="input input-bordered focus:input-primary input-lg rounded-full flex-grow font-mono text-center text-lg"
              placeholder="Recipient address"
              onChange={(event) => setRecipientAddress(event.target.value)}
              value={recipientAddress}
            />
          </div>
          <div>
            <div className="flex flex-col md:flex-row mt-4 text-2xl w-full max-w-xl justify-between">
              <button
                className="mt-4 md:mt-0 btn btn-secondary btn-lg font-semibold hover:text-base-100 text-2xl rounded-full flex-grow"
                onClick={cancelTransferOwnership}
              >
                Cancel
              </button>
              <button
                className="mt-4 md:mt-0 btn btn-primary btn-lg font-semibold hover:text-base-100 text-2xl rounded-full flex-grow"
                onClick={transferOwnership}
              >
                Transfer
              </button>
            </div>
          </div>
        </div>)}
    </WalletLoader>
  )
}

export default NFT

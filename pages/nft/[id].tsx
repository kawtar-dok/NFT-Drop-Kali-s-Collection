import React, { useEffect, useState } from 'react'
import {  useAddress, useDisconnect,useMetamask, useContract } from "@thirdweb-dev/react";
import { GetServerSideProps } from 'next';
import { sanityClient, urlFor } from '../../sanity';
import { Collection } from '../../typing';
import Link from 'next/link';
import { BigNumber } from 'ethers';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
  collection: Collection
}

function NFTDropPage({ collection}: Props) {
   //m gonna create two pieces of State whos basically re like
   //short-term memory used to store information and update it
   // in the react way
   //usefunction = hook
   const [claimedSupply, setClaimedSupply] = useState<number>(0);
   const [totalSupply, setTotalSupply] = useState<BigNumber>();
   const [loading, setLoading] = useState<boolean>(true);
   const nftDrop = useContract(collection.address, "nft-drop").contract;
   const [priceInEth, setPriceInEth] = useState<string>();
  
  
  // Auth
    const connectWithMetamask = useMetamask();
    const address = useAddress();
    const disconnect = useDisconnect();
  //---
  console.log(address)
   
  useEffect(() => {
    if(!nftDrop) return;

    const fetchPrice = async() => {
      const claimConditions = await nftDrop.claimConditions.getAll();
      
      setPriceInEth(claimConditions?.[0].currencyMetadata.displayValue)
    }
    fetchPrice();
   }, [nftDrop])
   
  
   //now m gonna use useEffect this hook is used basically to make know what to load for the page load 
   useEffect(() => {
    //defencive programming
    if (!nftDrop) return;

    //create a function which gonna fetch the data for claim Supply
    //and the total Supply
    const fetchNFTDropData = async () => {
      setLoading(true);

      const claimed = await nftDrop.getAllClaimed();//a promise
      const total = await nftDrop.totalSupply();//a promise
    
      setClaimedSupply(claimed.length);
      setTotalSupply(total);

      setLoading(false);
    }

    fetchNFTDropData();
   }, [nftDrop])


 const mintNFT = () => {
   if (!nftDrop || !address) return;

   const quantity = 1; //how many unique NFTs u wanna claim
   
   setLoading(true);
   const notification = toast.loading("Minting...", {
     style: {
      background: 'white',
      color: 'green',
      fontWeight:'bolder',
      fontSize: "17px",
      padding:'20px'
     }
   })

   nftDrop.claimTo(address, quantity).then(async (tx) => {
      const receipt = tx[0].receipt// the transaction receipt
      const claimedTokenId = tx[0].id//the id of the NFT claimed
      const claimedNFT = await tx[0].data()//(optional) get the claimed NFT metadata
      
      toast("HOORAY...You Successfuly Minted!!",{
        duration: 8000,
        style: {
          background: 'green',
          color: 'white',
          fontWeight:'bolder',
          fontSize: "17px",
          padding:'20px'
        }
      })

      console.log(receipt)
      console.log(claimedTokenId)
      console.log(claimedNFT)
   }).catch(err => {
    console.log(err)
    toast("Whoops...Something went wrong!",{
      duration: 8000,
      style: {
        background: 'red',
        color: 'white',
        fontWeight:'bolder',
        fontSize: "17px",
        padding:'20px'
      }
    })
   }).finally(() => {
    setLoading(false);
    toast.dismiss(notification)
   })

 }
  return (
    <div className='flex h-screen flex-col lg:grid lg:grid-cols-10
    scrollbar-thin scrollabar-track-gray-400/20 scrollbar-thumb-[#ec4079a6]/80'>
   <Toaster position='top-center'/>
  
    {/* Left */}
      <div className='bg-gradient-to-br from-cyan-800 to-rose-500 lg:col-span-4'>
        <div className='flex flex-col items-center justify-center py-2 lg:min-h-screen'>
          <div className='bg-gradient-to-br from-yellow-400 to-purple-600 p-2 rounded-xl'>
           <img
             className='w-44 rounded-xl object-cover lg:h-96 lg:w-72'
             src={urlFor(collection.previewImage).url()}
             alt=''
           />
          </div>
           <div className='space-y-2  text-center p-5 '>
               <h1 className='text-4xl text-white font-bold tracking-[10px] uppercase'>
                {collection.nftCollectionName}
               </h1>
               <h2 className='text-xl text-gray-300 tracking-[1px]'>
               {collection.description}
               </h2>
           </div>
        </div>
      </div>

    {/* Right */}
      <div className='flex flex-1 flex-col p-12 lg:col-span-6'>
       
         {/* Header */}
           <header className='flex items-center justify-between'>
             <Link href={'/'}>
              <h1 className='w-52 cursor-pointer text-xl font-extralight 
              sm:w-80'>
                The{" "}
                <span className='font-extrabold underline decoration-pink-600/50'>KALI</span> 
                {" "}NFT Market Place
              </h1>
             </Link>

               <button 
                 onClick={() => (address ? disconnect() : connectWithMetamask())}
                 className='rounded-full bg-rose-400 text-white px-4 py-2 text-xs font-bold lg:px-5 lg:py-3 lg:text-base'>
                {address ? 'Sign Out' : 'Sign In'} 
               </button>
           </header>
           <hr className='my-2 border'/>
            {address && (
                <p className='text-center text-sm text-rose-400'> 
                    You're logged in with wallet {address.substring(0,5)}...{address.substring(address.length - 5)}
                </p>
            )}
         {/* Content */}
            <div className='mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:justify-center lg:space-y-0'>
                <img
                className='w-80 object-cover pb-10 lg:h-64'
                src={urlFor(collection.mainImage).url()}
                alt=''
                />
                <h1 className='text-3xl font-bold lg:text-5xl lg:font-extrabold'>
                    {collection.title}
                </h1>
              {loading ? (
                <p className='pt-2 text-xl text-green-500 animate-pulse'>
                  Loading Supply Count...
                </p>
              ):( 
                <p className='pt-2 text-xl text-green-500'>
                  {claimedSupply} / {totalSupply?.toString()} NFT's claimed
                </p>
              )}
              {loading && (
                <img
                className='h-80 w-80 object-contain '
                src='https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif'
                alt=''
                />
              )}
            </div>

          {/* Mint Button */}
          <button 
          onClick={mintNFT}
          disabled={loading || claimedSupply === totalSupply?.toNumber() || !address }
          className='mt-10 h-16 w-full rounded-full bg-red-600 W-full text-white font-bold
          disabled:bg-gray-400'>
            {loading ? (
            <>Loading</>
              ): claimedSupply === totalSupply?.toNumber() ? (
            <>SOLD OUT</>
            ): !address ? (
              <>Sign in to Mint</> 
            ):( 
            <span className='font-bold '>Mint NFT ({priceInEth} ETH)</span>
            )}
          </button>
      </div>
    </div>
  )
}

export default NFTDropPage


//we want to use the wildcard [id ] 
//its the forward slach parameter which is the [id].tsx in my code
export const getServerSideProps: GetServerSideProps = async ({ params}) => {
  const query = `*[_type == "collection" && slug.current == $id][0]{
    _id,
    title,
    address,
    description,
    nftCollectionName,
    mainImage {
      asset
    },
    previewImage {
      asset
    },
    slug {
      current
    },
    creator-> {
      _id,
      name,
      address,
      slug {
         current
      },
    },
  }`

  const collection = await sanityClient.fetch(query,
   {
     id:params?.id
  });
  console.log("the collection of the current slug",collection)
  
  if (!collection) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      collection
    }
  }
}
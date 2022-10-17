import { motion } from 'framer-motion';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>NFT Drop Kali's Collection</title>
        <link rel="icon" href="/nft.ico" />
      </Head>
      
      <div className='bg-gradient-to-br from-yellow-400 to-purple-600 min-h-screen flex flex-col items-center justify-center text-center'>
        <div className=' p-2 rounded-xl'>
          <img
          className='animate-pulse w-56 lg:w-64 rounded-xl object-cover'
          src='/nft-home.png'
          alt=''
          />
        </div>
        <div className='space-y-2 p-5 items-center justify-center'>
          <h1 className='text-4xl text-gray-200 tracking-[4px] font-bold text-center lg:text-6xl lg:font-extrabold '>
            Kali NFT Drop Collection
          </h1>
          <h2 className='text-white/80 lg:text-2xl'>
             Get Started by Logging in with your MetaMask
          </h2>
        </div>
        <Link  href="/nft/kali-apes" >
         
           <motion.button
             whileHover={{
              scale: 1.1,
              
            }}
              className='mt-10 text-pink-700 border-pink-700 border-2 bg-white/5 p-3 rounded-xl shadow-lg font-bold cursor-pointer'>
            Begin your Journey
           </motion.button>
        </Link>
      </div>
    </div>
  )
}

export default Home

import { motion } from 'framer-motion';
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { sanityClient, urlFor } from '../sanity';
import { Collection } from '../typing';

//type or interface
interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  //const images = [{img:'/nft-home.png'},{img:'/nft-home-3.png'},{img:'/nft-home-2.png'},{img:'/nft-home-4.png'},{img:'/nft-home-5.png'}]
  return (
  <div className="h-screen flex flex-col bg-slate-200 z-0 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#ec4079a6]/80">
      <Head>
        <title>NFT Drop Kali's Collection</title>
        <link rel="icon" href="/nft.ico" />
      </Head>
      
    <div className='mx-auto max-w-7xl py-10 px-10 2xl:px-10 '>
       <Link href={'/'}>
          <div className='flex top-0 left-0 mb-7 cursor-pointer space-x-2 items-center'>
            <img
             className='w-7 h-9 object-cover'
             src='/nft-home.png'
             alt=''
            />
            <h1 className='w-52 text-2xl font-extralight 
              sm:w-80'>
                The{" "}
                <span className='font-extrabold underline decoration-pink-600/50'>KALI</span> 
                {" "}NFT Market Place
            </h1>
         </div>
        </Link>

   <main className=' bg-gradient-to-br from-yellow-400 to-purple-600
   p-10 shadow-xl shadow-rose-400/80'>      
     <div className='grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
      {collections.map((collection) => (
       <>
         <Link href={`/nft/${collection.slug.current}`}>
        <div className='flex flex-col items-center justify-center text-center cursor-pointer
        transition-all duration-200 hover:scale-105'>
        <div className='rounded-xl'>
          <img
            className='w-60 h-96 rounded-2xl object-cover '
            src={urlFor(collection.mainImage).url()}
            alt='' />
        </div>
        <div className='space-y-2 p-5'>
            <h1 className='text-2xl text-gray-200 tracking-[4px] font-bold '>
              {collection.title}
            </h1>
            <h2 className='text-sm text-gray-300'>
              {collection.description}
            </h2>
          </div>
         
        {/*
        <Link  href="/nft/kali-apes" >
           <motion.button
             whileHover={{
              scale: 1.1,
            }}
              className='mt-10 text-pink-700 border-pink-700 border-2 bg-white/5 p-3 rounded-xl shadow-lg font-bold cursor-pointer'>
            Begin your Journey
           </motion.button>
        </Link>
         */}
         </div>
        </Link>
        </>
        ))}
      </div>
     </main>
    </div>
     

    </div>
  )
}

export default Home

//arow function
//context is a parameter who gets a bunch of usefull thing inside of it 
//we gonna do smght called destructing context = { params 
// hahah but finally we didnt do it 
//and when we re using typeScript u can actually state what a function
// is what the props re for that function here we did use GetServerSideProps
//and with this we must return 
export const getServerSideProps:  GetServerSideProps = async () => {
  
  const query = `*[_type == "collection"]{
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
  const collections = await sanityClient.fetch(query)
  console.log(collections);

  return {
    props: {
      collections
    }
  }
}
import React from 'react'

function NFTDropPage() {
  return (
    <div className='flex h-screen flex-col lg:grid lg:grid-cols-10 '>
    {/* Left */}
      <div className='bg-gradient-to-br from-cyan-800 to-rose-500 lg:col-span-4'>
        <div className='flex flex-col items-center justify-center py-2 lg:min-h-screen'>
          <div className='bg-gradient-to-br from-yellow-400 to-purple-600 p-2 rounded-xl'>
           <img
             className='w-44 rounded-xl object-cover
             lg:h-96 lg:w-72'
             src='https://links.papareact.com/8sg'
             alt=''
           />
          </div>
           <div className='space-y-2  text-center p-5 '>
               <h1 className='text-4xl text-white font-bold tracking-[10px] uppercase'>
                KALI Apes
               </h1>
               <h2 className='text-xl text-gray-300 tracking-[2px]'>
                A collection of KALI Apes who live & breathe React!
               </h2>
           </div>
        </div>
      </div>

    {/* Right */}
      <div>

      </div>
    </div>
  )
}

export default NFTDropPage

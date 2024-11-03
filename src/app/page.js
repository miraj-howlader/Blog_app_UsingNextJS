import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div className=' min-h-screen flex justify-center items-center 
     bg-gradient-to-r from-purple-500  to-blue-600 p-6'>
      <div className=' container mx-auto flex flex-col justify-center items-center'>
          <h1 className=' text-4xl text-white font-bold mb-4'>Browse our blog collection</h1>
     <Link href={'/blogs'}
     className=' bg-white text-sm text-blue-700 rounded px-4 py-2'
     >Explore Blogs</Link>
      </div>
      
    </div>
  )
}

export default Home

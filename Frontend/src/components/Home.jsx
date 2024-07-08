import React from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
function Home() {
  useGSAP(()=>{
    gsap.from(".divi",{
      opacity:0,
      scale:0.2,
      duration:1,
    })
  })
  return (
    <div className='flex justify-center items-center h-[100vh] w-[100%] '>
      <div className=' flex w-full justify-evenly divi'>
        <Link to={'/create'} className='text-5xl hover:-translate-y-6 duration-500 font-bold p-6'>Create Quiz</Link>
        <Link to={'/take'} className='text-5xl hover:-translate-y-6 duration-500 font-bold p-6'>Take Quiz</Link>
      </div>
    </div>
  )
}

export default Home
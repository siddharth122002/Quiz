import React from 'react'

function Spinner() {
  return (
    <div className='flex justify-center items-center h-[100vh] w-full'>
      <div className=' border-t-2 border-b-2 border-white h-12 w-12 rounded-full animate-spin'>
      </div>
    </div>
  )
}

export default Spinner
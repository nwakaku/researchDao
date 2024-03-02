import React from 'react'
 
export const UserInfoCard = () => {
  return (
   <div className='flex items-center'>
   <div className='bg-lightcyan p-6 text-black space-y-4 flex-1 text-nowrap'>
    <img src='/onecoin.svg'/>
    <p>My NFTs</p>
    <p className='font-extrabold text-9xl '>5</p>
   </div>
   <div className='bg-bisque p-6 text-black space-y-4 flex-1'>
    <img src='/onetimer.svg'/>
    <p>Total Publications</p>
    <p className='font-extrabold text-9xl '>3</p>
   </div>
   <div className='bg-lightblue p-6 text-black space-y-4 flex-1'>
    <img src='/messagequestion.svg'/>
    <p>Total Funding Recieved</p>
    <p className='font-extrabold text-9xl '>3000 BNB</p>
   </div>
   </div>
  )
}

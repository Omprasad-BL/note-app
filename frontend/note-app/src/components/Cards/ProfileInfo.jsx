import React from 'react'
import { getInitials } from '../../utils/Helper'

const ProfileInfo = ({onLgout}) => {
  return (
    <div className='flex items-center gap-3 '>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
            {getInitials("Omprasad B L")}
        </div>
        <div className=' '>
            <p className='text-sm font-medium'>Omprasad</p>
            <button className='text-sm text-slate-700 underline'>Logout</button>
        </div>    
    </div>
  )
}

export default ProfileInfo

import React from 'react'

import './styles/Skeleton.css';

export default function Skeleton() {
  return (
    <div className='Skeleton'>
        <div className='title'>
            <span className='icon animated'></span>
            <span className='companyN animated'></span>
            <span className='fullName animated'></span>
        </div>
            
        <div className='contact'>
            <span className='phoneIcon'></span>
            <span className='phoneNumber animated'></span>
            
        </div>

        <div className='email'>
            <span className="mailIcon"></span>
            <span className="mailAddress animated"></span>
            
        </div>
    </div>
  )
}

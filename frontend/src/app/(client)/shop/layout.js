import React from 'react'
import Breadcrumb from '../components/Breadcrumb'

const layout = ({ children }) => {
  return (
    <div>
      <div className='bg-secondaryColor py-4'>
        <div className='container mx-auto'>
          <div className='flex gap-2 items-center'>
            <Breadcrumb />
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

export default layout
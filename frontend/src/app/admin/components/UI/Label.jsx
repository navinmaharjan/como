import React from 'react'

const Label = ({children}) => {
  return (
    <div>
        <label className='text-sm'>{children}</label>
    </div>
  )
}

export default Label
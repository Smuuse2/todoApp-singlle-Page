import React from 'react'

function InputModels({Label,type,value, setValue}) {
  return (
    <div className=''>
    <label>{Label}</label>
    <br></br>
    <input className='w-full  p-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6' type={type}  
    onChange={(e)=> setValue(e.target.value)}
    value={value}
  
    />
  </div>
  )
}

export default InputModels
